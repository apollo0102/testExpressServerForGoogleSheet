var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;
var cors = require('cors');


//Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/CrudDB')
    .then(() => {
        console.log('Start');
    })
    .catch((err) => {
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Required aplication specific custom router module
var itemRouter = require('./src/routes/itemRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', itemRouter);

// Start the server
app.listen(port, function() {
    console.log('Server is running on Port: ', port);
});
