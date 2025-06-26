const client = require('./client')

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
    fetchReviewsByUser
}