import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import { articleModel } from "./articulos.model.js"

const favoritosSchema = new mongoose.Schema({
    articleId:{
        type:mongoose.Schema.Types.ObjectId,
        validate: async(valor)=>{
            const article = await articleModel.findById(valor)
            if(article){
                return valor
            }else{
                return new Error()
            }
        },
    },
    article:{
        type:mongoose.Schema.Types.Array
    },
    estado :{
        type:mongoose.Schema.Types.Boolean,
        default: true
    }    
},{
    _id:false
})


const usuarioSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        set:(valor)=>bcryptjs.hashSync(valor,10)
    },
    nombre:{
        type:String
    },
    apellido:{
        type:String,
    },
    administrator:{
        type:Boolean,
        default:false
    },
    favoritos:{
        type:[favoritosSchema],
        required:false,
        default:[],
        
    }


})
export const usuarioModel = mongoose.model("user",usuarioSchema)