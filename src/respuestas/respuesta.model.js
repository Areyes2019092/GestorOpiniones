import mongoose from "mongoose";

const RespuestaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    contenido:{
        type: String,
        required: [true, "La respuesta no puede ir vacia"]
    },
    postId:{
        type: String,
        required: [true, "Para responder a este comentario necesita el id del post"]
    },
    autorId:{
        type: String,
        required: [true, "Para responder a este comentario necesita el id del autor"]
    },
    estado:{
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Respuesta', RespuestaSchema);
