'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// create the Express app
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';


// setup morgan which gives us http request logging
app.use(morgan('dev'));

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});


module.exports = app;

// // set our port
// app.set('port', process.env.PORT || 5000);

// // start listening on our port
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express server is listening on port ${server.address().port}`);
// });
