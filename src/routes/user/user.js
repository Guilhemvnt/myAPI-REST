const auth = require('../../middleware/auth');
const {
    select_all_user,
    select_all_todo,
    select_id_or_mail,
} = require('./user.query');
var db = require('../../config/db');

module.exports = function(app, bcrypt) {
    app.get('/user', (req, res) => {
        db.query("USE epytodo", function(err, results) {
            if (err) throw err;
        });
        db.connect(function(err) {
            if (err) throw err;
            select_all_user(res);
        });
    });
    app.get('/user/todos', (req, res) => {
        select_all_todo(res, req.user)
    });
    app.get('/user/:data', auth, (req, res) => {
        var data = req.params.data;
        select_id_or_mail(res, data);
    });
}