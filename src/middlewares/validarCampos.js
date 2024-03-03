import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";
import Post from '../post/post.model.js'
import Respuesta from '../respuestas/respuesta.model.js'

export const datosPrincipales = (req, res, next) =>{
    const { name, email} = req.body;
    if (email == null && name == null){
        return res.status(400).json({
            msg: 'Los datos no pueden ir vacios'
        });
    }
    next();
} 

export const encontrarRespuesta = async(req, res, next) =>{
    const usuario = req.usuario._id
    const {id} = req.params;
    const comprobarId = await Respuesta.findById(id)
    if(!comprobarId){
        return res.status(400).json({ msg: 'El post no se encuentra'})
    }
    if(comprobarId.autorId != usuario){
        return res.status(401).json({ msg: 'Permiso denegado'});
    }
    next();
}

export const datosPrincipalesMal = (req, res, next) => {
    const { name, email } = req.body;
    if (email && name) {
        return res.status(400).json({
            error: 'Ingreso de datos erroneos'
        });
    }
    next();
};


export const encontrarPost = async(req, res, next) =>{
    const usuarios = req.usuario._id;
    const { id } = req.params;
    const comprobarId = await Post.findById(id);
    if(!comprobarId){ 
        return res.status(404).json({msg: 'No se encontro la pagina'})
    }
    if(comprobarId.usuario != usuarios){
        return res.status(401).json({msg: 'Permiso denegado'});
    }
    next();
}

export const comprobarPassword = (req, res, next) =>{
    const { contrasenaAnterior } = req.body;
    const contrasenasAnteriores = bcryptjs.compareSync(contrasenaAnterior, req.usuario.password);
    if(!contrasenasAnteriores){
        return res.status(400).json({
            msg: 'Datos Erroneos'
        });
    }
    next();
} 

export const idRepetido = async (req, res, next) =>{
    const {id} = req.params;
    await Post.findById(id);
    const comprobarId = await Post.findOne({_id:id});
    if(!comprobarId){
        return res.status(400).json({
            msg: 'No se pudo encontrar el post en la base de datos'
        })
    }
    next();
}


export const validarInformacion = (req, res, next) => {
    const informacionIncorrecta = validationResult(req);
    if(!informacionIncorrecta.isEmpty()){
        return res.status(400).json(informacionIncorrecta);
    }
    next();
}