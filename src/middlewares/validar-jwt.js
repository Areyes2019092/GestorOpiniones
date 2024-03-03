import jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(400).json({
            msg: "No existe el token"
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe'
            })
        }
        if (!usuario.state) {
            return res.status(401).json({
                msg: 'El usuario esta inhabilitado'
            })
        }
        req.usuario = usuario;
        req.usuarioId = await Usuario.findById(uid);
        next();
    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "El token no es valido"
            });
    }
}