import { Request, Response } from "express";
import usuario from "../models/usuario.model";
import db from "../config/db";

const express = require("express");
const usuariosRouter = express.Router();
const jwt = require("jsonwebtoken");

usuariosRouter.post("/login", (req: Request, res: Response) => {

  const params: usuario = req.body;
  console.log(req.body)

  db.query(
    "SELECT dni, contraseña, id_tipousuario, id_usuario FROM usuario where dni =?",
    [params.dni],
    (err: any, result: any) => {
      if (err) {
        res.send(null);
        console.error(err);
      } else {
        if (result.length > 0) {
          if (params.contraseña == result[0].contraseña) {
            const token = jwt.sign({
              status: "success",
              rol: result[0].id_tipousuario,
            }, 'taller_formación');
            
            res.json({message: "Login exitoso",token, data: {dni: result[0].dni, id_usuario: result[0].id_usuario}});
          } else {
            res.json({message: "Contraseña incorrecta"});
          }
        } else {
          res.json({message: "Usuario no encontrado"});
        }
      }
    }
  );
});

export default usuariosRouter;
