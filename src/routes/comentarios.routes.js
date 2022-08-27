import { Router } from "express";
import { crearComentario, listarComentarios } from "../controllers/comentarios.controllers.js";
import { validarToken } from "../validators/userValidator.validators.js";

export const commentRouter = Router()

commentRouter
    .post("/comentario/:id",validarToken,crearComentario)
    .get("/comentario/:id",listarComentarios)        