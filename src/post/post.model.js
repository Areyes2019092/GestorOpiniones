import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    principal:{
        type: String,
        required: [true, "Es obligatorio que el post tenga un tema"]
    },
    categoria:{
        type: String,
        required: [true, "Es obligatorio que el post tenga una categoria"]
    },
    contenido:{
        type: String,
        required: [true, "Es obligatorio que el post tenga contenido"]
    },
    usuario:{
        type: String,
        required: [true, "Es obligatorio que el post tenga el id de quien lo publico"]
    },
    respuesta:{
        type: [String],
        default: []
    },
    estado:{
        type: Boolean,
        default: true
    }

});

export default mongoose.model('Post', PostSchema);