import _ from "lodash"
import  jwt from "jsonwebtoken"
import { usuarioModel } from "../models/usuarios.models.js"


export const validarAdministratorToken = async(req,res,next) =>{
    if(_.isNil(req.headers.authorization)){
        return  res.status(400).json({
            message:"Se necesita una token para realizar esta peticion",
            result:null
        })
    }

    const token= req.headers.authorization.split(" ")[1]
    // console.log(token)
    if(_.isNil(token)){
        return res.status(400).json({
            message:"Formato no valido",
            result:null
        })

    }
    
    try{
    const payload= jwt.verify(token,process.env.JWT_SECRET)
    const user = await usuarioModel.findById(payload.id)
    // console.log(user)
        if(!user.administrator){
            return res.status(400).json({
                message:"La token se decifro correctamente pero el usuario no es administrador",
                result:null
            })
        }else{
            req.user=user
            next()
        }
    }catch (error) {
        return res.status(400).json({
            message:error.message,
            result:null
        })
    }
}