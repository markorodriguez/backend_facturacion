const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'db_facturacion',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const connection = db.getConnection((err:any, connection:any)=>{
    if(err){
        console.error(err)
    }else{
        console.log('Conectado a la bd!')
    }
})

/*
Credenciales

correo: vacamis167@syswift.com
nombre: vacamis167
usuario: vacamis167
contraseña: pwd123abc
*/

export default db;