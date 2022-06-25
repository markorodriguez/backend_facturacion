"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productos_controller_1 = __importDefault(require("./controllers/productos.controller"));
const usuarios_controller_1 = __importDefault(require("./controllers/usuarios.controller"));
const clientes_controller_1 = __importDefault(require("./controllers/clientes.controller"));
const facturas_controller_1 = __importDefault(require("./controllers/facturas.controller"));
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT || 9812, () => {
    console.log('Server is running on', process.env.PORT);
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/productos", productos_controller_1.default);
app.use("/usuarios", usuarios_controller_1.default);
app.use("/clientes", clientes_controller_1.default);
app.use("/facturas", facturas_controller_1.default);
/*
app.post("/login", (req:any,res:any)=>{
    const params:userCredentials = req.body
    if(params.username === "admin" && params.password === "admin"){
        res.json({message: "authenticated"})
    }
})

const tokenApi = "f01e10c48723c9573507701c9a71f52c5b0bafc2a2cd51f865617c09c60329bf"

app.post("/verificar-ruc", (req:any, res:any)=>{
    const params:rucRequest = req.body
    axios.get(`https://apiperu.dev/api/ruc/${params.ruc}?api_token=${tokenApi}`).then((r:any)=>{
        res.send(r.data)
    })
})

app.post("/verificar-dni", (req:any,res:any)=>{
    const params:userRequest = req.body
    console.log(params)

    axios.get(`https://apiperu.dev/api/dni/${params.dni}?api_token=${tokenApi}`).then((r:any)=>{
        console.log(r.data)
        res.send(r.data)
    })
})

app.post("/registrar-boleta", (req:any, res:any)=>{
    const params:IBoleta = req.body
    console.table(params)
})

app.post("/registrar-factura", (req:any, res:any)=>{
    const params:any = req.body
    console.table(params)
})

*/ 
