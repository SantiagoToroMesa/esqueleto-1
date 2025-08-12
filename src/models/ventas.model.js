const db = require('../config/db')
module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM ventas', (err, results) => {
            if (err) return cb(err);
            cb(null, results);
        });
    },

    create(data, cb) {
        db.query(
            'INSERT INTO ventas (cliente_id, producto_id, cantidad) VALUES (?, ?, ?)',
            [data.cliente_id, data.producto_id, data.cantidad],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    update(id, data, cb) {
        db.query(
            'UPDATE ventas SET cliente_id = ?, producto_id = ?, cantidad = ? WHERE id = ?',
            [data.cliente_id, data.producto_id, data.cantidad, id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    delete(id, cb) {
        db.query('DELETE FROM ventas WHERE id = ?', [id], (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        });
    }
};