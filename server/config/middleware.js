var morgan = require('morgan'); // http request logger middleware
var bodyParser = require('body-parser'); // body parsing middleware

module.exports = function (app, express) {

  var questionRouter = express.Router();


  app.use(morgan('dev')); // configures morgan to output concise logs colored by response status
  app.use(bodyParser.urlencoded({extended: true})); //allows for rich objects and arrays to be encoded into the URL-encoded format
  app.use(bodyParser.json()); //returns middleware that only parses json
  app.use(express.static(__dirname + '/../../client')); //serve static files in client folder
  app.use(express.static(__dirname + '/../../node_modules/angular/angular.min.js'));


  app.use('/api/questions', questionRouter); // use user question router for all question requests

  require('../questions/questionRoutes.js')(questionRouter);
};