'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// This array is used to keep track of user records
// as they are created.
const users = [];

/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */
const authenticateUser = (req, res, next) => {
  let message = null;

  // Get the user's credentials from the Authorization header.
  const credentials = auth(req);

  if (credentials) {
    // Look for a user whose `username` matches the credentials `name` property.
    const user = users.find(u => u.username === credentials.name);

    if (user) {
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.username}`);

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};

// Construct a router instance.
const router = express.Router();

// Route that returns the current authenticated user.
router.get('/users', authenticateUser, (req, res) => {
  const user = req.currentUser;

  res.json({
    name: user.name,
    username: user.username,
  });
});

// Route that creates a new user.
router.post('/users', [
  check('name')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "name"'),
  check('username')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "username"'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "password"'),
], (req, res) => {
  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);

    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
  }

  // Get the user from the request body.
  const user = req.body;

  // Hash the new user's password.
  user.password = bcryptjs.hashSync(user.password);
  // Set the status to 201 Created and end the response.
  return res.status(201).end();
});

module.exports = router;// var express = require('express');
// var router = express.Router();
// const { User } = require('../models');
// //using the require method to import the check() and validationResult() methods from express-validator
// const { check, validationResult } = require('express-validator');
// //calling the check() method and passing in the field name validate
// const nameValidator = check('name');
// const bcryptjs = require('bcryptjs');



// /*The GET/api/users route, retrieves a list of user accounts and returns it as JSON*/
// router.get('/users', function (req, res) {
//   User.findAll().then(users => {
//       if (users) {
//           res.status(200).json(users);
//       } else {
//           res.status(404).json({ message: "User not found." });
//       }
//   }).catch(function (err) {
//       res.send(500);    
// });
// });
// // Route that creates a new user.
// router.post('/users', [
//     check('name')
//       .exists({ checkNull: true, checkFalsy: true })
//       .withMessage('Please provide a value for "name"'),
//     check('username')
//       .exists({ checkNull: true, checkFalsy: true })
//       .withMessage('Please provide a value for "username"'),
//     check('password')
//       .exists({ checkNull: true, checkFalsy: true })
//       .withMessage('Please provide a value for "password"'),
//   ], (req, res) => {
//     // Attempt to get the validation result from the Request object.
//     const errors = validationResult(req);
//     // If there are validation errors ->
//     if (!errors.isEmpty()) {
//       // Use the Array `map()` method to get a list of error messages.
//       const errorMessages = errors.array().map(error => error.msg);
//       // Return the validation errors to the client.
//       return res.status(400).json({ errors: errorMessages });
//     }
//     // Hash the new user's password.
//     user.password = bcryptjs.hashSync(user.password);
//     // Set the status to 201 Created and end the response.
//     return res.status(201).end();
//   });
// module.exports = router;

