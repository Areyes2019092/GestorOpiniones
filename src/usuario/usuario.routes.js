import { Router } from "express";
import { check } from "express-validator";
import { correoExiste, usuarioExiste } from "../helpers/validar-db.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { login, registrar, editarContrasena, editarNombre } from "./usuario.controller.js";
const router = Router();
import { validarInformacion } from "../middlewares/validarCampos.js";

router.put(
  "/password/",
  [
    validarJWT,
    check("contrasenaAnterior", "La contrasena es muy corta").isLength({
      min: 5,
    }),
    check("contrasenaNueva", "La contrasena es muy corta").isLength({
      min: 5,
    }),
    validarInformacion,
  ],
  editarContrasena
);


router.get(
    "/",
    [
        validarInformacion
    ],
    login
)

router.put(
  "/",
    [
        validarJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validarInformacion,
    ],
  editarNombre
);

router.post(
  "/",
  [
      check("name","El nombre es obligatorio").not().isEmpty(),
      check("user", "El usuario es obligatorio").not().isEmpty(),
      check("user").custom(usuarioExiste),
      check("email", "El correo es obligatorio").isEmail(),
      check("email").custom(correoExiste),
      check("password", "La contrasena es muy corta").isLength({
          min:5
      }),
      validarInformacion      
  ],
  registrar
);

export default router;
