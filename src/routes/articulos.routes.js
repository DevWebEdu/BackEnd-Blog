import { Router } from "express";
import { crearArticulo, listarArticulos,deleteArticulo } from "../controllers/articulos.controllers.js";
import { validarAdministratorToken } from "../validators/userAdministrator.validator.js";


export const articleRouter = Router()

articleRouter
            .post("/articulos",validarAdministratorToken,crearArticulo)
            .get("/articulos",listarArticulos)
            .delete("/articulo/:id",validarAdministratorToken,deleteArticulo)