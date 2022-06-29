const express = require('express');
const mysql = require("mysql2");
require('dotenv').config();
var bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
var db = require('./config/db');
const jsonwebtoken = require('jsonwebtoken');

require('./routes/user/user')(app, bcrypt);
require('./routes/auth/auth')(app, bcrypt);
require('./routes/todos/todos')(app);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})