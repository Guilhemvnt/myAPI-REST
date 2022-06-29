const { register, check_emails } = require('./../user/user.query');
var db = require('../../config/db');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = function(app, bcrypt) {
    app.post('/login', (req, res) => {
        const email = req.body.email
        const user = { name: email }
        if (email === undefined || req.body["password"] === undefined) {
            res.status(500).json({ "msg": "internal server error" });
            return;
        }
        db.execute('SELECT password FROM `user` WHERE email = ?', [email], function(err, results, fields) {
            if (results.toString().length > 0) {
                res.status(401).json({ "msg": "Invalid Credentials" });
            }
            var password_hash = results;
            if (bcrypt.compareSync(password_hash, req.body.password)) {
                const accesstoken = jwt.sign(user, process.env.SECRET_TOKEN)
                res.json({ accesstoken: accesstoken })
            } else {
                res.status(401).json({ "msg": "Invalid Credentials" });
            }
        })

    });
    app.post('/register', (req, res) => {
        if (req.body["email"] === undefined || req.body["name"] === undefined ||
            req.body["first_name"] === undefined || req.body["password"] === undefined) {
            res.status(500).json({ "msg": "internal server error" });
            return;
        }
        check_emails(req, function(error) {
            if (error == 84) {
                res.status(409).json({ " msg ": " Account already exists " });
                return;
            } else {
                register(req, res, bcrypt);
                return;
            }
        });

    });
}