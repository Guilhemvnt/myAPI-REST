const { register, check_emails } = require('./../user/user.query');
var db = require('../../config/db');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const {
    create_todo,
    show_all_todo,
    todo_id
} = require('./todos.query');
const verif_id = require('../../middleware/notFound');

module.exports = function(app, bcrypt) {
    db.query("USE epytodo", function(err, results) {
        if (err) throw err;
    });
    app.get('/todo', (req, res) => {
        show_all_todo(res);
    });
    app.get('/todo/:id', verif_id, (req, res) => {
        var id = req.params.id;
        todo_id(res, id);
    });
    app.post('/todo', (req, res) => {
        if (req.body.title == null || req.body.description == null ||
            req.body.due_time == null || req.body.user_id == null || req.body.status == null) {
            res.status(500).json({ "msg": "internal server error" });
            return;
        }
        create_todo(res, req);
    });
    app.delete('/todo/:id', (req, res) => {
        var id = req.params.id;

        delete_task_by_id(res, id);
    });
}