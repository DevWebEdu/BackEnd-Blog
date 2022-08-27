import _ from "lodash"
import  jwt from "jsonwebtoken"
import { usuarioModel } from "../models/usuarios.models.js"


export const validarToken = async(req,res,next) =>{
    if(_.isNil(req.headers.authorization)){
        return  res.status(400).json({
            message:"Se necesita una token para realizar esta peticion",
            result:null
        })
    }

    const token= req.headers.authorization.split(" ")[1]
    if(_.isNil(token)){
        return res.status(400).json({
            message:"Formato no valido",
            result:null
        })

    }
    
    try{
        const payload= jwt.verify(token,process.env.JWT_SECRET)
        const user = await usuarioModel.findById(payload.id)
        req.user= user
        
        next()
    }catch (error) {
        return res.status(400).json({
            message:error.message,
            result:null
        })
    }
}