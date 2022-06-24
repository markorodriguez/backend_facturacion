import { Request, Response } from 'express';
import db from '../config/db';
import moment from "moment"

const express = require('express')
const registrosRouter = express.Router()

registrosRouter.post("/generar-factura", (req: Request, res: Response) => {
    const { empresa, listado, currentUser, tiempo } = req.body;
    let arrayPrecios: Array<any> = []

    db.query(`SELECT * FROM cliente WHERE ruc = ${Number.parseInt(empresa.ruc).toString()} `, (err: any, cliente: any) => {
        const id_detallefactura = Date.now().toString()

        if (!err) {
            if (cliente.length > 0) {
                db.query(`SELECT * FROM producto`, (err: any, r: any) => {
                    if (!err) {

                        r.map((producto: any) => {
                            arrayPrecios.push({
                                id_producto: producto.id_producto,
                                precio: producto.precio
                            })
                        })

                        listado.map((producto: any) => {

                            db.query('INSERT INTO detalle_productos SET ?', {
                                id_producto: producto.id_producto,
                                cantidad: Number.parseInt(producto.cantidad),
                                id_detallefactura: id_detallefactura,
                            }, (err: any) => {
                                !err ? console.log('DETALLE PRODUCTO') : console.log(err)
                            })
                        })
                        const anoInicio = 2011
                        const procesoAno = moment().get('year')
                        const nombreFactura = 'E' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura

                        db.query('INSERT INTO detalle_factura SET ?', {
                            id_detallefactura: id_detallefactura,
                            id_cliente: Number.parseInt(empresa.ruc).toString(),
                            id_usuario: currentUser,
                            fecha: moment(Date.now()).format("DD-MM-YYYY"),
                            importetotal: Number.parseFloat(listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                            estado: "FACTURADO",
                            igv: Number.parseFloat((listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                        }, (err: any) => {
                            if (!err) {
                                db.query('INSERT INTO factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    numerofactura: nombreFactura,
                                }, (err: any) => {
                                    !err ? console.log('FACTURA GENERADA') : console.log(err)
                                })
                            } else {
                                console.log(err)
                            }
                        })
                    } else {
                        console.log(err)
                    }
                })
            } else {
                db.query(`INSERT INTO cliente SET ?`, {
                    id_cliente: Number.parseInt(empresa.ruc).toString(),
                    id_tipocliente: 2,
                    ruc: Number.parseInt(empresa.ruc).toString(),
                    nombres: empresa.nombre,
                    direccionfiscal: empresa.direccion,
                    telefono: empresa.telefono,
                    correo: empresa.correo
                }, (err: any) => {
                    if (!err) {
                        db.query(`SELECT * FROM producto`, (err: any, r: any) => {
                            if (!err) {

                                r.map((producto: any) => {
                                    arrayPrecios.push({
                                        id_producto: producto.id_producto,
                                        precio: producto.precio
                                    })
                                })

                                listado.map((producto: any) => {

                                    db.query('INSERT INTO detalle_productos SET ?', {
                                        id_producto: producto.id_producto,
                                        cantidad: Number.parseInt(producto.cantidad),
                                        id_detallefactura: id_detallefactura,
                                    }, (err: any) => {
                                        !err ? console.log('DETALLE PRODUCTO') : console.log(err)
                                    })
                                })
                                const anoInicio = 2011
                                const procesoAno = moment().get('year')
                                const nombreFactura = 'F' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura

                                db.query('INSERT INTO detalle_factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    id_cliente: Number.parseInt(empresa.ruc).toString(),
                                    id_usuario: currentUser,
                                    tiempoejecucion: tiempo,
                                    fecha: moment(Date.now()).format("DD-MM-YYYY"),
                                    importetotal: Number.parseFloat(listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                                    estado: "FACTURADO",
                                    igv: Number.parseFloat((listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                                }, (err: any) => {
                                    if (!err) {
                                        db.query('INSERT INTO factura SET ?', {
                                            id_detallefactura: id_detallefactura,
                                            numerofactura: nombreFactura,
                                        }, (err: any) => {
                                            !err ? console.log('FACTURA GENERADA') : console.log(err)
                                        })
                                    } else {
                                        console.log(err)
                                    }
                                })
                            } else {
                                console.log(err)
                            }
                        })
                    }
                })
            }
        } else {
            console.log('Error')
        }
    })
})

registrosRouter.post("/generar-boleta", (req: Request, res: Response) => {

    const { persona, listado, currentUser, tiempo } = req.body;
    let arrayPrecios: Array<any> = []

    db.query(`SELECT * FROM cliente WHERE dni = ${Number.parseInt(persona.dni)} `, (err: any, cliente: any) => {
        const id_detallefactura = Date.now().toString()
        console.log(cliente)

        if (!err) {
            if (cliente.length > 0) {
                db.query(`SELECT * FROM producto`, (err: any, r: any) => {
                    if (!err) {

                        r.map((producto: any) => {
                            arrayPrecios.push({
                                id_producto: producto.id_producto,
                                precio: producto.precio
                            })
                        })

                        listado.map((producto: any) => {

                            db.query('INSERT INTO detalle_productos SET ?', {
                                id_producto: producto.id_producto,
                                cantidad: Number.parseInt(producto.cantidad),
                                id_detallefactura: id_detallefactura,
                            }, (err: any) => {
                                !err ? console.log('DETALLE PRODUCTO') : console.log(err)
                            })
                        })
                        const anoInicio = 2011
                        const procesoAno = moment().get('year')
                        const nombreFactura = 'E' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura

                        db.query('INSERT INTO detalle_factura SET ?', {
                            id_detallefactura: id_detallefactura,
                            id_cliente: Number.parseInt(persona.dni).toString(),
                            id_usuario: currentUser,
                            tiempoejecucion: tiempo,
                            fecha: moment(Date.now()).format("DD-MM-YYYY"),
                            importetotal: Number.parseFloat(listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                            estado: "FACTURADO",
                            igv: Number.parseFloat((listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                        }, (err: any) => {
                            if (!err) {
                                db.query('INSERT INTO factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    numerofactura: nombreFactura,
                                }, (err: any) => {
                                    !err ? console.log('FACTURA GENERADA') : console.log(err)
                                })
                            } else {
                                console.log(err)
                            }
                        })
                    } else {
                        console.log(err)
                    }
                })
            } else {
                db.query(`INSERT INTO cliente SET ?`, {
                    id_cliente: Number.parseInt(persona.dni).toString(),
                    id_tipocliente: 1,
                    dni: persona.dni,
                    nombres: persona.nombre,
                    apellidos: persona.apPaterno + ' ' + persona.apMaterno,
                    direccionfiscal: '',
                    telefono: persona.telefono,
                    correo: persona.correo
                }, (err: any) => {
                    if (!err) {
                        db.query(`SELECT * FROM producto`, (err: any, r: any) => {
                            if (!err) {

                                r.map((producto: any) => {
                                    arrayPrecios.push({
                                        id_producto: producto.id_producto,
                                        precio: producto.precio
                                    })
                                })

                                listado.map((producto: any) => {

                                    db.query('INSERT INTO detalle_productos SET ?', {
                                        id_producto: producto.id_producto,
                                        cantidad: Number.parseInt(producto.cantidad),
                                        id_detallefactura: id_detallefactura,
                                    }, (err: any) => {
                                        !err ? console.log('DETALLE PRODUCTO') : console.log(err)
                                    })
                                })
                                const anoInicio = 2011
                                const procesoAno = moment().get('year')
                                const nombreFactura = 'E' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura

                                db.query('INSERT INTO detalle_factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    id_cliente: Number.parseInt(persona.dni).toString(),
                                    id_usuario: currentUser,
                                    tiempoejecucion: tiempo,
                                    fecha: moment(Date.now()).format("DD-MM-YYYY"),
                                    importetotal: Number.parseFloat(listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                                    estado: "FACTURADO",
                                    igv: Number.parseFloat((listado.reduce((a: number, b: any) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                                }, (err: any) => {
                                    if (!err) {
                                        db.query('INSERT INTO factura SET ?', {
                                            id_detallefactura: id_detallefactura,
                                            numerofactura: nombreFactura,
                                        }, (err: any) => {
                                            !err ? console.log('FACTURA GENERADA') : console.log(err)
                                        })
                                    } else {
                                        console.log(err)
                                    }
                                })
                            } else {
                                console.log(err)
                            }
                        })
                    }
                })
            }
        } else {
            console.log('Error')
        }
    })
})

registrosRouter.get("/obtener-facturas", (req: Request, res: Response)=>{
    db.query('SELECT * FROM detalle_factura df JOIN factura f ON df.id_detallefactura = f.id_detallefactura JOIN cliente c ON df.id_cliente = c.id_cliente', (err:any, rows:any)=>{
        
        const facturas = [...rows].filter((row)=>(row.id_tipocliente == 2))
        const boletas = [...rows].filter((row)=>(row.id_tipocliente == 1))
        
        console.log('facturas', facturas)
        console.log('boletas', boletas)

        res.send({
            boletas: boletas,
            facturas: facturas
        })
    })
})

registrosRouter.post("/anular", (req: Request, res: Response)=>{
    const id = req.body.id
    db.query(`UPDATE detalle_factura SET estado = 'CANCELADO' WHERE id_detallefactura = ${id}`, (err:any, results:any, fields:any)=>{
        if(!err){
            console.log(results)
            res.send('Factura cancelada')
            console.log('Factura cancelada')
        }else{
            console.log(err)
        }
    })
})


export default registrosRouter;