const express = reqiure('express')
const app = express.Router()
const { createUser, authenticate, findUserByToken } = require('../db/auth')
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
        res.send(await authenticate(req.body))
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