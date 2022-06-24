"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'db_facturacion',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
db.getConnection((err, connection) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Conectado a la bd!');
    }
});
/*
Credenciales

correo: vacamis167@syswift.com
nombre: vacamis167
usuario: vacamis167
contraseña: pwd123abc
*/
exports.default = db;
