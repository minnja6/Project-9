// const express = require('express');
// const app = express();
// const routes = require('./routes');

// app.use(express.json());
// app.use('/api', routes);

// app.use((req, res, next) => {
//     const err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({
//         error: {
//             message: err.message
//         }
//     });
// });
'use strict';

// load modules
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/courses');
const usersRouter = require('./routes/users');

// create the Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

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
