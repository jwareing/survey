var questionController = require('./questionController.js');

module.exports = function (app) {

  //Only wrote one controller on backend, since all users are just interacting with questions

  app.route('/')
    .get(questionController.getQuestion)
    .post(questionController.addQuestion);

  app.route('/answers')
    .post(questionController.addScore)
    .get(questionController.getAllQuestions);

};