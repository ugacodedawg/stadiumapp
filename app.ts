import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
//-----Added for Mongoose/Passport-----//
import * as mongoose from 'mongoose';
import * as passport from 'passport';

import routes from './routes/index';
import users from './routes/users';

//-----Added for Mongoose/Passport-----//
require('./models/user');
require('./config/passport');
//-----Added for Mongo-----//
import stadiums from './api/stadiums';
import comments from './api/comments';
import Database from './db';
Database.connect();

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));

//-----Added for Mongoose/Passport-----//
app.use(passport.initialize());
mongoose.connect('mongodb://webuser:Secret123!@ds147599.mlab.com:47599/cctrav');
app.use('/userRoutes/api/', users); //-----Modified for Project-----//

app.use('/', routes);
// app.use('/users', users);
app.use('/api/stadiums', stadiums); //-----Added for Mongo-----//
app.use('/api/comments', comments);
// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
