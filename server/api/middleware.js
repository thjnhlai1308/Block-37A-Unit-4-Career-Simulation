const jwt = require('jsonwebtoken')
const { findUserByToken } = require('../db/auth')

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        req.user = await findUserByToken(token)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { isLoggedIn }