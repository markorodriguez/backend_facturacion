"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const axios_1 = __importDefault(require("axios"));
const apiKey_1 = __importDefault(require("../config/apiKey"));
const express = require("express");
const usuariosRouter = express.Router();
const jwt = require("jsonwebtoken");
usuariosRouter.post("/login", (req, res) => {
    const params = req.body;
    console.log(req.body);
    db_1.default.query("SELECT dni, contraseña, id_tipousuario, id_usuario FROM usuario where dni =?", [params.dni], (err, result) => {
        if (err) {
            res.send(null);
            console.error(err);
        }
        else {
            if (result.length > 0) {
                if (params.contraseña == result[0].contraseña) {
                    const token = jwt.sign({
                        status: "success",
                        rol: result[0].id_tipousuario,
                    }, 'taller_formación');
                    res.json({ message: "Login exitoso", token, data: { dni: result[0].dni, id_usuario: result[0].id_usuario } });
                }
                else {
                    res.json({ message: "Contraseña incorrecta" });
                }
            }
            else {
                res.json({ message: "Usuario no encontrado" });
            }
        }
    });
});
usuariosRouter.post("/info-usuario", (req, res) => {
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
    });
});
usuariosRouter.post("/registrar-usuario", (req, res) => {
    const { persona } = req.body;
    console.log(persona);
    db_1.default.query(`INSERT INTO usuario SET ?`, {
        id_tipousuario: persona.id_tipousuario,
        dni: Number.parseInt(persona.dni),
        nombres: persona.nombre,
        apellidos: persona.apPaterno + ' ' + persona.apMaterno,
        telefono: persona.telefono,
        correo: persona.correo,
        contraseña: persona.contraseña,
        direccion: persona.direccion
    }, (err) => {
        if (!err) {
            console.log('usuario agregado');
            res.json({
                message: 'Success',
            });
        }
    });
});
exports.default = usuariosRouter;
