const express = require('express');
const router = express.Router();
const { Course } = require('../models');


// function asyncHandler(cb) {
//     return async (req, res, next) => {
//         try {
//             await cb(req, res, next);
//         } catch (err) {
//             next(err);
//         }
//     }
// }
// // Send a GET request to courses to view all courses
// router.get('/courses', function (req, res) {
//     Course.findAll().then(courses => {
//         if (courses) {
//             res.status(200).json(courses);
//         } else {
//             res.status(404).json({ message: "Courses not found." });
//         }
//     }).catch(function (err) {
//         res.send(500);    
// });
// });
// //GET individual course by id
// router.get('/courses/:id', function(req, res, next) {
//     Course.findByPk(req.params.id).then(course => {
//       if(course) {
//         res.status(200).json(course);
//     } else {
//         res.status(404).json({ message: "Course not found." });
//       }
//     }).catch(function(err) {
//       res.send(500);
// });
// });
// //Send a POST request to /courses to CREATE a new course
// // router.post('/courses', (req, res, next) => {
// //     Course.create(req.body).then(function (course) {
// //         let { title, id, userId, description } = req.body;
// //         // redirects to home page after creating course
// //         res.redirect('/')      
// //     })
// //         .catch(err => {
// //             if (err.name === "SequelizeValidationError") {
// //                 res.json({
// //                     errors: err.errors
// //                 })
// //             } else {
// //                 throw error;
// //             }
// //         }).catch(function (error) {
// //             res.send(500, error);
// //         });
// // });
// //Send a POST request to /courses to CREATE a new course
// router.post("/courses", (req, res, next) => {
//     if (req.body.title && req.body.description) {
//       const courseData = {
//         user: req.user,
//         title: req.body.title,
//         description: req.body.description,
//         estimatedTime: req.body.estimatedTime,
//         materialsNeeded: req.body.materialsNeeded
//       };
//       if (req.user) {
//         Course.create(courseData, function(error) {
//           if (error) {
//             return next(error);
//           } else {
//             res.location("/courses");
//             res.sendStatus(201);
//           }
//         });
//       } else {
//         const error = new Error("Please login to create post.");
//         error.status = 400;
//         return next(error);
//       }
//     } else {
//       const error = new Error("Title and description are required.");
//       error.status = 400;
//       return next(error);
//     }
//     console.log(req.body);
//   });

//Send a PUT request to /quotes/:id to UPDATE (edit) a course
// router.put('/courses/:id', asyncHandler(async (req, res) => {
//     const course = await Course.get(req.params.id);
//     if (course) {
//         course.course = req.body.course;
//         course.description = req.body.description;
//         course.title = req.body.title;
//         await Course.updateCourse(course);
//         res.status(204).end();
//     } else {
//         res.status(404).json({ message: "Course Not Found" });
//     }
// }));

//Send a DELETE request to /quotes/:id DELETE a course
// router.delete("/courses/:id", asyncHandler(async (req, res, next) => {
//     const course = await records.getCourse(req.params.id);
//     await Users.deleteCourse(course);
//     res.status(204).end();
// }));

module.exports = router; 