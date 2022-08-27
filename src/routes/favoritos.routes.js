import {Router} from "express"
import { agregarFavorito, eliminarFavorito, listarFavoritos } from "../controllers/favoritos.controllers.js"
import { validarToken } from "../validators/userValidator.validators.js"

export const favoritesRouter = Router()

favoritesRouter.route("/favorito/:id")
                .all(validarToken)
                .post(agregarFavorito)

favoritesRouter.route("/favorito")
                .all(validarToken)
                .get(listarFavoritos)
                .delete(eliminarFavorito)