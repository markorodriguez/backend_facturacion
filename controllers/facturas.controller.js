"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const moment_1 = __importDefault(require("moment"));
const express = require('express');
const registrosRouter = express.Router();
registrosRouter.post("/generar-factura", (req, res) => {
    const { empresa, listado, currentUser, tiempo } = req.body;
    let arrayPrecios = [];
    db_1.default.query(`SELECT * FROM cliente WHERE ruc = ${Number.parseInt(empresa.ruc).toString()} `, (err, cliente) => {
        const id_detallefactura = Date.now().toString();
        if (!err) {
            if (cliente.length > 0) {
                db_1.default.query(`SELECT * FROM producto`, (err, r) => {
                    if (!err) {
                        r.map((producto) => {
                            arrayPrecios.push({
                                id_producto: producto.id_producto,
                                precio: producto.precio
                            });
                        });
                        listado.map((producto) => {
                            db_1.default.query('INSERT INTO detalle_productos SET ?', {
                                id_producto: producto.id_producto,
                                cantidad: Number.parseInt(producto.cantidad),
                                id_detallefactura: id_detallefactura,
                            }, (err) => {
                                db_1.default.query(`SELECT * from producto WHERE id_producto = ${producto.id_producto}`, (err, p) => {
                                    if (!err) {
                                        db_1.default.query(`UPDATE producto SET stock=${p[0].stock - producto.cantidad} WHERE id_producto = ${producto.id_producto}`, (err) => {
                                            !err ? console.log('Stock actualizado') : console.log(err);
                                        });
                                    }
                                    else {
                                        console.log(err);
                                    }
                                });
                                !err ? console.log('DETALLE PRODUCTO') : console.log(err);
                            });
                        });
                        const anoInicio = 2011;
                        const procesoAno = (0, moment_1.default)().get('year');
                        const nombreFactura = 'F' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura;
                        db_1.default.query('INSERT INTO detalle_factura SET ?', {
                            id_detallefactura: id_detallefactura,
                            id_cliente: Number.parseInt(empresa.ruc).toString(),
                            id_usuario: currentUser,
                            fecha: (0, moment_1.default)(Date.now()).format("DD-MM-YYYY"),
                            importetotal: Number.parseFloat(listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                            estado: "FACTURADO",
                            igv: Number.parseFloat((listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                        }, (err) => {
                            if (!err) {
                                db_1.default.query('INSERT INTO factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    numerofactura: nombreFactura,
                                }, (err) => {
                                    !err ? res.json({ message: 'success' }) : console.log(err);
                                });
                            }
                            else {
                                console.log(err);
                            }
                        });
                    }
                    else {
                        console.log(err);
                    }
                });
            }
            else {
                db_1.default.query(`INSERT INTO cliente SET ?`, {
                    id_cliente: Number.parseInt(empresa.ruc).toString(),
                    id_tipocliente: 2,
                    ruc: Number.parseInt(empresa.ruc).toString(),
                    nombres: empresa.nombre,
                    direccionfiscal: empresa.direccion,
                    telefono: empresa.telefono,
                    correo: empresa.correo
                }, (err) => {
                    if (!err) {
                        db_1.default.query(`SELECT * FROM producto`, (err, r) => {
                            if (!err) {
                                r.map((producto) => {
                                    arrayPrecios.push({
                                        id_producto: producto.id_producto,
                                        precio: producto.precio
                                    });
                                });
                                listado.map((producto) => {
                                    db_1.default.query('INSERT INTO detalle_productos SET ?', {
                                        id_producto: producto.id_producto,
                                        cantidad: Number.parseInt(producto.cantidad),
                                        id_detallefactura: id_detallefactura,
                                    }, (err) => {
                                        db_1.default.query(`SELECT * from producto WHERE id_producto = ${producto.id_producto}`, (err, p) => {
                                            if (!err) {
                                                db_1.default.query(`UPDATE producto SET stock=${p[0].stock - producto.cantidad} WHERE id_producto = ${producto.id_producto}`, (err) => {
                                                    !err ? console.log('Stock actualizado') : console.log(err);
                                                });
                                            }
                                            else {
                                                console.log(err);
                                            }
                                        });
                                        !err ? console.log('DETALLE PRODUCTO') : console.log(err);
                                    });
                                });
                                const anoInicio = 2011;
                                const procesoAno = (0, moment_1.default)().get('year');
                                const nombreFactura = 'F' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura;
                                db_1.default.query('INSERT INTO detalle_factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    id_cliente: Number.parseInt(empresa.ruc).toString(),
                                    id_usuario: currentUser,
                                    tiempoejecucion: tiempo,
                                    fecha: (0, moment_1.default)(Date.now()).format("DD-MM-YYYY"),
                                    importetotal: Number.parseFloat(listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                                    estado: "FACTURADO",
                                    igv: Number.parseFloat((listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                                }, (err) => {
                                    if (!err) {
                                        db_1.default.query('INSERT INTO factura SET ?', {
                                            id_detallefactura: id_detallefactura,
                                            numerofactura: nombreFactura,
                                        }, (err) => {
                                            !err ? res.json({ message: 'success' }) : console.log(err);
                                        });
                                    }
                                    else {
                                        console.log(err);
                                    }
                                });
                            }
                            else {
                                console.log(err);
                            }
                        });
                    }
                });
            }
        }
        else {
            console.log('Error');
        }
    });
});
registrosRouter.post("/generar-boleta", (req, res) => {
    const { persona, listado, currentUser, tiempo } = req.body;
    let arrayPrecios = [];
    db_1.default.query(`SELECT * FROM cliente WHERE dni = ${Number.parseInt(persona.dni)} `, (err, cliente) => {
        const id_detallefactura = Date.now().toString();
        console.log(cliente);
        if (!err) {
            if (cliente.length > 0) {
                db_1.default.query(`SELECT * FROM producto`, (err, r) => {
                    if (!err) {
                        r.map((producto) => {
                            arrayPrecios.push({
                                id_producto: producto.id_producto,
                                precio: producto.precio
                            });
                        });
                        listado.map((producto) => {
                            db_1.default.query('INSERT INTO detalle_productos SET ?', {
                                id_producto: producto.id_producto,
                                cantidad: Number.parseInt(producto.cantidad),
                                id_detallefactura: id_detallefactura,
                            }, (err) => {
                                db_1.default.query(`SELECT * from producto WHERE id_producto = ${producto.id_producto}`, (err, p) => {
                                    if (!err) {
                                        db_1.default.query(`UPDATE producto SET stock=${p[0].stock - producto.cantidad} WHERE id_producto = ${producto.id_producto}`, (err) => {
                                            !err ? console.log('Stock actualizado') : console.log(err);
                                        });
                                    }
                                    else {
                                        console.log(err);
                                    }
                                });
                                !err ? console.log('DETALLE PRODUCTO') : console.log(err);
                            });
                        });
                        const anoInicio = 2011;
                        const procesoAno = (0, moment_1.default)().get('year');
                        const nombreFactura = 'E' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura;
                        db_1.default.query('INSERT INTO detalle_factura SET ?', {
                            id_detallefactura: id_detallefactura,
                            id_cliente: Number.parseInt(persona.dni).toString(),
                            id_usuario: currentUser,
                            tiempoejecucion: tiempo,
                            fecha: (0, moment_1.default)(Date.now()).format("DD-MM-YYYY"),
                            importetotal: Number.parseFloat(listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                            estado: "FACTURADO",
                            igv: Number.parseFloat((listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                        }, (err) => {
                            if (!err) {
                                db_1.default.query('INSERT INTO factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    numerofactura: nombreFactura,
                                }, (err) => {
                                    !err ? res.json({ message: 'success' }) : console.log(err);
                                });
                            }
                            else {
                                console.log(err);
                            }
                        });
                    }
                    else {
                        console.log(err);
                    }
                });
            }
            else {
                db_1.default.query(`INSERT INTO cliente SET ?`, {
                    id_cliente: Number.parseInt(persona.dni).toString(),
                    id_tipocliente: 1,
                    dni: persona.dni,
                    nombres: persona.nombre,
                    apellidos: persona.apPaterno + ' ' + persona.apMaterno,
                    direccionfiscal: '',
                    telefono: persona.telefono,
                    correo: persona.correo
                }, (err) => {
                    if (!err) {
                        db_1.default.query(`SELECT * FROM producto`, (err, r) => {
                            if (!err) {
                                r.map((producto) => {
                                    arrayPrecios.push({
                                        id_producto: producto.id_producto,
                                        precio: producto.precio
                                    });
                                });
                                listado.map((producto) => {
                                    db_1.default.query('INSERT INTO detalle_productos SET ?', {
                                        id_producto: producto.id_producto,
                                        cantidad: Number.parseInt(producto.cantidad),
                                        id_detallefactura: id_detallefactura,
                                    }, (err) => {
                                        db_1.default.query(`SELECT * from producto WHERE id_producto = ${producto.id_producto}`, (err, p) => {
                                            if (!err) {
                                                db_1.default.query(`UPDATE producto SET stock=${p[0].stock - producto.cantidad} WHERE id_producto = ${producto.id_producto}`, (err) => {
                                                    !err ? console.log('Stock actualizado') : console.log(err);
                                                });
                                            }
                                            else {
                                                console.log(err);
                                            }
                                        });
                                        !err ? console.log('DETALLE PRODUCTO') : console.log(err);
                                    });
                                });
                                const anoInicio = 2011;
                                const procesoAno = (0, moment_1.default)().get('year');
                                const nombreFactura = 'E' + ('0000000' + (procesoAno - anoInicio).toString()).slice(-5) + '-' + id_detallefactura;
                                db_1.default.query('INSERT INTO detalle_factura SET ?', {
                                    id_detallefactura: id_detallefactura,
                                    id_cliente: Number.parseInt(persona.dni).toString(),
                                    id_usuario: currentUser,
                                    tiempoejecucion: tiempo,
                                    fecha: (0, moment_1.default)(Date.now()).format("DD-MM-YYYY"),
                                    importetotal: Number.parseFloat(listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0).toFixed(2)),
                                    estado: "FACTURADO",
                                    igv: Number.parseFloat((listado.reduce((a, b) => a + (b.precio * Number.parseInt(b.cantidad)), 0) * 0.18).toFixed(2))
                                }, (err) => {
                                    if (!err) {
                                        db_1.default.query('INSERT INTO factura SET ?', {
                                            id_detallefactura: id_detallefactura,
                                            numerofactura: nombreFactura,
                                        }, (err) => {
                                            !err ? res.json({ message: 'success' }) : console.log(err);
                                        });
                                    }
                                    else {
                                        console.log(err);
                                    }
                                });
                            }
                            else {
                                console.log(err);
                            }
                        });
                    }
                });
            }
        }
        else {
            console.log('Error');
        }
    });
});
registrosRouter.get("/obtener-facturas", (req, res) => {
    db_1.default.query('SELECT * FROM detalle_factura df JOIN factura f ON df.id_detallefactura = f.id_detallefactura JOIN cliente c ON df.id_cliente = c.id_cliente', (err, rows) => {
        const facturas = [...rows].filter((row) => (row.id_tipocliente == 2));
        const boletas = [...rows].filter((row) => (row.id_tipocliente == 1));
        res.send({
            boletas: boletas,
            facturas: facturas
        });
    });
});
registrosRouter.post("/anular", (req, res) => {
    const id = req.body.id;
    console.log(id);
    db_1.default.query(`SELECT * FROM detalle_factura df JOIN detalle_productos dp ON df.id_detallefactura=dp.id_detallefactura JOIN factura f ON f.id_detallefactura = df.id_detallefactura JOIN producto p on p.id_producto = dp.id_producto  WHERE df.id_detallefactura=${id}`, (err, result) => {
        if (result[0].estado == "FACTURADO") {
            if (!err) {
                result.map((pedido) => {
                    const { id_producto, cantidad } = pedido;
                    db_1.default.query(`SELECT * FROM producto WHERE id_producto = ${id_producto}`, (err, producto) => {
                        db_1.default.query(`UPDATE producto SET stock=${producto[0].stock + cantidad} WHERE id_producto = ${id_producto}`, (err, fields) => {
                            if (!err) {
                                console.log('Stock actualizado');
                            }
                        });
                    });
                });
                db_1.default.query(`UPDATE detalle_factura SET estado ="CANCELADO" WHERE id_detallefactura = ${id}`, (err) => {
                    if (!err) {
                        console.log('Factura cancelada');
                    }
                });
            }
            else {
                console.log(err);
            }
        }
        else {
            console.log('Factura ya cancelada');
        }
    });
});
exports.default = registrosRouter;
