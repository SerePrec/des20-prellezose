import express from "express";
import session from "express-session";
import compression from "compression";
import MongoStore from "connect-mongo";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { passport } from "./middlewares/passport.js";
import { isAuthApi } from "./middlewares/auth.js";
import {
  getError404Api,
  getError404Web
} from "./controllers/error404Controller.js";
import config from "./config.js";
import authRouter from "./routes/authRouter.js";
import webServerRouter from "./routes/webServerRouter.js";
import apiTestsRouter from "./routes/apiTestsRouter.js";
import apiProductosRouter from "./routes/apiProductosRouter.js";
import apiRandomsRouter from "./routes/apiRandomsRouter.js";
import { logger } from "./logger/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// configuración motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares para parsear el body del request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// compresión de respuestas
app.use(compression());

// middleware para loguear cada request
app.use((req, res, next) => {
  logger.info(`[Request] '${req.baseUrl + req.path}' método [${req.method}]`);
  next();
});

// servir archivos estáticos
app.use(express.static(path.join(__dirname, "public"))); // comentar si utilizo Nginx como servidor de recursos estáticos

// sesiones. SESSION STORE: MONGOSTORE
app.use(
  session({
    store: MongoStore.create(config.session.mongoStoreOptions),
    ...config.session.options
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use(authRouter);
app.use(webServerRouter);
app.use("/api", apiTestsRouter);
app.use("/api/randoms", apiRandomsRouter);
app.use("/api/productos", isAuthApi, apiProductosRouter);

// error 404 API
app.use("/api", getError404Api);

// error 404 WEB
app.use(getError404Web);

export default app;
