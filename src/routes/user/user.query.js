var db = require('../../config/db');
const jwt = require('jsonwebtoken');
const { send } = require('express/lib/response');
const res = require('express/lib/response');

exports.check_emails = function(req, callback) {
    db.query("USE epytodo", function(err, results) {
        if (err) throw err;
    });
    db.execute('SELECT * FROM `user` WHERE email = ?', [req.body.email], function(err, results, fields) {
        if (results.toString().length > 0) {
            callback(84);
        } else {
            callback(0);
        }

    })
}

exports.select_all_user = function(res) {
    db.query('SELECT * FROM `user`', function(err, results, fields) {
        res.status(200).json(results);
    });
}

exports.select_all_todo = function(res, id) {
    res.status(500).json({ "msg": "internal server error" });
}

exports.select_id_or_mail = function(res, data) {
    db.execute('SELECT * FROM user WHERE email = ?', [data], function(err, results, fields) {
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            db.execute('SELECT * FROM user WHERE id = ?', [data], function(err, results, fields) {
                res.status(200).json(results);
            });
        }
    });
}

exports.register = function(req, res, bcrypt) {
    req.body.password = bcrypt.hashSync(req.body.password, 5);
    db.query('INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?);', [req.body.email, req.body.password, req.body.name, req.body.first_name], function(err, results, fields) {
        const token = jwt.sign({ email: req.body.email, password: req.body.password }, 'SECRET');
        res.status(200).json({ token });
    })
}