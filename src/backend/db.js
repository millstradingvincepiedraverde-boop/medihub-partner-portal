const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medihub',
    waitForConnections: true,
    connectionLimit: 10,
});

db.query('SELECT 1')
    .then(() => console.log('🟢 MySQL connected'))
    .catch(err => console.error('🔴 MySQL error', err));

module.exports = db;
