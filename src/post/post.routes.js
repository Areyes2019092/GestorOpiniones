import { check } from "express-validator";
import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import { encontrarPost ,validarInformacion } from "../middlewares/validarCampos";
import { postDelete, postGet, postPost, postPut } from "./post.controller";

const router = Router();

