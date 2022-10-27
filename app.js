if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var homeRouter = require('./routes/unauthenticated/index');
//changed adding routes 
var authenticationRouter = require('./routes/unauthenticated/authentication');
var lobbyRouter = require('./routes/authenticated/lobby');
var gameRouter = require('./routes/authenticated/game');


var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//added homerouter/authenticationRouter/lobbyRouter/gameRouter
app.use('/', homeRouter);
app.use('/', authenticationRouter);
app.use('/lobby', lobbyRouter);
app.use('/game', gameRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);

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
  res.render('error');
});

module.exports = app;
