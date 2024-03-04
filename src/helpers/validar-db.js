import User from '../usuario/usuario.model.js';
import Respuesta from '../respuestas/respuesta.model.js';
import Post from '../post/post.model.js';

export const usuarioId = async (id = '') => {
    const existe = await User.findById(id);
    if (!existe){
        throw new Error('El usuario no existe');
    }
}

export const respuestaExiste = async (id = "") => {
  const existeRespuesta = await Respuesta.findById({ id });
  if (!existeRespuesta) {
    throw new Error("Este comentario no se encontro");
  }
};

export function categorias(req, res) {
    const categorias = ["Educacion",
        "Entretenimiento",
        "Informacion",
        "Personal"
    ];
  res.status(200).json({ categories: categorias });
}

export async function categoriasExiste(category = "") {
  const categorias = [
    "Educacion",
    "Entretenimiento",
    "Informacion",
    "Personal",
    ];
    if(!categorias.includes(category))
  res.status(400).json({ msg :'No existe la categoria'});
}


export const postExiste = async (id = "") => {
  const existePost = await Post.findById({ id });
  if (!existePost) {
    throw new Error("Este comentario no se encontro");
  }
};



export const correoExiste = async (correo = '') => {
    const existeCorreo = await User.findOne({correo});
    if (existeCorreo){
        throw new Error('Este correo ya esta en uso')
    }
}

export const usuarioExiste = async (usuario = "") => {
  const existeUsuario = await User.findOne({ user: usuario });
  if (existeUsuario) {
    throw new Error('El usuario ya existe');
  }
};
