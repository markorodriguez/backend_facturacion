import {Request, Response} from 'express';
import db from "../config/db"

const express = require('express')
const productoRouter = express.Router()

productoRouter.get("/obtener", (req: Request, res: Response)=>{

    db.query("SELECT * FROM producto", (err: any, result: any)=>{
        if(err){
            console.error(err)
        }else{
           // console.log(result)
            res.send(result)
        }
    })

})

//F002-0000000000346 EJEMPLO FACTURACION

export default productoRouter