import e, { Request, Response } from 'express';
import db from "../config/db"

const express = require('express')
const productoRouter = express.Router()

productoRouter.get("/obtener", (req: Request, res: Response) => {

    db.query("SELECT * FROM producto", (err: any, result: any) => {
        if (err) {
            console.error(err)
        } else {
            // console.log(result)
            res.send(result)
        }
    })

})

//F002-0000000000346 EJEMPLO FACTURACION

productoRouter.get("/categorias", (req: Request, res: Response) => {
    db.query('SELECT * FROM  tipo_producto', (err: any, result: any) => {
        if (!err) {
            res.send(result)
        } else {
            console.log(err)
        }
    })
})

productoRouter.post('/agregar-producto', (req: Request, res: Response) => {

    const { id_tipoproducto, nombreproducto, descripcion, precio, stock } = req.body.producto

    db.query('INSERT INTO producto SET ?', { id_tipoproducto: id_tipoproducto, nombreproducto: nombreproducto, descripcion: descripcion, precio: Number.parseFloat(precio), stock: Number.parseInt(stock) }, (err: any) => {
        if (!err) {
            console.log('Registro añadido')
        }
    })


})

productoRouter.get('/especifico/:_id', (req: Request, res: Response) => {
    const { _id } = req.params

    db.query('SELECT * FROM  tipo_producto', (err: any, result: any) => {
        if (!err) {
            db.query(`SELECT * FROM producto p JOIN tipo_producto tp ON p.id_tipoproducto = tp.id_tipoproducto WHERE p.id_producto = ${_id}`, ((err: any, producto: Array<any>) => {

                if (producto.length > 0) {
                    res.json({ producto: producto[0], tipos: result })
                } else {
                    res.json(null)
                }
            }))
        } else {
            console.log(err)
        }
    })


})


productoRouter.post('/editar', (req: Request, res: Response) => {
    const { id_producto, id_tipoproducto, nombreproducto, descripcion, precio, stock } = req.body;
    db.query(`UPDATE producto SET id_tipoproducto=${id_tipoproducto}, nombreproducto="${nombreproducto}", descripcion="${descripcion}", precio=${precio}, stock=${stock} WHERE id_producto=${id_producto}` , (err:any)=>{
        if(!err){
            res.json({message: 'success'})
            console.log('Producto editado')
        }else{
            console.log(err)
            res.send(null)
        }
    })
})

productoRouter.post('/borrar-producto', (req: Request, res: Response) => {
    const { id_producto } = req.body

    db.query(`DELETE FROM producto WHERE id_producto = ${id_producto}`, (err: any) => {
        if (!err) {
            console.log('Producto borrado')
            res.json({ message: 'success' })
        } else {
            res.send(null)
        }
    })
})

export default productoRouter