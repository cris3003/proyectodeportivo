const mysql2 = require('mysql2')

const config = {
    host: 'localhost',
    user: 'root',
    password: 'Boricua333.',
    port: 3306,
    database: 'eventos'
}
const pool = mysql2.createPool(config)

module.exports = pool.promise()