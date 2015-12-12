var express = require('express');
// var path = require('path');
var app = express();

// app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use('/public', express.static(path.join(__dirname, 'public')));

require('./config/middleware.js')(app, express);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Server is running on port:', port);

module.exports = app;
