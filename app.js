import createError from "http-errors";
import express from "express";
import path from "path";
import configLite from "config-lite";
import db from "./mongodb/db.js";
import logger from "morgan";
import cookieParser from "cookie-parser";
import connectMongo from "connect-mongo";
import session from "express-session";
import cors from "cors";
import router from "./routes/index";

const app = express();
const config = configLite(__dirname);
//跨域  后期删
/*app.all("*", (req, res, next) => {
  const {origin, Origin, referer, Referer} = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || "*";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "Express");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});*/
app.use(cors({credentials: true, origin: "http://localhost:8080"}));
// app.use('/public', express.static('public'));

// node.js 的express服务器报 413 payload too large
var bodyParser = require("body-parser");
app.use(bodyParser.json({
  limit: "50mb",
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
}));
//session


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    url: config.url,
  }),
}));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
router(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
