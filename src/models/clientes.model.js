const db = require('../config/db')
module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM clientes', (err, results) => {
            if (err) return cb(err);
            cb(null, results);
        });
    },

    create(data, cb) {
        db.query(
            'INSERT INTO clientes (nombre, correo, telefono) VALUES (?, ?, ?)',
            [data.nombre, data.correo, data.telefono],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    update(id, data, cb) {
        db.query(
            'UPDATE clientes SET nombre = ?, correo = ?, telefono = ? WHERE id = ?',
            [data.nombre, data.correo, data.telefono, id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    delete(id, cb) {
        db.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        });
    }
};