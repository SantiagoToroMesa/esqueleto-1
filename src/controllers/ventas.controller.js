const venta = require('../models/ventas.model');

exports.getventas = (req, res) => {
    venta.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createventa = (req, res) => {
    const data = req.body;
    venta.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'venta agregado exitosamente'});
    });
};

exports.updateventa = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    venta.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'venta actualizado exitosamente' });
    });
};

exports.deleteventa = (req, res) => {
    const id = req.params.id;
    venta.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'venta eliminada exitosamente' });
    });
};