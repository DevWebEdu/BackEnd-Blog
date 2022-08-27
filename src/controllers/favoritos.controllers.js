
import { articleModel } from "../models/articulos.model.js";
import { usuarioModel } from "../models/usuarios.models.js";

export  const agregarFavorito = async(req,res) =>{
    try {
        // recuperamos el id del req.paramas , que toma todos los parametros
        const {id}=req.params
        // buscamos el articulo
        const {categorias,titulo,autorAlias} = await articleModel.findById(id)
        if(categorias && titulo && autorAlias){
            // si en realidad existe el articulo lo condicionamos para sustraer el usuario 
            const user = await usuarioModel.findById(req.user._id)                                        
            // reconfiguramos el user.favoritos[array] para solo sustraer el id ya que viene con un formato "new ObjectId("4asdasd48d4s9a8ds")"
            const favoritos = user.favoritos.map((fav)=>
                    fav.articleId.toString()
            )
            const favoritoEncontrado = favoritos.includes(id)//creamos una variable que nos retornara null en el caso de que exista o no el id dentro de los favoritos del usuario , retornara true , si hay existencia , y false si no se encontro el id del articulo
            // solo puede haber un id de un articulo en los favoritos del usuario , este no se puede repetir
                if(favoritoEncontrado){
                    // en el caso de que se encuentre un favorito , se enviara un error , ya que no pueden haber dos existencias
                    return res.status(400).json({
                        message:"El articulo ya existe en la lista",
                        result:null
                    })
                }else{                    
                    // en el caso que no se encuentre una existencia , se agregara el id del articulo al articleId de los favoritos del usuario
                    user.favoritos.push({articleId:id,article:{categorias,titulo,autorAlias}})
                    // luego lo guardamos en la base de datos
                    user.save()
                    // cambiamos el formato del dato a JSON
                    user.toJSON()
                    return res.status(201).json({
                        message:"Se guardo en favoritos correctamente",
                        result:user
                    })
                }            
        }else{            
            return res.status(400).json({
                message:"El articulo no existe",
                result:null
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:error.message,
            result:null
        })
    }
}


export const listarFavoritos = async(req,res)=>{    
    try{
        const id = req.user._id
        const  user = await usuarioModel.findById(id)    
        const mapFav = user.favoritos.map((fav)=>fav.articleId)
            mapFav.forEach(async(fav)=>{
                const articles = await articleModel.find({_id:fav})
                    if(Object.keys(articles).length === 0 ){
                        user.favoritos.forEach((userFav,i)=>{
                                if(userFav.articleId===fav){ 
                                    user.favoritos.splice(i,1)
                                    user.save()
                                }
                        })
                    }
            })        
        
        return res.status(200).json({
            message:"Se actualizo los favoritos",
            result : user.favoritos
        })
    }catch(error){
        return res.status(400).json({
            message:error.message,
            result : null
        })
    }
}

export const eliminarFavorito = async(req,res) => {
    try{
        const data = req.body
        const user = await usuarioModel.findById(req.user._id)
        user.favoritos.forEach((fav,i)=>{
            if(fav.articleId.toString()===data.articleId){
                user.favoritos.splice(i,1)
                user.save()
               }  
        })       
        return res.status(200).json({
                message:"Se elimino el favorito elegido",
                result:user.favoritos
            })
    }catch(error){
        return res.status(400).json({
            message:error.message,
            result:null
        })
    }
}