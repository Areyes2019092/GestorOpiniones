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

export const respuestaPut = async(req, res) =>{
    const { postId, autorId , estado, ...resto } = req.body;
    const { id } = req.params;
    await Respuesta.findByIdAndUpdate(id, resto);
    const respuesta = await Respuesta.findOne({ _id: id});
    await respuesta.save();
    res.status(200).json({msg: 'La respuesta se actualiza correctamente'});
}

export const respuestaPost = async(req, res) =>{
    const {id} = req.params;
    const {contenido} = req.body;
    const nombre = req.usuario.nombre;
    const autorId = req.usuario._id;
    const post = await Post.findByIdAndUpdate(
        {_id:id, respuesta:{$ne: respuesta._id}},
        {$addToSet:{respuesta: respuesta._id }},
        {new: true}
    )
    const respuesta = new Respuesta({
        nombre, contenido, postId: id, autorId
    });
    await post.save();
    await respuesta.save();
   
    res.status(200).json({
        msg: 'Haz publicado una respuesta'
    })
}

export const respuestaDelete = async(req, res)=>{
    const {id} = req.params;
    await Respuesta.findByIdAndUpdate(id,{estado: false})
    
    res.status(200).json({
        msg: 'La respuesta al post se elimino'
    });
}