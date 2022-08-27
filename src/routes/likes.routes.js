import {Router} from "express"
import { agregarLikeArticulo } from "../controllers/likes.controllers.js"
import { validarToken } from "../validators/userValidator.validators.js"

export const likesRouter = Router()
likesRouter.route("/like/:id")
            .all(validarToken)
            .post(agregarLikeArticulo)