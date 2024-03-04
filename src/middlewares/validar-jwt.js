import jwt from "jsonwebtoken";
import Usuario from "../usuario/usuario.model.js";

export const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(400).json({
      msg: "No existe el token",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findOne({ _id: uid });
    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario no existe",
      });
    }
    req.usuario = usuario;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      msg: "El token no es válido",
    });
  }
};
