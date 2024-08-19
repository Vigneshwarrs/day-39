const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId, // Reference to a mentor document
        ref: 'Mentor', // The model to reference
    },
    previousMentors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }],  
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    course: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;