import User from '../usuario/usuario.model.js'

export const usuarioId = async (id = '') => {
    const existe = await User.findById(id);
    if (!existe){
        throw new Error('El usuario no existe');
    }
}

export const usuarioCorreo = async (correo = '') => {
    const correo = await User.findOne({correo});
    if (correo){
        throw new Error('Este correo ya esta en uso')
    }
}