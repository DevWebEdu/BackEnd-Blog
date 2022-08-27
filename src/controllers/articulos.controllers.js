
import { articleRequestDTO } from "../dto/articulos.dto.js";
import { articleModel } from "../models/articulos.model.js";



export const crearArticulo = async(req,res)=>{
    try{
        

        const data = articleRequestDTO(req.body)
        data.userId=req.user._id
        const newArticle = await articleModel.create(data)
        newArticle.toJSON()
        return res.status(201).json({
            message:"Articulo creado",
            result : newArticle
        })
    }catch(error){
        return res.status(400).json({
            message:error.message,
            result:null
        })
    }

    
}

// https://www.mongodb.com/docs/manual/reference/operator/query/
// https://www.mongodb.com/docs/manual/reference/operator/query/regex/ > busqueda usando LIKEs
export const  listarArticulos= async(req,res)=>{
    // console.log(req.query)
    let filtro={}
    const {categorias,titulo} = req.query
        //filtro para realizar la busqueda por titulo
        if(categorias){
            // console.log(categorias)
            filtro={...filtro,categorias:{ $regex: categorias }}
        }       
        // filtro para realizar la busqueda por titulo
        if(titulo){
            filtro={...filtro,titulo:{$regex:titulo}}
        }

    try {      
        const data= await articleModel.find(filtro)
        // console.log(data)
        return res.status(200).json({
            message:"Los articulos listados son:",
            result:data
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message,
            result:null
         })
    }
}


export const  deleteArticulo = async (req,res)=>{
    try {
        const {id} = req.params
        
        const article =await articleModel.findById(id)
        //  const users = await usuarioModel.find()
        // const usersPrint = users.map((user)=>user.favoritos).flat()
        // const idFavorito = usersPrint.map(fav=>fav.articleId)
        // console.log(idFavorito)
        // una forma puede ser que luego de eliminar el id de la tabla articulos , validamos si aun existe este id en algun favorito de algun usuario para asi luego eliminarlo
        console.log(await favoritosModelos.find())
        if(req.user._id.toString() === article.userId.toString()){
         const data = await articleModel.findByIdAndDelete(id)
         
            if(data){
                return res.status(200).json({
                    message:"Articulos eliminado correctamente",
                    result:null
                })
            }else{
                return res.status(400).json({
                    message:"Articulos no se encontro en la base de datos",
                    result:null
                })
    
            }
        }else{
            return res.status(400).json({
                message:"Este articulo solo puede ser borrado por el autor",
                result:null
            })

        }
    }catch(error){
        return res.status(400).json({            
            message:error.message,
            result:null
        })
    }
}