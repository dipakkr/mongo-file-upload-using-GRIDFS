const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const uploadFile3 = require('./route/api/upload-3');
const uploadFile1 = require('./route/api/upload-1');
const uploadFile2 = require('./route/api/upload-2');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Logging file for Monitoring server responses and errors

// Error responses in error.log
app.use(morgan('combined', {
    stream: fs.createWriteStream('./logs/error.log', {flags: 'a'}),
    skip: function (req, res) { return res.statusCode < 400 }   
}));

// Valid responses in server.log
app.use(morgan('combined', {
    stream: fs.createWriteStream('./logs/server.log', {flags: 'a'}),
    skip: function (req, res) { return res.statusCode > 400 }  
}));

app.use('/example3', uploadFile3);
app.use('/example1', uploadFile1);
app.use('/example2', uploadFile2);

// Test
app.get('/test', (req, res)=>{
    res.send({"message" : "API Working"});
});

//Define PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server Started on PORT' ${PORT}`));
  
