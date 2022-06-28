const mysql = require('mysql2');


const db = mysql.createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    port: '3306',
    user: 'bbd643064776c2',
    password: '0059af43',
    database: 'heroku_ccb3b4de901dd74',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

 db.getConnection((err:any, connection:any)=>{
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