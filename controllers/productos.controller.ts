import {Request, Response} from 'express';
import db from "../config/db"

const express = require('express')
const productoRouter = express.Router()

productoRouter.get("/obtener", (req: Request, res: Response)=>{

    db.query("SELECT * FROM producto", (err: any, result: any)=>{
        if(err){
            console.error(err)
        }else{
           // console.log(result)
            res.send(result)
        }
    })

})

//F002-0000000000346 EJEMPLO FACTURACION

productoRouter.get("/categorias", (req:Request, res: Response)=>{
    db.query('SELECT * FROM  tipo_producto', (err:any, result: any)=>{
        if(!err){
            res.send(result)
        }else{
            console.log(err)
        }
    })
})

productoRouter.post('/agregar-producto', (req:Request, res:Response)=>{
    
    
    const {id_tipoproducto, nombreproducto, descripcion, precio, stock} = req.body.producto

    db.query('INSERT INTO producto SET ?', {id_tipoproducto: id_tipoproducto, nombreproducto: nombreproducto, descripcion: descripcion, precio: Number.parseFloat(precio), stock: Number.parseInt(stock)}, (err:any)=>{
        if(!err){
            console.log('Registro añadido')
        }
    })

    
})


export default productoRouter