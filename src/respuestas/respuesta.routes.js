import { check } from "express-validator";
import { Router } from "express";
import { validarInformacion, encontrarRespuesta,  idRepetido} from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validar-jwt";
import {  respuestaGet , respuestaPut ,respuestaPost ,respuestaDelete } from "./respuesta.controller";

const router = Router();

router.get("/",respuestaGet);

router.put(
    "/:id",
    [
        validarJWT,
        encontrarRespuesta,
        validarInformacion
    ],respuestaPut
    );


router.delete(
    "/:id",
    [
        validarJWT,
        encontrarRespuesta,
        validarInformacion
    ],respuestaDelete
);


router.post(
    "/:id",
    [
        validarJWT,
        idRepetido,
        check("contenido","El texto no puede ir vacio").isLength({
            min: 1
        }),
        validarInformacion
    ],respuestaPost
);

export default router;