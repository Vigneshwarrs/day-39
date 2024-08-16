const express = require('express');
const router = require('./router/routes');
const mongoose = require("mongoose");
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://vigneshwarrs:MongoDB%4024@cluster0.v9fzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/mentorStudentDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Error in connenting MongoDB ${err}`);
  });

  app.use('/api', router);

app.listen(port,()=>{
    console.log(`Server running on a port ${port}`);
})
