"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const apiKey_1 = __importDefault(require("../config/apiKey"));
const db_1 = __importDefault(require("../config/db"));
const express = require('express');
const clienteRouter = express.Router();
clienteRouter.post('/consumir-ruc', (req, res) => {
    const params = req.body;
    db_1.default.query(`SELECT * FROM cliente WHERE ruc = ${params.ruc}`, (err, result) => {
        console.log(result);
        if (result.length > 0) {
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
                    telefono: result[0].telefono,
                    correo: result[0].correo
                });
                //console.log('response', r.data)
            }).catch((err) => {
                res.json({
                    message: 'Error',
                });
                //console.log('error', err)
            });
        }
        else {
            axios_1.default.get(`https://api.apis.net.pe/v1/ruc?numero=${params.ruc}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey_1.default}`
                }
            }).then((r) => {
                console.log(r);
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
        }
    });
});
clienteRouter.post('/consumir-dni', (req, res) => {
    const params = req.body;
    db_1.default.query(`SELECT * FROM cliente WHERE dni = ${params.dni}`, (err, result) => {
        var _a;
        if (result.length > 0) {
            const fixedApe = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.apellidos.split(" ", 2);
            res.json({
                message: 'Success',
                dni: result[0].dni,
                nombre: result[0].nombres,
                apPaterno: fixedApe[0],
                apMaterno: fixedApe[1],
                telefono: result[0].telefono,
                correo: result[0].correo
            });
        }
        else {
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
            });
        }
    });
});
exports.default = clienteRouter;
