import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt";
import { usuarioCorreo } from "../helpers/validar-db";
import { usuarioPost, usuarioPut, usuarioDelete  } from "./usuario.controller";
import { validarInformacion, comprobarPassword } from "../middlewares/validarCampos";

const router = Router();

router.put(
    "/",
    [
        validarJWT,
        comprobarPassword,
        validarInformacion
    ],usuarioPut
);

router.delete(
    "/",
    [
        validarJWT,
        validarInformacion
    ], usuarioDelete
);

router.post(
    "/",
    [
        check("name","El nombre no puede estar vacio").not().isEmpty(),
        check("password","La contraseña no puede estar vacia").isLength({
            min: 1
        }),
        check("email","El correo no puede estar vacio").isEmail(),
        check("email").custom(usuarioCorreo),
        validarInformacion
    ],usuarioPost
);


export default router;