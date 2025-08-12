const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const Entity1Routes = require('./routes/entity1.routes');
const Entity2Routes = require('./routes/entity2.routes');
const Entity3Routes = require('./routes/entity3.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/entity1', Entity1Routes);
app.use('/entity2', Entity2Routes);
app.use('/entity3', Entity3Routes);

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
