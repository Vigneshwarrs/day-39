const mongoose = require('mongoose');

//Define the schema for a mentor
const mentorSchema = mongoose.Schema({
    name: {
        type: String, // The name of mentoe should string,
        required: true, // The name is required
    }
});

//Create a model from schema and export it
const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;