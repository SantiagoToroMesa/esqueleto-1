// src/routes/salas.routes.js
const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

router.get('/', ventasController.getventas);
router.post('/', ventasController.createventa);
router.put('/:id', ventasController.updateventa);
router.delete('/:id', ventasController.deleteventa);

module.exports = router;
