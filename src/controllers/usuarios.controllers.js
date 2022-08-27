import { userRequestDTO,loginRequestDTO } from "../dto/usuarios.dto.js";
import { usuarioModel } from "../models/usuarios.models.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export const registroUsuario = async(req,res)=>{
    try {
        //validamos la data ingresada en el request
        const data = userRequestDTO(req.body)
        //luego validada, creamos una instancia de la data a base de la colleccion en el modelo del usuario
        const newUser = await usuarioModel.create(data)
        //extraemos la infomomacion en formato JSON
        //separamos de toda la informacion la contraseña para ocultarla
        const {password, ...result}=newUser.toJSON()

        return res.status(201).json({
            message:"Usuario Registrado Exitosamente",
            result:result
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error al crear el usuario",
            result: error.message
        })
    }
}

export const loginUsuario = async(req,res)=>{
    try{
        //validamos con nuestro DTO el request que se pasa por el body
        const data = loginRequestDTO(req.body)
        //buscamos al usuario ingresado en la data por su email
        const user = await usuarioModel.findOne({email:data.email})
        //esto nos retornara false o true en el caso que no se encunetre se mandara el error de que el correo no existe
        if(!user){
            return res.status(200).json({
                message:"usuario no existe",
                result:null
            })
        }else{
            //en el caso de que exista , compararemos las contraseñas para verificar si en realidad el usuario es el que se intenta logear
            if(bcryptjs.compareSync(data.password, user.password)){
                // al saber que si es el verdadero usuario , proseguiremos a crearle su jwt para que pueda realizar peticiones
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2hr"})
                
                return res.status(200).json({
                    message:"logeado correctamente",
                    result:token
                })

            }else{
                return res.status(200).json({
                    message:"usuario no existe",
                    result:null
                })
            }

        }
    }catch(error){
        return res.status(400).json({
            message:error.message,
            result:null
        })  
    }
}