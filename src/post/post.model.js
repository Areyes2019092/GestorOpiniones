import mongoose, { Schema } from "mongoose";

const PostSchema = mongoose.Schema({
  principal: {
    type: String,
    required: [true, "Es obligatorio que el post tenga un tema"],
  },
  categoria: {
    type: String,
    required: [true, "Es obligatorio que el post tenga una categoria"],
  },
  contenido: {
    type: String,
    required: [true, "Es obligatorio que el post tenga contenido"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  respuesta: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Respuesta",
      },
    ],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

/*
PostSchema.methods.addRespuestaById() = async
function(respuestaId) { 
    this.respuestas.push(respuestaId);
    await this.save();
}
*/
PostSchema.statics.addRespuestaById = async function (postId, respuestaId) {
  const post = await this.findById(postId);
  if (!post) {
    throw new Error("No se encontró el post");
  }
  post.respuesta.push(respuestaId);
  await post.save();
};

PostSchema.methods.toJSON = function () {
  const { __v, _id, ...resto } = this.toObject();
  resto.uid = _id;
  return resto;
};

export default mongoose.model("Post", PostSchema);
