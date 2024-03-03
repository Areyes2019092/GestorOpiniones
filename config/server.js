'use strict';

import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import  express  from "express";
import { dbConnection } from "./mongo.js";
import postRoutes from '../src/post/post.routes.js';
import autorRoutes from '../src/autores/autor.routes.js';
import userRoutes from '../src/usuario/usuario.routes.js';
import respuestaRoutes from '../src/respuestas/respuesta.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.postPath = '/GestorOpiniones/v1/post'
        this.userPath = '/GestorOpiniones/v1/user'
        this.autorPath = '/GestorOpiniones/v1/autor'
        this.respuestaPath = '/GestorOpiniones/v1/respuesta'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.postPath, postRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.autorPath, autorRoutes);
        this.app.use(this.respuestaPath, respuestaRoutes);
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose en pueto', this.port);
        });   
    }
}

export default Server;
