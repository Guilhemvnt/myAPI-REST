var db = require('../../config/db');

exports.create_todo = function(res, req) {
    db.execute('INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)', [req.body.title, req.body.description, req.body.due_time, req.body.status, req.body.user_id], function(err, results, fields) {
        res.status(200).json(results);
    });
}

exports.show_all_todo = function(res) {
    db.query('SELECT * FROM todo;', function(err, results, fields) {
        res.status(200).json(results);
    });
}

exports.todo_id = function(res, id) {
    db.execute('SELECT * FROM `todo` WHERE id = ?', [id], function(err, results, fields) {
        res.status(200).json(results);
    });
}