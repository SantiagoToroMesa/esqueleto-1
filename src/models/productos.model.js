const db = require('../config/db')
module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM productos', (err, results) => {
            if (err) return cb(err);
            cb(null, results);
        });
    },

    create(data, cb) {
        db.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
            [data.nombre, data.precio, data.stock],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    update(id, data, cb) {
        db.query(
            'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
            [data.nombre, data.precio, data.stock, id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    delete(id, cb) {
        db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        });
    }
};