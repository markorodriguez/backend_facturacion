"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
const db = mysql.createPool({
    host: 'sql10.freemysqlhosting.net',
    port: '3306',
    user: 'sql10501082',
    password: '574iXx9hzB',
    database: 'sql10501082',
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
