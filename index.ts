import userCredentials from "./interfaces/userCredentials"
import rucRequest from "./interfaces/rucRequest"
import userRequest from "./interfaces/userRequest"
import IBoleta from "./interfaces/IBoleta"

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen('4000', ()=>{
    console.log('Server is running on port 4000')
})


app.get("/", (req:any,res:any)=>{
    res.send("Hello World")
})

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