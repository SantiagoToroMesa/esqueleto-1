// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const ClienteRoutes = require('./routes/clientes.routes');
const ProductosRoutes = require('./routes/productos.routes');
const VentasRoutes = require('./routes/ventas.routes');
// const empleadosRoutes = require('./routes/empleados.routes');
// const reservasRoutes = require('./routes/reservas.routes');

const app = express();

app.use(cors());
app.use(express.json());


// prefijos de rutas
app.use('/clientes', ClienteRoutes);
app.use('/productos', ProductosRoutes);
app.use('/ventas', VentasRoutes);
// Ruta para servir la página de login


module.exports = app;
