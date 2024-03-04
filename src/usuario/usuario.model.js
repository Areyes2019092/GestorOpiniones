import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "El usuario es obligatorio"]
    },
    user:{
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...userss } = this.toObject();
    userss.uid = _id;
    return userss;
}

export default mongoose.model("User", UserSchema);