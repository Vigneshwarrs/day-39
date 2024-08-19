const express = require('express');
const router = require('./router/routes');
const mongoose = require("mongoose");
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

app.use(cors());
app.use(bodyParser.json());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Error in connenting MongoDB ${err}`);
  });

  app.use('/api', router);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on a port ${process.env.PORT}`);
})
