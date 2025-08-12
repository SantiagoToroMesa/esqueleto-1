const db = require('../config/db');

module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM entity1', (err, results) => {
            if (err) return cb(err);
            cb(null, results);
        });
    },

    getById(id, cb) {
        db.query('SELECT * FROM entity1 WHERE id = ?', [id], (err, results) => {
            if (err) return cb(err);
            cb(null, results[0]);
        });
    },

    create(data, cb) {
        db.query(
            'INSERT INTO entity1 (name, description) VALUES (?, ?)',
            [data.name, data.description],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    update(id, data, cb) {
        db.query(
            'UPDATE entity1 SET name = ?, description = ? WHERE id = ?',
            [data.name, data.description, id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    delete(id, cb) {
        db.query('DELETE FROM entity1 WHERE id = ?', [id], (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        });
    }
};
