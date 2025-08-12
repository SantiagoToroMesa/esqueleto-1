const entity1 = require('../models/entity1.model');

exports.getAll = (req, res) => {
    entity1.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    const id = req.params.id;
    entity1.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result) return res.status(404).json({ error: 'Record not found' });
        res.json(result);
    });
};

exports.create = (req, res) => {
    const data = req.body;
    entity1.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Record created successfully', id: result.insertId });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    entity1.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Record updated successfully' });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    entity1.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Record deleted successfully' });
    });
};
