const cliente = require('../models/clientes.model');

exports.getClientes = (req, res) => {
    cliente.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createCliente = (req, res) => {
    const data = req.body;
    cliente.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente agregado exitosamente'});
    });
};

exports.updateCliente = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    cliente.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente actualizado exitosamente' });
    });
};

exports.deleteCliente = (req, res) => {
    const id = req.params.id;
    cliente.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente eliminada exitosamente' });
    });
};