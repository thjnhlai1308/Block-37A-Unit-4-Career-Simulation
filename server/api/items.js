const express = require('express')
const app = express.Router()
const { isLoggedIn } = require('./middleware')
const { fetchItem, fetchItemByItem } = require('../db/items')
const {
    createReview,
    fetchReviewsForitem,
    fetchReviewById
} = require('../db/reviews')

app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchItem())
    } catch (err) {
        next(err)
    }
})

app.get('/:itemId', async (req, res, next) => {
    try {
        res.send(await fetchReviewById(req.params.itemId))
    } catch (err) {
        next(err)
    }    
})

app.get('/:itemId/reviews', async (req, res, next) => {
    try {
        res.send(await fetchReviewsForitem(req.params.itemId))
    } catch (err) {
        next(err)
    }
})

app.post('/:itemId/reviews', isLoggedIn, async (req, res, next) => {
    try {
        const review = await createReview({
            user_id: req.user.id,
            item_id: req.params.itemId,
            text: req.body.text,
            rating: req.body.rating
        })
        res.send(review)
    } catch (err) {
        next(err)
    }
})

module.exports = app