const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/review_app');

module.exports = client