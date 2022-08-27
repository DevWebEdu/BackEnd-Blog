import _ from "lodash"

export const commentsRequestDTO = data => {
    const errores = []
    if(_.isNil(data.body)){
        errores.push("falta cuerpo del comentario")
    }
    if (errores.length !== 0) {
        throw new Error(errores);
      } else {
        return data;
      }
}