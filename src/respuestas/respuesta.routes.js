import { check } from "express-validator";
import { Router } from "express";
import { validarInformacion} from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { respuestaPut ,respuestaPost ,respuestaDelete } from "./respuesta.controller.js";
import { postExiste, respuestaExiste } from "../helpers/validar-db.js";

const router = Router();

router.put(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
       // check("id").custom(respuestaExiste),
        check("contenido", "La respuesta es obligatoria").not().isEmpty(),
        validarInformacion,
    ],respuestaPut
    );


router.delete(
    "/:id",
    [
        validarJWT,
        check("id").isMongoId(),
       // check("id").custom(respuestaExiste),
        validarInformacion,
     ],respuestaDelete
);


router.post(
    "/:id",
    [
        check("id").isMongoId(),
     //   check("id").custom(postExiste),
        validarJWT,
        check("contenido", "El contenido es obligatorio").not().isEmpty(),
        validarInformacion,
    ],respuestaPost
);

export default router;