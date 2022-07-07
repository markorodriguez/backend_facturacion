import productoRouter from "./controllers/productos.controller"
import usuariosRouter from "./controllers/usuarios.controller"
import clienteRouter from "./controllers/clientes.controller"
import facturasRouter from "./controllers/facturas.controller"
import dashboardRouter from "./controllers/dashboard.controller"

require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT || 5001, ()=>{
    console.log('Server is running on', process.env.PORT )
})

app.get("/", (req:any,res:any)=>{
    res.send("Hello World")
})

app.use("/productos", productoRouter)
app.use("/usuarios", usuariosRouter)
app.use("/clientes", clienteRouter)
app.use("/facturas", facturasRouter)
app.use("/reportes", dashboardRouter)