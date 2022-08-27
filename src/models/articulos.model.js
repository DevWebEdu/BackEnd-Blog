import mongoose from "mongoose"
import { usuarioModel } from "./usuarios.models.js";


const articleCategoria =["FUTBOL","COCINA","POLÍTICA"]
// los likes van a estar compartidos de  1-n ya que un articulo puede tener muchos likes y un comentario tambien puede tener muchos likes
const likesSchema = new mongoose.Schema({
    userId : {
        name:"id_usuario",
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        validate: async(data)=>{
            const user =  await usuarioModel.findById(data);
            if(user){
                return data
            }else{
                throw new Error()
            }
        }
    },
    user:{
        type:mongoose.Schema.Types.Array
    }
},{
    timestamps:{
        createdAt:"fecha_creacion",
        updatedAt:false,
    }
})


const commentsSchema = new mongoose.Schema({
    userId:{
        name:"id_usuario",
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        validate: async(data)=>{
            const user =  await usuarioModel.findById(data);
            if(user){
                return data
            }else{
                throw new Error()
            }
        }
    },
    user:{
        type:mongoose.Schema.Types.Array,

    },
    body:{
        type:String,
        required:true
    }, 
    likes:{
        type:[likesSchema]
    }   
},
{
    timestamps:{
        createdAt:"fecha_creacion",
        updatedAt:false
    }
})





const articleSchema = new mongoose.Schema({
    userId :{
        name:"id_usuario",
        required: true,
        type:mongoose.Schema.Types.ObjectId,
        validate: async(data)=>{
            const user =  await usuarioModel.findById(data);
            if(user){
                return data
            }else{
                throw new Error()
            }
        },
        
    },
    categorias:{
        type:mongoose.Schema.Types.String,
        enum:articleCategoria,
        required:true
    },
    titulo:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    autorAlias:{
        name:"alias",
        type:mongoose.Schema.Types.String,
        required:true
    },
    likes:{
        type:[likesSchema]
    },
    
    comentarios:{
        type:[commentsSchema]
    },
    body:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    foto:{
        type:mongoose.Schema.Types.String,
    }
},{
    timestamps:{
        createdAt:"fecha_creacion",
        updatedAt:false
    }
})


export const articleModel = mongoose.model("article",articleSchema)