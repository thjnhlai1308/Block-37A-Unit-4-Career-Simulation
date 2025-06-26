const express = require('express')
const app = express.Router()
const { authenticate, findUserByToken } = require('../db/auth')
const { createUser } = require('../db/user')
const { isLoggedIn } = require('./middleware')

app.post('/register', async (req, res, next) => {
    try {
        res.send(await createUser(req.body))
    } catch (err) {
        next(err)
    }
})

app.post('/login', async (req, res, next) => {
    try {
        const token = await authenticate(req.body)
        res.send(token)
    } catch (err) {
        next(err)
    }
})

app.get('/me', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await findUserByToken(req.headers.authorization))
    } catch (err) {
        next(err)
    }
})

module.exports = app