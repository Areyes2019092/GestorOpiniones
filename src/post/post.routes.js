import { check } from "express-validator";
import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import { encontrarPost ,validarInformacion } from "../middlewares/validarCampos";
import { postDelete, postGet, postPost, postPut } from "./post.controller";

const router = Router();

router.get("/", postGet);

router.delete(
    "/:id",
    [
        validarJWT,
        encontrarPost,
        validarInformacion
    ], postDelete
);

router.post(
    "/",
    [
        validarJWT,
        check("principal","La informacion es obligatoria").not().isEmpty(),
        check("categoria","La categoria es obligatoria").not().isEmpty(),
        check("contenido","El contenido es obligatorio").isLength({
            min: 1
        }),
        validarInformacion
    ],postPost
);

router.put(
    "/:id",
    [
        validarJWT,
        encontrarPost,
        validarInformacion
    ],postPut
);

export default router;