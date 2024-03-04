/*import { check } from "express-validator";
import { Router } from "express";
import { validarInformacion, datosPrincipales, datosPrincipalesMal } from "../middlewares/validarCampos.js";
import { login } from "./autor.controller.js";

const router = Router();

router.post(
    '/login',
    [
        check('password','La contraseña no puede estar vacia').not().isEmpty(),
        datosPrincipales,
        datosPrincipalesMal,
        validarInformacion
    ],login
)

export default router;
*/