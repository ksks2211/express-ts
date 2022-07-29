import express, { ErrorRequestHandler } from "express";
import path from "path";
import indexRouter from "./routes/index";
import createError from "http-errors";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.locals.message = err?.message || "Error MSG";
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err?.status || 500);
  res.render("error");
};

app.use(errorHandler);

export default app;
