var database = require('../database/db_config.js');
var Answer = database.Answer;
var Question = database.Question;
var _ = require('underscore');

module.exports = {

  //adds a question with answers to the database
  addQuestion: function (req, res, next) {
    database.Question.create({
      questionText: req.body.questionText
    })
    .then(function (newQuestion) {
      console.log(newQuestion);
      res.json({newQuestion: newQuestion});
      _.each(req.body.answerList, function (answer, index) {
        database.Answer.create({
          answerText: answer,
          order: index,
          score: 0,
          QuestionId: newQuestion.dataValues.id
        })
      })
    })
    .catch(function (error) {
      res.status(400).send('Error on database: ' + error);
    });
  },

  //grabs one random unanswered (by that user) question
  getQuestion: function (req, res, next) {
    var foundQuestion = {};
    var answered = req.headers.answered;
    Question.findAll({
      where: {id: {not: JSON.parse(answered)}}
    })
    .then(function (questions) {
      //choosing random question that was not answered already
      if (questions.length){
        var chosenIndex = Math.floor(Math.random() * questions.length);
        foundQuestion.question = questions[chosenIndex];
        Answer.findAll({
          where: {QuestionId: foundQuestion.question.get("id")}
        })
        .then(function(results){
          foundQuestion.answers = results;
          res.send(foundQuestion);
        })
      } else {
        res.send({
          question: {questionText: "Oops! There are no more unanswered questions!"},
          answers: []
        })
      }
    })
    
    .catch(function (error) {
      res.status(400).send('Error getting question: ' + error);
    });
  },

  //gets all questions and their answers, used for results page
  getAllQuestions: function (req, res, next) {
    var allQuestions;
    var allAnswers;
    Question.findAll()
    .then(function (questions){
      allQuestions = questions;
      return Answer.findAll();
    })
    .then(function (answers) {
      allAnswers = answers;
      res.send({
        questions: allQuestions,
        answers: allAnswers
      });
    })
    .catch(function (error) {
      res.status(400).send('Error getting question: ' + error);
    });
  },


  //adds one point to score of user-selected answer
  addScore: function (req, res, next) {
    Answer.findById(req.body.answerId)
    .then(function(answer) {
      return answer.increment('score', {by: 1})
    })
    .then(function (result) {
      res.send(result.get("answerText"));
    })
    .catch(function (error) {
      res.status(400).send('Error adding score: ' + error);
    });
  }

};