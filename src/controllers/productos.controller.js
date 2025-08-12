const producto = require('../models/productos.model');

exports.getproductos = (req, res) => {
    producto.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createproducto = (req, res) => {
    const data = req.body;
    producto.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'producto agregado exitosamente'});
    });
};

exports.updateproducto = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    producto.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'producto actualizado exitosamente' });
    });
};

exports.deleteproducto = (req, res) => {
    const id = req.params.id;
    producto.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'producto eliminada exitosamente' });
    });
};