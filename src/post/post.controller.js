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
    const { id } = req.params;
    const postUsuario = await Post.findById(id);
    const permitido = req.usuario;
   
    if(!postUsuario){
        return res.status(404).json({
            msg: "No se encontro el post"
        })
    }
    if (postUsuario.usuario.toString() !== permitido.id) { 
        return res.status(400).json({
            msg: 'Mp se puede eliminar el post'
        });
    }
    try {
        await Post.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({
            msg:'Eliminado'
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Error'
        });
    }
}

export const postPost = async(req, res) => {
    const permitido = req.usuario;
    const { principal, categoria, contenido } = req.body;
    try {
        const post = new Post({
            principal, categoria, contenido, usuario: permitido.id
        });
        await post.save();
        res.status(200).json({
            msg: "Post publicado",
            post
        })
    }catch(error){
        res.status(500).json({
            msg: "No se publico el post"
        });
    }
}

export const postPut = async(req, res) =>{
    const permitido = req.usuario;
    var { principal, categoria, contenido } = req.body;
    var state = true;
    const { id } = req.params;
    const post1 = await Post.findById(id);
    console.log(id);
    console.log(post1.user);
    if(!post1){
        return res.status(404).json({
            msg: "No se encontro el post"
        })
    }
    if (post1.usuario.toString() !== permitido.id) { 
        return res.status(400).json({ msg: 'No puedes eliminar este post' });
    }
    if (!principal) { 
        principal = post1.principal;
    }
    if (!categoria) { 
        categoria = post1.categoria;
        state = false;
    }
    if (state) { 
        const categorias = [
          "Educacion",
          "Entretenimiento",
          "Informacion",
          "Personal",
        ];
        if (!categorias.includes(categoria)) {
            return res.status(400).json({ msg: 'Error en la categoria' });
         }
    }
    if (!contenido) { 
        contenido = post1.contenido
    } try { 
        await Post.findByIdAndUpdate(id, { principal, categoria, contenido });
        const nuevo = await Post.findById(id);
        res.status(200).json({ msg: "Post actualizado", nuevo });
    }catch(error){
      res.status(500).json({ msg: "Error" });
    }
}