const express = require('express')
const app = express.Router()
const { isLoggedIn } = require('./middleware')
const { fetchItems, fetchItemById } = require('../db/items')
const {
    createReview,
    fetchReviewsForItem,
    fetchReviewById
} = require('../db/reviews')

app.get('/', async (req, res, next) => {
    try {
        res.send(await fetchItems())
    } catch (err) {
        next(err)
    }
})

app.get('/:itemId', async (req, res, next) => {
    try {
        res.send(await fetchItemById(req.params.itemId))
    } catch (err) {
        next(err)
    }    
})

app.get('/:itemId/reviews', async (req, res, next) => {
    try {
        res.send(await fetchReviewsForItem(req.params.itemId))
    } catch (err) {
        next(err)
    }
})

app.post('/:itemId/reviews', isLoggedIn, async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).send({ error: 'Unauthorized' });
  
      const review = await createReview({
        user_id: req.user.id,
        item_id: req.params.itemId,
        text: req.body.text,
        rating: req.body.rating
      });
  
      res.send(review);
    } catch (err) {
      next(err);
    }
});

module.exports = app