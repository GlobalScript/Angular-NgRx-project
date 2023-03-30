const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./app/routes/api.js');

 const app = express();

app.use(cors({credentials: true,
  origin: [process.env.CORS_DOMAIN_0, process.env.CORS_DOMAIN_1, process.env.CORS_DOMAIN_2, process.env.CORS_DOMAIN_3]
}));


  mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

  app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log('Server work');
  });
  
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  app.use(router);
  
  app.use((req, res) => {
    res.status(404).send({error: "not found"});
  });


module.exports = app;



