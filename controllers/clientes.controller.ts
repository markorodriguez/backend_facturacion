import { Request, Response } from 'express';
import Axios from 'axios';
import tokenApi from '../config/apiKey';
import ICliente from '../models/cliente.model';
import db from '../config/db';
const express = require('express')
const clienteRouter = express.Router()

clienteRouter.post('/consumir-ruc', (req: Request, res: Response) => {
    const params: ICliente = req.body

    db.query(`SELECT * FROM cliente WHERE ruc = ${params.ruc}`, (err: any, result: any) => {

        console.log(result)
        if (result.length > 0) {
            Axios.get(`https://api.apis.net.pe/v1/ruc?numero=${params.ruc}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenApi}`
                }
            }).then((r) => {
                res.json({
                    message: 'Success',
                    ruc: r.data.numeroDocumento,
                    nombre: r.data.nombre,
                    estado: r.data.estado,
                    condicion: r.data.condicion,
                    direccion: r.data.direccion,
                    distrito: r.data.distrito,
                    provincia: r.data.provincia,
                    departamento: r.data.departamento,
                    telefono: result[0].telefono,
                    correo: result[0].correo
                })
                //console.log('response', r.data)
            }).catch((err: any) => {
                res.json({
                    message: 'Error',
                })
                //console.log('error', err)
            })
        }else{
            Axios.get(`https://api.apis.net.pe/v1/ruc?numero=${params.ruc}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenApi}`
                }
            }).then((r) => {
                console.log(r)
                res.json({
                    message: 'Success',
                    ruc: r.data.numeroDocumento,
                    nombre: r.data.nombre,
                    estado: r.data.estado,
                    condicion: r.data.condicion,
                    direccion: r.data.direccion,
                    distrito: r.data.distrito,
                    provincia: r.data.provincia,
                    departamento: r.data.departamento,
                })
                //console.log('response', r.data)
            }).catch((err: any) => {
                res.json({
                    message: 'Error',
                })
                //console.log('error', err)
            })
        }
    })

})

clienteRouter.post('/consumir-dni', (req: Request, res: Response) => {
    const params: ICliente = req.body

    db.query(`SELECT * FROM cliente WHERE dni = ${params.dni}`, (err: any, result: any) => {

        const fixedApe = result[0].apellidos.split(" ", 2)

        if (result.length > 0) {
            res.json({
                message: 'Success',
                dni: result[0].dni,
                nombre: result[0].nombres,
                apPaterno: fixedApe[0],
                apMaterno: fixedApe[1],
                telefono: result[0].telefono,
                correo: result[0].correo
            })
        } else {
            Axios.get(`https://api.apis.net.pe/v1/dni?numero=${params.dni}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenApi}`
                }
            }).then((r: any) => {
                res.json({
                    message: 'Success',
                    dni: r.data.numeroDocumento,
                    nombre: r.data.nombres,
                    apPaterno: r.data.apellidoPaterno,
                    apMaterno: r.data.apellidoMaterno,
                })
            })
        }
        
    })

})

export default clienteRouter

