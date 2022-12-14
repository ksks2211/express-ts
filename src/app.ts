import express, { ErrorRequestHandler } from "express";
import path from "path";
import indexRouter from "./routes/index";
import uploadRouter from "./routes/upload";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import { StatusCodes } from "http-status-codes";
import { initialize_upload, UPLOAD_TO } from "./upload";
import { connect } from "./models";
import nunjucks from "nunjucks";
import passport from "passport";
import passportConfig from "./passport";

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// passport config
passportConfig();

// set global value
app.set("view engine", "html");
//app.set("view engine", "ejs");
nunjucks.configure(path.join(__dirname, "views"), {
  express: app,
  watch: process.env.NODE_ENV !== "production",
  autoescape: true,
});
connect();

// initialize
initialize_upload();

// middlewares
if (process.env.NODE_ENV === "production") {
  console.log("Production Mode");
  app.use(morgan("combined"));
} else {
  console.log("Development Mode");
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(UPLOAD_TO));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET as string,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// auth
app.use(passport.initialize()); // req 객체에 passport 설정을 심어서 로그인 정보를 저장할수 있게 함
app.use(passport.session()); // req.session 객체에 passport 정보(세션관련)를 저장

// routers
app.use("/", indexRouter);
app.use("/upload", uploadRouter);

// error handlers

// BAD REQ
app.use(function (req, res, next) {
  const message = `${req.method} ${req.url} Not Found`;
  const err = createError(StatusCodes.NOT_FOUND, message);
  next(err);
});

// INTERNAL ERROR
const errorHandler: ErrorRequestHandler = (
  err: Error | HttpError,
  req,
  res,
  next
) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const status =
    err instanceof HttpError ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(status);
  res.render("error");
};

app.use(errorHandler);

export default app;
