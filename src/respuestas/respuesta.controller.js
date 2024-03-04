import Post from '../post/post.model.js';
import Respuesta from './respuesta.model.js';

export const respuestaGet = async(req, res = response)=>{
    const archivo = { estado: true };
    const {final, inicio} = req.query;
    const [total, respuestas] = await Promise.all([
        Respuesta.countDocuments(archivo),
        Respuesta.find(archivo)
        .skip(Number(inicio))
        .limit(Number(final))
    ]);

    res.status(200).json({
        total,
        respuestas
    })
}

export const respuestaPut = async (req, res) => {
    try {
        const permitido = req.usuario;
        const { id } = req.params;
        const usuarioRespuesta = await Respuesta.findById(id);
        
        const { contenido } = req.body;
        if (!usuarioRespuesta) {
            return res.status(404).json({
                msg: "No se encontró el comentario"
            });
        }
        
        if (usuarioRespuesta.nombre.toString() !== permitido.id) { 
            return res.status(400).json({
                msg: "No se puede editar la respuesta"
            });
        }
        
        await Respuesta.findByIdAndUpdate(id, { contenido }); 
        
        res.status(200).json({ msg: 'Se actualizó su respuesta' });
    } catch (error) { 
        res.status(500).json({
            msg: "Error al actualizar la respuesta",
            error: error.message
        });
    }
}


export const respuestaPost = async (req, res) => {
    try {
        const permitido = req.usuario;
        const { contenido } = req.body;
        const { id } = req.params;
        
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                msg: "No se encontró el post"
            });
        }
        
        const respuesta = new Respuesta({ contenido, nombre: permitido.id });
        await respuesta.save();
        
        // Agregar la respuesta al post
        await Post.addRespuestaById(id, respuesta._id);
        
        res.status(200).json({ msg: 'Se publicó la respuesta' });
    } catch (error) {
        res.status(500).json({ msg: 'No se pudo publicar la respuesta', error });
    }
}


export const respuestaDelete = async(req, res)=>{
    const permitido = req.usuario;
    const { id } = req.params;
    const respuestaUsuario = await Respuesta.findById(id);
    if(!respuestaUsuario){
        return res.status(404).json({
            msg: "No se encontro el comentario"
        });
    }
    if (respuestaUsuario.nombre.toString() !== permitido.id) { 
        return res.status(400).json({
            msg: 'No se pudo eliminar el comentario'
        });
    }
    try {
        await Respuesta.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({
            msg: 'La respuesta al post se elimino'
        });
    } catch (error) { 
        res.status(500).json({msg: 'No se pudo eliminar la respuesta'})
    }
}