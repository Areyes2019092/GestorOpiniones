import { check } from "express-validator";
import { Router } from "express";
import { validarInformacion } from "../middlewares/validarCampos.js";
import { categoriasExiste, categorias, postExiste } from "../helpers/validar-db.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { postDelete, postPost, postPut } from "./post.controller.js";
const router = Router();

router.get("/", categorias);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
        //check("id").custom(postExiste),
        validarInformacion,
    ], postDelete
);

router.post(
  "/",
  [
    validarJWT,
    check("principal", "La informacion es obligatoria").not().isEmpty(),
    check("categoria", "La categoria es obligatoria").not().isEmpty(),
    check("categoria").custom(categoriasExiste),
    check("contenido", "El contenido es obligatorio").not().isEmpty(),
    validarInformacion,
  ],
  postPost
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
        //check("id").custom(postExiste),
        validarInformacion,
    ],postPut
);

export default router;