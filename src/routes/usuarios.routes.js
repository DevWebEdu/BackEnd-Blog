import { Router } from "express";
import { loginUsuario, registroUsuario } from "../controllers/usuarios.controllers.js";

export const userRouter = Router()
userRouter.post("/registro",registroUsuario)
userRouter.post("/login",loginUsuario)
