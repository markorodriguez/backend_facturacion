"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const express = require('express');
const productoRouter = express.Router();
productoRouter.get("/obtener", (req, res) => {
    db_1.default.query("SELECT * FROM producto", (err, result) => {
        if (err) {
            console.error(err);
        }
        else {
            // console.log(result)
            res.send(result);
        }
    });
});
//F002-0000000000346 EJEMPLO FACTURACION
productoRouter.get("/categorias", (req, res) => {
    db_1.default.query('SELECT * FROM  tipo_producto', (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
        }
    });
});
productoRouter.post('/agregar-producto', (req, res) => {
    const { id_tipoproducto, nombreproducto, descripcion, precio, stock } = req.body.producto;
    db_1.default.query('INSERT INTO producto SET ?', { id_tipoproducto: id_tipoproducto, nombreproducto: nombreproducto, descripcion: descripcion, precio: Number.parseFloat(precio), stock: Number.parseInt(stock) }, (err) => {
        if (!err) {
            console.log('Registro añadido');
        }
    });
});
exports.default = productoRouter;
