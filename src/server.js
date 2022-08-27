import express from  "express"
import mongoose from "mongoose"
import { articleRouter } from "./routes/articulos.routes.js"
import { commentRouter } from "./routes/comentarios.routes.js"
import { favoritesRouter } from "./routes/favoritos.routes.js"
import { likesRouter } from "./routes/likes.routes.js"
import { userRouter } from "./routes/usuarios.routes.js"


const app = express()
app.use(express.json())

const PORT=process.env.PORT
app.use(userRouter)
app.use(articleRouter)
app.use(commentRouter)
app.use(favoritesRouter)
app.use(likesRouter)
mongoose.connect(process.env.MONGO_URL,{
    serverSelectionTimeoutMS:3000
}).then(()=>{
    console.log("Base de datos conectada correctamente");
    app.listen(PORT,()=>{
        console.log(`servidor corriendo en el puerto ${PORT}`)
    })
}).catch((error)=>{
    console.log("Error al conectar base de datos")
})

