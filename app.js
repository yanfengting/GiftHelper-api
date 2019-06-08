var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//跨域  后期删
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //为了跨域保持session，所以指定地址，不能用*
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
// node.js 的express服务器报 413 payload too large
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//session
var session = require('express-session');
app.use(session({
  secret: 'classweb531234', //设置 session 签名
  name: 'classweb',
  cookie: {
    maxAge: 60 * 1000 * 60 * 24
  }, // 储存的时间 24小时
  resave: false, // 每次请求都重新设置session
  saveUninitialized: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 捕获登录状态
// app.use(function (req, res, next) { // 进入路由之前优先进入function
//   // console.log(req)
//   if (req.cookies.userId) { // 有cookies,说明已经登录
//     next();
//   } else {
//     console.log("url:" + req.originalUrl);
//     if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.originalUrl.indexOf('/api/goods')>-1 || req.originalUrl.indexOf('/api/jingxuan')>-1) { // 未登录时可以点击登录login登出logout和
//       next();
//     } else {
//       res.json({
//         status: '1001',
//         msg: '当前未登录',
//         result: ''
//       })
//     }
//   }
// })
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;