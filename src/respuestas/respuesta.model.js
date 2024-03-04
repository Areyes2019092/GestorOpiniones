import mongoose, { Schema } from "mongoose";

const RespuestaSchema = mongoose.Schema({
  contenido: {
    type: String,
    required: [true, "La respuesta no puede ir vacia"]
  },
  nombre: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Respuesta", RespuestaSchema);
