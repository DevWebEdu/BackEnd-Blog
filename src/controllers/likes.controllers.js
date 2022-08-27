import { articleModel } from "../models/articulos.model.js";
import { usuarioModel } from "../models/usuarios.models.js";


export const  agregarLikeArticulo = async(req,res) =>{
        try {
            const {id} = req.params

            const article = await articleModel.findById(id)
            
            if(article){
                const {_id,nombre,apellido} = await usuarioModel.findById(req.user._id)
                const  likes = article.likes.map((like)=>
                    like.userId.toString()
                )
                // console.log(likes)
                const  likeFinded = likes.includes(_id.toString())
                
                if(likeFinded){
                    return res.status(400).json({
                        message:"Ya le dio like a este articulo",
                        result:null
                    })
                }else{
                    article.likes.push({userId:_id,user:{nombre,apellido}})
                    article.save()
                    article.toJSON()

                    return res.status(201).json({
                        message:"Se le dio like correctamente a el articulo",
                        result:article
                    })
                }
            }else{
                return res.status(400).json({
                    message:"el articulo no existe",
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