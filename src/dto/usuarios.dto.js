import _ from "lodash"
import validator from "validator"

export const userRequestDTO = (data) =>{
 const errores =[]
 if(_.isNil(data.email)){
    errores.push("El correo esta invalido")
 }
 if(!validator.isEmail(data.email)){
    errores.push("Email invalido")
 }
 if(_.isNil(data.nombre)){
    errores.push("falta el nombre")
 }
 if(_.isNil(data.apellido)){
    errores.push("falta el apellido")
 }
 if(_.isNil(data.password)){
    errores.push("falta la contraseña")
 }
 if (errores.length !== 0) {
    throw new Error(errores);
  } else {
    return data;
  }
}

export const loginRequestDTO = (data) =>{
    const errores =[]
    if(_.isNil(data.email)){
        errores.push("El correo esta invalido")
     }
     if(!validator.isEmail(data.email)){
        errores.push("Email invalido")
     }
     if(_.isNil(data.password)){
        errores.push("falta la contraseña")
     }
     if (errores.length !== 0) {
        throw new Error(errores);
      } else {
        return data;
      }
}