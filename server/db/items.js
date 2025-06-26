const client = require('./client')

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
    fetchItems,
    fetchItemById
}