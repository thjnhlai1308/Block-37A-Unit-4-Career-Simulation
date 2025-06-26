const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4

const createItem = async (item) => {
    const SQL = `
        INSERT INTO items(id, name)
        VALUES($1, $2)
        RETURNING *
    `
    const response = await client.query(SQL, [uuidv4(), item.name])
    return response.rows[0]
}

const fetchItems = async () => {
    const SQL = `
        SELECT *
        FROM items
        ORDER BY name
    `
    const response = await client.query(SQL)
    return response.rows
}

const fetchItemById = async (itemId) => {
    const SQL = `
        SELECT * 
        FROM items
        WHERE id = $1
    `
    const response = await client.query(SQL, [itemId])
    return response.rows[0]
}

module.exports = {
    createItem,
    fetchItems,
    fetchItemById
}