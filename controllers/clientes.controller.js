"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const apiKey_1 = __importDefault(require("../config/apiKey"));
const express = require('express');
const clienteRouter = express.Router();
clienteRouter.post('/consumir-ruc', (req, res) => {
    const params = req.body;
    axios_1.default.get(`https://api.apis.net.pe/v1/ruc?numero=${params.ruc}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey_1.default}`
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
        });
        //console.log('response', r.data)
    }).catch((err) => {
        res.json({
            message: 'Error',
        });
        //console.log('error', err)
    });
});
clienteRouter.post('/consumir-dni', (req, res) => {
    const params = req.body;
    axios_1.default.get(`https://api.apis.net.pe/v1/dni?numero=${params.dni}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey_1.default}`
        }
    }).then((r) => {
        res.json({
            message: 'Success',
            dni: r.data.numeroDocumento,
            nombre: r.data.nombres,
            apPaterno: r.data.apellidoPaterno,
            apMaterno: r.data.apellidoMaterno,
        });
        //console.log('response', r.data)
    });
});
exports.default = clienteRouter;
