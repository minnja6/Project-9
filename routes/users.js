var express = require('express');
var router = express.Router();
const fs = require('fs');


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// Send a POST request to /quotes/:id DELETE a quote 
router.post("/users", (req,res, next) => {
  res.status(201).end();
});

module.exports = router;

