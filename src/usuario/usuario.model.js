import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "El usuario es obligatorio"]
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { _v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);