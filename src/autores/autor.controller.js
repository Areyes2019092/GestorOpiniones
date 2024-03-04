/*
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generar-jwt.js';
import Usuario from '../usuario/usuario.model.js'

export const login = async(req, res) => {
    const { name, email, password } = req.body;
    let usuario;
    try {
        if (name != null) {
            usuario = await Usuario.findOne({ name });
        } else if (email != null) {
            usuario = await Usuario.findOne({ email });
        }
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        const contrasenaValida = bcryptjs.compareSync(password, usuario.password);
        if (!contrasenaValida) {
            return res.status(400).json({
                msg: 'La contraseña no es válida'
            });
        }
        // Actualizar estado del usuario si es necesario
        await Usuario.findByIdAndUpdate(usuario._id, { state: true });
        const token = await generateJWT(usuario.id);
        res.status(200).json({
            msg: 'Bienvenido',
            usuario,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}
*/