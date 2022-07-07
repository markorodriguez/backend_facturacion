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
        console.log(filteredTiempo[0].fecha.slice(3, 5));
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
        console.log(reportes);
        res.json(reportes);
    });
});
exports.default = dashboardRouter;
