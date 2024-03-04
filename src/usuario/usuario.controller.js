import bcryptjs from 'bcryptjs';
import Usuario from './usuario.model.js'


export const usuarioPut = async(req, res) => {
    const id = req.usuarioId._id;
    const { _id, img, state, ...resto} = req.body;
    await Usuario.findByIdAndUpdate(id, resto);
    const usuario = await Usuario.findOne({_id: id});
    const { password } = req.body;

    if(password == null){

    }else{
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
    }
    await usuario.save();


    res.status(200).json({msg: 'Usaurio actualizado correctamente'});
};


export const usuarioPost = async(req, res) => {
    const { name, email, password } = req.body;

    const usuario = new Usuario({
        name, email, password
    });
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();

    res.status(200).json({
        usuario
    });
};

