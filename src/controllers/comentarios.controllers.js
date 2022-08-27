import { commentsRequestDTO } from "../dto/comentarios.dto.js";
import { articleModel } from "../models/articulos.model.js";
import { usuarioModel } from "../models/usuarios.models.js";


export const crearComentario = async(req,res)=>{    
    try{
        // se obtiene el id del articulo mediante el req.params
        const {id} = req.params
        // console.log(id)
        // validamos que el body del articulo no este vacio
        const data = commentsRequestDTO(req.body) 
        // luego obtenemos el id del usuario mediante el req.user._id , teniendo el cuenta que el usuario lo obtenemos del validarToken
        const userId =req.user._id
        const {nombre,apellido} = await usuarioModel.findById(userId)
        // buscamos el articulo mediante el req.params
        const article = await articleModel.findById(id)
        // luego de obtener la data y el userId 
        // empujamos la informacion destructurada 
        article.comentarios.push({userId,user:{nombre,apellido},...data})
        // guardamos la informacion en la base de datos
        await article.save()
        article.toJSON()
        // console.log(article)
        return res.status(201).json({
            message:"Se creo correctamente el comentario",
            result:article
        })
    }catch(error){
        return res.status(400).json({
            message:error.message,
            result:null
        })
    }
}

export const listarComentarios = async(req,res) =>{
    try {
        const {id} = req.params
        const article = await articleModel.findById(id)
        return res.status(200).json({
            message:`los comentario del  Articulo ${article.titulo} son :`,
            result:article.comentarios
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            
            message:error.message,
            result:null
        })
    }
}
