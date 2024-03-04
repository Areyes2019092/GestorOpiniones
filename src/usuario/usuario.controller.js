import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generar-jwt.js";
import Usuario from "./usuario.model.js";

export const editarNombre = async (req, res) => {
  const permitido = req.usuario;
  const nombre = req.body;
  const nuevoUsuario = await Usuario.find({ _id: permitido.id });
  await Usuario.findByIdAndUpdate(permitido.id, nombre);
  res.status(200).json({ msg: "Su nombre se actualizo", nuevoUsuario });
};

export const usuarioPut = async (req, res) => {
  const id = req.usuarioId._id;
  const { _id, img, state, ...resto } = req.body;
  await Usuario.findByIdAndUpdate(id, resto);
  const usuario = await Usuario.findOne({ _id: id });
  const { password } = req.body;

  if (password == null) {
  } else {
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
  }
  await usuario.save();

  res.status(200).json({ msg: "Usaurio actualizado correctamente" });
};

export const login = async (req, res) => {
  const { user, password } = req.body;
  var tok;
  var usuario = await Usuario.findOne({ user: user });
  if (!usuario) {
    usuario = await Usuario.findOne({ email: user });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
  }
  const log = bcryptjs.compareSync(password, usuario.password);
  tok = await generateJWT(usuario.id);
  res.status(200).json({ msg: "Bienvenido", tok });
};

export const registrar = async (req, res) => {
  const { name, user, email, password } = req.body;
  try {
    const salt = bcryptjs.genSaltSync();
    const usuario = new Usuario({ name, user, email, password });
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
      msg: "Usuario registrado",
      usuario,
    });
  } catch (error) {
    res.status(400).json({ msg: "No se pudo registrar", error });
  }
};

export const usuarioPost = async (req, res) => {
  const { name, email, password } = req.body;

  const usuario = new Usuario({
    name,
    email,
    password,
  });
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();

  res.status(200).json({
    usuario,
  });
};

export const editarContrasena = async (req, res) => {
  const { contrasenaAnterior, contrasenaNueva } = req.body;
  const permitido = req.usuario;
  const idPermitido = await Usuario.findOne({ _id: permitido.id });
  const log = bcryptjs.compareSync(contrasenaAnterior, idPermitido.password);
  if (!log) {
    return res.status(400).json({ msg: "Credenciales incorrectas" });
  }
  const salt = bcryptjs.genSaltSync();

  const contrasena = bcryptjs.hashSync(contrasenaNueva, salt);
  await Usuario.findByIdAndUpdate(permitido.id, { password: contrasena });
  res.status(200).json({
    msg: "Contraseña actualizada correctamente",
  });
};
