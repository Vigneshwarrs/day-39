const express = require('express');
const Mentor = require('../models/mentor');
const Student = require('../models/student');

const router = express.Router();

// API for create mentor
router.post("/mentor", async (req, res)=>{
    try{
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(200).send(mentor);
    }catch(err) {
        res.status(400).send(err);
    }
});

// API for create student
router.post("/student", async (req, res)=>{
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(200).send(student);
    }catch(err) {
        res.status(400).send(err);
    }
});

//API for get mentors
router.get("/mentor", async (req, res)=>{
    try {
        const mentors = await Mentor.find();
        res.send(mentors);
    }catch(err) {
        res.status(400).send(err);
    }
})

//API for get students
router.get("/student", async (req, res)=>{
    try {
        const students = await Student.find();
        res.send(students);
    }catch(err) {
        res.status(400).send(err);
    }
});

// API to assign student to mentor
router.post("/assignMentor", async (req, res)=>{
    try{
        const mentor = await Mentor.findByIdAndUpdate(req.body.mentorId, {$push: {students: req.body.studentId}});
        const student = await Student.findByIdAndUpdate(req.body.studentId, {$set: {mentorId: req.body.mentorId}});
        res.status(200).send(mentor);
    }catch(err) {
        res.status(400).send(err);
    }
});

// API to assign Multiple students to mentor using id. student without mentor should not included

router.post("/assignMultipleMentors", async (req, res)=>{
    try{
        const studentsWithMentor = await Student.find({ _id: { $in: req.body.studentIds }, mentorId: { $exists: true } });
        const studentIdsWithoutMentor = req.body.studentIds.filter(id => !studentsWithMentor.some(student => student._id.toString() === id));

        const mentor = await Mentor.findByIdAndUpdate(req.body.mentorId, { $push: { students: { $each: studentIdsWithoutMentor } } });
        const students = await Student.updateMany({ _id: { $in: studentIdsWithoutMentor } }, { $set: { mentorId: req.body.mentorId } });

        res.status(200).send(mentor);
    }catch(err) {
        res.status(400).send(err);
    }
});
// API to Assign or Change Mentor for a Student

router.put("/changeMentor/:studentId", async (req, res)=>{
    try{
        const student = await Student.findByIdAndUpdate(req.params.studentId, { $set: { mentorId: req.body.mentorId } });
        res.status(200).send(student);
    }catch(err) {
        res.status(400).send(err);
    }
});

// API to Show All Students for a Particular Mentor

router.get("/students/:mentorId", async (req, res)=>{
    try {
        const mentor = await Mentor.findById(req.params.mentorId);
        const students = await Student.find({ mentorId: req.params.mentorId });
        res.send({mentor, students});
    }catch(err) {
        res.status(400).send(err);
    }
});

// API to Show Previously Assigned Mentors for a Particular Student

router.get("/previousMentors/:studentId", async (req, res)=>{
    try {
        const student = await Student.findById(req.params.studentId);
        const mentors = await Mentor.find({ students: student._id });
        res.send(mentors);
    }catch(err) {
        res.status(400).send(err);
    }
});


module.exports = router;