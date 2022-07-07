"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productos_controller_1 = __importDefault(require("./controllers/productos.controller"));
const usuarios_controller_1 = __importDefault(require("./controllers/usuarios.controller"));
const clientes_controller_1 = __importDefault(require("./controllers/clientes.controller"));
const facturas_controller_1 = __importDefault(require("./controllers/facturas.controller"));
const dashboard_controller_1 = __importDefault(require("./controllers/dashboard.controller"));
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT || 5001, () => {
    console.log('Server is running on', process.env.PORT);
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/productos", productos_controller_1.default);
app.use("/usuarios", usuarios_controller_1.default);
app.use("/clientes", clientes_controller_1.default);
app.use("/facturas", facturas_controller_1.default);
app.use("/reportes", dashboard_controller_1.default);
