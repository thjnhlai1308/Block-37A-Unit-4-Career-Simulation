const client = require('./client')
const { v4: uuidv4 } = require('uuid')

const createReview = async ({ user_id, item_id, text, rating }) => {
    const SQL = `
        INSERT INTO reviews(id, user_id, item_id, text, rating)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`
    const response = await client.query(SQL, [uuidv4(), user_id, item_id, text, rating])
    return response.rows[0]
}

const fetchReviewsForItem = async (itemId) => {
    const SQL = `
        SELECT r.*, u.username
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.item_id = $1
        ORDER BY r.created_at DESC`
    const response = await client.query(SQL, [itemId])
    return response.rows
}

const fetchReviewById = async (reviewId) => {
    const SQL = `
        SELECT *
        FROM reviews 
        WHERE id = $1`
    const response = await client.query(SQL, [reviewId])
    return response.rows[0]
}

const updateReview = async ({ reviewId, text, rating }) => {
    const SQL = `
        UPDATE reviews
        SET text = $1, rating = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *`
    const response = await client.query(SQL, [text, rating, reviewId])
    return response.rows[0]
}

const deleteReview = async (reviewId) => {
    const SQL = `
        DELETE 
        FROM reviews
        WHERE id = $1`
    await client.query(SQL, [reviewId])
}

module.exports = {
    createReview,
    fetchReviewsForItem,
    fetchReviewById,
    updateReview,
    deleteReview
}