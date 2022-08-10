import express, { ErrorRequestHandler } from "express";
import path from "path";
import indexRouter from "./routes/index";
import uploadRouter from "./routes/upload";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import { CustomBadRequestError } from "@shared/error";
import { StatusCodes } from "http-status-codes";
import { initialize_upload } from "./upload";

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// set global value
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

// routers
app.use("/", indexRouter);
app.use("/upload", uploadRouter);

// error handlers
app.use(function (req, res, next) {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = (
  err: Error | HttpError,
  req,
  res,
  next
) => {
  res.locals.message = err?.message || "Error MSG";
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const status =
    err instanceof CustomBadRequestError
      ? err.status
      : StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(status);
  res.render("error");
};

app.use(errorHandler);

export default app;
