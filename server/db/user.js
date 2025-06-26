const client = require('./client')
const bcrypt = require('bcrypt')
const {v4} = require('uuid')
const uuidv4 = v4


const createUser = async ({ username, password }) => {
    const hash = await bcrypt.hash(password, 5);
    const SQL = `INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING id, username`;
    const response = await client.query(SQL, [uuidv4(), username, hash]);
    return response.rows[0];
}

const fetchReviewsByUser = async (userId) => {
    const SQL = `
        SELECT r.*, i.name AS item_name
        FROM reviews r
        JOIN items i ON r.item_id = i.id
        WHERE r.user_id = $1
        ORDER BY r.created_at DESC`
    const response = await client.query(SQL, [userId])
    return response.rows
}

module.exports = {
    createUser,
    fetchReviewsByUser
}