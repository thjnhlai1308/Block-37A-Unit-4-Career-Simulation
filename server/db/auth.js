const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authenticate = async ({username, password}) => {
    const SQL = `
        SELECT * 
        FROM users
        WHERE username = $1
    `
    const response = await client.query(SQL, [username])
    const user = response.rows[0]
    if (!user || !(await bcrypt.compare(password, user.password))) {
        const error = Error('not authorized')
        error.status = 401
        throw error
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    return { token }
}

const findUserByToken = async (token) => {
    let id
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        id = payload.id
    } catch (err) {
        const error = Error('not authorized')
        error.status = 401
        throw error
    }
    const SQL = `
    SELECT id,
    username FROM users
    WHERE id = $1
    `
    const response = await client.query(SQL, [id])
    if (!response.rows.length) {
        const error = Error('not authorized')
        error.status = 401
        throw error
    }
    return response.rows[0]
}

module.exports = {
    authenticate,
    findUserByToken
}