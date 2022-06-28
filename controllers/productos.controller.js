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
            res.json({ message: 'success' });
        }
    });
});
productoRouter.get('/especifico/:_id', (req, res) => {
    const { _id } = req.params;
    db_1.default.query('SELECT * FROM  tipo_producto', (err, result) => {
        if (!err) {
            db_1.default.query(`SELECT * FROM producto p JOIN tipo_producto tp ON p.id_tipoproducto = tp.id_tipoproducto WHERE p.id_producto = ${_id}`, ((err, producto) => {
                if (producto.length > 0) {
                    res.json({ producto: producto[0], tipos: result });
                }
                else {
                    res.json(null);
                }
            }));
        }
        else {
            console.log(err);
        }
    });
});
productoRouter.post('/editar', (req, res) => {
    const { id_producto, id_tipoproducto, nombreproducto, descripcion, precio, stock } = req.body;
    db_1.default.query(`UPDATE producto SET id_tipoproducto=${id_tipoproducto}, nombreproducto="${nombreproducto}", descripcion="${descripcion}", precio=${precio}, stock=${stock} WHERE id_producto=${id_producto}`, (err) => {
        if (!err) {
            res.json({ message: 'success' });
            console.log('Producto editado');
        }
        else {
            res.json({ message: 'error' });
            console.log(err);
            res.send(null);
        }
    });
});
productoRouter.post('/borrar-producto', (req, res) => {
    const { id_producto } = req.body;
    db_1.default.query(`DELETE FROM producto WHERE id_producto = ${id_producto}`, (err) => {
        if (!err) {
            console.log('Producto borrado');
            res.json({ message: 'success' });
        }
        else {
            res.json({ message: 'error' });
        }
    });
});
exports.default = productoRouter;
