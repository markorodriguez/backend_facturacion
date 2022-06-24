"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
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
exports.default = usuariosRouter;
