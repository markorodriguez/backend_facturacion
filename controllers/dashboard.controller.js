"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const moment_1 = __importDefault(require("moment"));
const express = require('express');
const dashboardRouter = express.Router();
dashboardRouter.get("/", (req, res) => {
    const año = (0, moment_1.default)().year();
    db_1.default.query('SELECT * from detalle_factura', (err, rows) => {
        const filteredTiempo = rows.filter((el) => el.tiempoejecucion != null);
        const filtradoPorAno = [...filteredTiempo].filter((factura) => factura.fecha.slice(6, 10) == año);
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        //console.log(filteredTiempo[0].fecha.slice(3, 5))
        const reportes = [];
        meses.map((mes, index) => {
            const filtradoPorMes = [...filtradoPorAno].filter((factura) => factura.fecha.slice(3, 5) == index + 1);
            const gananciasMes = {
                mes: mes,
                promedio: filtradoPorMes.length > 0 ? ([...filtradoPorMes].reduce((acc, b) => acc + Number.parseInt(b.tiempoejecucion), 0)) / ([...filtradoPorMes].length) : 0,
                ventas: filtradoPorMes.length > 0 ? [...filtradoPorMes].reduce((acc, b) => acc + (Number.parseFloat(b.importetotal) + Number.parseFloat(b.igv)), 0) : 0,
                efectividad: {
                    correctas: [...filtradoPorMes].filter((el) => el.estado == 'FACTURADO').length,
                    canceladas: [...filtradoPorMes].filter((el) => el.estado != 'FACTURADO').length
                }
            };
            reportes.push(gananciasMes);
        });
        //console.log(reportes)
        res.json(reportes);
    });
});
dashboardRouter.post("/reporte-diario", (req, res) => {
    const fecha = (0, moment_1.default)(req.body.fecha).format('DD-MM-YYYY');
    console.log((0, moment_1.default)(req.body.fecha).format('DD-MM-YYYY'));
    db_1.default.query(`SELECT * FROM detalle_factura df JOIN detalle_productos dp ON dp.id_detallefactura = df.id_detallefactura WHERE fecha = '${fecha}'`, (err, rows) => {
        if (!err) {
            const rpta = {
                total: rows.length,
                tiempoPromedio: rows.length > 0 ? (([...rows].reduce((acc, b) => acc + Number.parseInt(b.tiempoejecucion), 0)) / rows.length).toFixed(2) : 0,
                ganancias: rows.length > 0 ? [...rows].reduce((acc, b) => acc + (Number.parseFloat(b.importetotal) + Number.parseFloat(b.igv)), 0).toFixed(2) : 0,
                efectividad: {
                    correctas: [...rows].filter((el) => el.estado == 'FACTURADO').length,
                    canceladas: [...rows].filter((el) => el.estado != 'FACTURADO').length
                }
            };
            console.log(rpta);
            res.send(rpta);
        }
        else {
            console.log(err);
        }
    });
});
exports.default = dashboardRouter;
