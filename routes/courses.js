const express = require('express');
const router = express.Router();
const Users = require('./users');


function asyncHandler(cb){
    return async (req,res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}
// Send a GET request to /courses to READ a list of courses
router.get('/courses', asyncHandler(async (req, res)=>{
    const courses = await Users.getCourse();
    res.status(200).json(courses);
}));

// Send a GET request to /courses/:id to READ(view) a course
router.get('/courses/:id', asyncHandler(async (req, res)=>{
    const course = await Users.getCourse(req.params.id);

    if(course){
        res.status(200).json(course);
    } else {
        res.status(404).json({message: "Course not found."});
    }
}));

// Send a GET request to /courses/course/random to READ (view) a random course
// router.get('/courses/course/random', asyncHandler(async(req,res,next) =>{
//     const course = await users.getRandomCourse();
//     res.json(course);
// }));

//Send a POST request to /courses to  CREATE a new course
router.post('/courses', asyncHandler( async (req, res)=>{
    if(req.body.description && req.body.title){
        const course = await Users.createCourse({
            title: req.body.title,
            description: req.body.description
        });
        res.status(201).json(course);
    } else {
        res.status(400).json({message: "Title and description required."});
    }
}));

// Send a PUT request to /quotes/:id to UPDATE (edit) a course
router.put('/courses/:id', asyncHandler(async(req,res) => {
    const course = await Users.getCourse(req.params.id);
    if(course){
        course.course = req.body.course;
        course.description = req.body.description;
        course.title = req.body.title;

        await Users.updateCourse(course);
        res.status(204).end();
    } else {
        res.status(404).json({message: "Course Not Found"});
    }
}));

// Send a DELETE request to /quotes/:id DELETE a quote 
router.delete("/courses/:id", asyncHandler(async(req,res, next) => {
    const course = await records.getCourse(req.params.id);
    await Users.deleteCourse(course);
    res.status(204).end();
}));



module.exports = router; 