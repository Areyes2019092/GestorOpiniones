'use strict';

import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import  express  from "express";
import { dbConnection } from "./mongo";
import postRoutes from '../src/post/post.routes.js'