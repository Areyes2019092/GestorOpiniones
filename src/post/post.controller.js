import { response } from 'express';
import Post from './post.model.js';

export const postGet = async(req, res = response) => {
    const { final, inicio } = req.query;
    const archivo = { estado: true };
    const [total, post] = await Promise.all([
        Post.countDocuments(archivo),
        Post.find(archivo)
            .skip(Number(inicio))
            .limit(Number(final))
    ]);
    res.status(200).json({total, post});
}

export const postDelete = async(req, res) => {
    const {id} = req.params;
    await Post.findByIdAndUpdate(id,{estado: false});
    
    res.status(200).json({
        msg: 'Se elimino el post'
    });
}

export const postPost = async(req, res) => {
    const id =  req.usuario._id;
    const { principal, categoria, contenido } = req.body;
    const post = new Post({
        principal, categoria, contenido, usuario: id
    });
    await post.save();

    res.status(200).json({msg: 'Se publico el post'});
}

export const postPut = async(req, res) =>{
    const {_id, usuario, respuesta, ...resto} = req.body;
    const {id} = req.params;
    await Post.findByIdAndUpdate(id, resto);
    const post = await Post.findOne({_id: id});
    await post.save();

    res.status(200).json({msg : 'El comentario se actualizo de forma correcta'})
}