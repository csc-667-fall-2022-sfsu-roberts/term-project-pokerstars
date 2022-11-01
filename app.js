if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars");

//var indexRouter = require('./routes/index');
var homeRouter = require('./routes/unauthenticated/index');
//changed adding routes
var authenticationRouter = require('./routes/unauthenticated/authentication');
var lobbyRouter = require('./routes/authenticated/lobby');
//var gameRouter = require('./routes/authenticated/game');
var gameRouter = require('./routes/authenticated/gameroom');

var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
const { hasSubscribers } = require("diagnostics_channel");
var app = express();

const hbs = exphbs.create({
  extname :'hbs',
  layoutsDir: path.join(__dirname, "views/hbs_layouts"),
  partialsDir: path.join(__dirname, "views/hbs_partials"),
  defaultLayout: "layout"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "pug");
app.engine('hbs', hbs.engine)
app.set('view engine', "hbs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

//added homerouter/authenticationRouter/lobbyRouter/gameRouter
app.use('/', homeRouter);
//app.use('/', indexRouter)
app.use('/', authenticationRouter);
app.use('/lobby', lobbyRouter);
app.use('/gameroom', gameRouter);
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
