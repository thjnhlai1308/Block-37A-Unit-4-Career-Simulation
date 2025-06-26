const client = require('./client')
const { createUser } = require('./user')
const { fetchItems, createItem } = require('./items')
const { createReview } = require('./reviews')
const {v4} = require('uuid')
const uuidv4 = v4

const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS users;
    
    CREATE TABLE users (
      id UUID PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
      
    CREATE TABLE items (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      image_url TEXT
    );
        
    CREATE TABLE reviews (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      item_id UUID REFERENCES users(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, item_id)
    );
  `
  await client.query(SQL)
  const [car, airpods, iphone, laptop] = await Promise.all([
    createItem({name: 'car'}),
    createItem({name: 'airpods'}),
    createItem({name: 'iphone'}),
    createItem({name: 'laptop'})
  ])

  const [ thinh1, andy1324] = await Promise.all([
    createUser({username: 'thinh1', password: 'thinhlai1324', is_admin: true}),
    createUser({username: 'andy1324', password: 'andy_li', is_admin: false})
  ])

  console.log('Tables created.')
};



module.exports = {
  client,
  seed
};
