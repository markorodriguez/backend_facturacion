import productoRouter from "./controllers/productos.controller"
import usuariosRouter from "./controllers/usuarios.controller"
import clienteRouter from "./controllers/clientes.controller"

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server is running on port 5000')
})

app.get("/", (req:any,res:any)=>{
    res.send("Hello World")
})

app.use("/productos", productoRouter)
app.use("/usuarios", usuariosRouter)
app.use("/clientes", clienteRouter)

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