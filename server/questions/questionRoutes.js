var questionController = require('./questionController.js');

module.exports = function (app) {
  // app === productRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter on in
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navLink before it reaches line 16.

  // app.param('tags', productController.productByTags);

  app.route('/')
    .get(questionController.getQuestion)
    .post(questionController.addQuestion);

  app.route('/answers')
    .post(questionController.addScore)
    .get(questionController.getAllQuestions);

};