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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_dev_secret')
    return { token }
}

const findUserByToken = async (token) => {
    const findUserByToken = async (token) => {
        try {
          const payload = jwt.verify(token, process.env.JWT);
          const SQL = `
          SELECT id, username 
          FROM users 
          WHERE id = $1`
          
          const response = await client.query(SQL, [payload.id]);
          if (!response.rows.length) {
            throw Error('not authorized');
          }
          return response.rows[0];
        } catch (err) {
          const error = Error('not authorized');
          error.status = 401;
          throw error;
        }
    }
}
      

module.exports = {
    authenticate,
    findUserByToken
}