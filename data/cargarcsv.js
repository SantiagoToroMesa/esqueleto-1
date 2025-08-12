require('dotenv').config({ path: '../.env'});
const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

fs.createReadStream('ventas.csv')
    .pipe(csv())
    .on('data', (row) => {
        connection.query(
            'INSERT INTO ventas (id,cliente_id,producto_id,cantidad,fecha) VALUES (?,?,?,?,?)',
            [row.id, row.cliente_id, row.producto_id, row.cantidad, row.fecha],
            (err) => {
                if (err) console.error(err);
            }
        );
    })
    .on('end', () => {
        console.log('CSV importado correctamente.');
        connection.end();
    });
