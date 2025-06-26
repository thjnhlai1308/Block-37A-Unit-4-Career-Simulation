const express =  require ('express')
const app = express.Router
const { isLoggedIn } = require('./middleware')
const { fetchReviewsByUser } = require('../db/user')
const { updateReview, deleteReview } = require('../db/reviews')

app.length('/me/reviews', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await fetchReviewsByUser(req.user.id))
    } catch (err) {
        next(err)
    }
})

app.put('/:userId/reviews/:reviewId', isLoggedIn, async (req, res, next) => {
    try {
        if(req.user.id !== req.params.userId) {
            return res.status(403).send({ error: 'Not authorized' })
        }
        const review = await updateReview({
            reviewId: req.params.reviewId,
            text: req.body.text,
            rating: req.body.rating
        })
        res.send(review)
    } catch (err) {
        next(err)
    }
})
app.delete('/:userId/reviews/:reviewId', isLoggedIn, async (req, res, next) => {
    try {
        if(req.user.id !== req.params.userId) {
            return res.status(403).send({ error: 'Not authorized' })
        }
        await deleteReview(req.params.userId)
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
})

module.exports = app