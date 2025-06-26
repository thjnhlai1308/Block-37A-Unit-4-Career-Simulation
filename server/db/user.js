const client = require('./client')
const bcrypt = require('bcrypt')
const {v4} = require('uuid')
const uuidv4 = v4


const createUser = async (user) => {
    if(!user.username.trim() || !user.password.trim()){
        throw Error ('musthave username and password')
    }
    user.password = await bcrypt.hash(user.password, 5)
    user.is_admin ? user.is_admin = user.is_admin : user.is_admin = false
    const SQL = `
        INSERT INTO users(id, username, password, is_admin)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `
    const response = await client.query(SQL, [uuidv4(), user.username, user.password, user.is_admin])
    return response.rows[0]
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