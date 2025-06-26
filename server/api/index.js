const express = require("express")
const app = express.Router()


app.use('/auth', require('./auth'))
app.use('/items', require('./items'))
app.use('/users', require('./users'))

module.exports = app