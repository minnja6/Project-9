var express = require('express');
var router = express.Router();
const { User } = require('../models');
//using the require method to import the check() and validationResult() methods from express-validator
const { check, validationResult } = require('express-validator');
//calling the check() method and passing in the field name validate
const nameValidator = check('name');
//


/*The GET/api/users route, retrieves a list of user accounts and returns it as JSON*/
router.get('/users', function (req, res) {
  User.findAll().then(users => {
      if (users) {
          res.status(200).json(users);
      } else {
          res.status(404).json({ message: "User not found." });
      }
  }).catch(function (err) {
      res.send(500);    
});
});


router.get('/users', (req, res) => {
  res.json(users);
});

//The POST/api/users route creates a new user account
router.post('/users', (req,res) => {
//Get the user from the request body
const user = req.body;

//Set the status to 201 Created and end the response
res.status(201).end();
});

module.exports = router;

