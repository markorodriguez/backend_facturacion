import { Request, Response } from 'express';
import Axios from 'axios';
import tokenApi from '../config/apiKey';
import ICliente from '../models/cliente.model';
const express = require('express')
const clienteRouter = express.Router()

clienteRouter.post('/consumir-ruc', (req: Request, res: Response) => {
    const params: ICliente = req.body
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
        })
        console.log('response', r.data)
    }).catch((err: any) => {
        res.json({
            message: 'Error',
        })
        console.log('error', err)
    })
})

export default clienteRouter

