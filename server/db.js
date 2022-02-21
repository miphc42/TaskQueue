require('dotenv').config()
const Pool = require("pg").Pool;

// utilizing .env file to hide sensitive data 

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});

module.exports = pool;