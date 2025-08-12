const express = require('express');
const router = express.Router();
const entity1Controller = require('../controllers/entity1.controller');

// GET all records
router.get('/', entity1Controller.getAll);

// GET single record by ID
router.get('/:id', entity1Controller.getById);

// POST create new record
router.post('/', entity1Controller.create);

// PUT update record
router.put('/:id', entity1Controller.update);

// DELETE record
router.delete('/:id', entity1Controller.delete);

module.exports = router;
