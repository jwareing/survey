var express = require('express');
var app = express();

//Initializes server using express, and middleware from middleware.js

require('./config/middleware.js')(app, express);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Server is running on port:', port);

module.exports = app;
