// src/routes/salas.routes.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

router.get('/', productosController.getproductos);
router.post('/', productosController.createproducto);
router.put('/:id', productosController.updateproducto);
router.delete('/:id', productosController.deleteproducto);

module.exports = router;
