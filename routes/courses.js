const express = require('express');
const router = express.Router();
const { Course } = require('../models');
const { check, validationResult } = require('express-validator');
const authentication = require('./auth');



function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}
// Send a GET request to courses to view all courses
router.get('/courses', function (req, res) {
    Course.findAll().then(courses => {
        if (courses) {
            res.status(200).json(courses);
        } else {
            res.status(404).json({ message: "Courses not found." });
        }
    }).catch(function (err) {
        res.send(500);    
});
});
//GET individual course by id
router.get('/courses/:id', function(req, res, next) {
    Course.findByPk(req.params.id).then(course => {
      if(course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: "Course not found." });
      }
    }).catch(function(err) {
      res.send(500);
});
});
// //Send a POST request to /courses/ to CREATE a new course + validations
router.post('/courses/', [
    check('title')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a "title"'),
    check('description')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a "description"'),
    check('userId')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a "userId"')
  ], authentication, async (req, res, next)=>{
    const errors = validationResult(req);
  
    // If there are any errors
    if (!errors.isEmpty()) {
      // Use the map method to get a list of error messages
      const errorMessages = errors.array().map(error => error.msg);
  
      // Return validation errors
      const err = new Error(errorMessages);
      err.status = 400;
      next(err);
    } else {
  
      const course = new Course ({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description
        })
      try {
        await course.save();
        res.location(`http://localhost:5000/api/courses/${course.id}`);
        res.status(201).end();
      } catch (err) {
        if(err.name === 'SequelizeValidationError') {
          res.status(400).json({message: "Please complete out all of the required fields."});
        } else {
          res.json({message: err.message});
        }
      }
    }
  }); 
  
module.exports = router; 