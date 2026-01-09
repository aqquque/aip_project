var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Подключение к MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musicDB')
  .then(() => console.log(' MongoDB подключена успешно'))
  .catch(err => {
    console.error(' Ошибка подключения к MongoDB:', err.message);
    console.log(' Убедитесь, что MongoDB сервер запущен: mongod --dbpath=data/db');
  });

// Подключение express-session
var session = require("express-session");

//ПОДКЛЮЧЕНИЕ CONNECT-MONGO 
const { MongoStore } = require('connect-mongo');


// Импорт роутеров
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var musiciansRouter = require('./routes/musicians');

var app = express();

// view engine setup
app.engine('ejs',require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  НАСТРОЙКА СЕССИИ 
app.use(session({
  secret: "MusicProject",
  cookie: { maxAge: 60 * 1000 },
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/musicDB',
    ttl: 60 // время жизни в секундах
  })
}));

app.use(function(req, res, next) {
  req.session.counter = req.session.counter + 1 || 1;
  next();
});

app.use(require("./middlewares/createMenu.js"));
app.use(require("./middlewares/createUser.js"));

// Использование роутеров
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/musicians', musiciansRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Musicians' });
});

module.exports = app;