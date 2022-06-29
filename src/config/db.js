const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_ROOT_PASSWORD,
    user: process.env.MYSQL_USER
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    if (err) {
        console.error('[ERROR]: unable to connect: ' + err.stack);
        return;
    }
    console.log('[OK]: connected as ' + connection.threadId);
});

module.exports = connection;