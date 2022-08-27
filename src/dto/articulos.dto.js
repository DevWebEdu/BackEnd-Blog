import _ from "lodash"

export const  articleRequestDTO = (data) =>{
    const errores = []
    
    if(_.isNil(data.categorias)){
        errores.push("Falta la categoria")
    }
    if(_.isNil(data.titulo)){
        errores.push("Falta el titulo")
    }
    if(_.isNil(data.autorAlias)){
        errores.push("Falta el alias del autor")
    }
    if(_.isNil(data.body)){
        errores.push("Falta el cuerpo del articulo")
    }
    if (errores.length !== 0) {
        throw new Error(errores);
      } else {
        return data;
      }
}