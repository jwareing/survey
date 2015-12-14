var Sequelize = require('sequelize');

var orm = new Sequelize('surveyDB', 'root', '', {
  dialect: 'mysql',
  logging: true
});

////////////////////////////////////
////// Create table/model schemas
////////////////////////////////////

var Question = orm.define('Question', {
  questionText: { type: Sequelize.STRING(200), allowNull: false}
});

var Answer = orm.define('Answer', {
  answerText: { type: Sequelize.STRING(200), allowNull: false},
  score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
  order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
});

Answer.belongsTo(Question);
Question.hasMany(Answer);


////////////////////////////////////
////// Sync models to the database
////////////////////////////////////

Question.sync()  
  .then(function () {
    Answer.sync();
  })
  .catch(function (error) {
    console.log('Error in database sync:' + error);
  });

Question.findOrCreate({
  where: {
    questionText: 'Should you hire John?'
  }
})
.then(function (created) {
  var myId = created[0]["id"];
  Answer.findOrCreate({
    where: {
      answerText: "Definitely",
      order: 0,
      score: 1,
      QuestionId: myId
    }
  })
  .then(function () {
    Answer.findOrCreate({
      where: {
        answerText: "Immediately",
        order: 1,
        score: 3,
        QuestionId: myId
      }
    })
    .then(function () {
      Answer.findOrCreate({
        where: {
          answerText: "Probably twice",
          order: 2,
          score: 12,
          QuestionId: myId
        }
      })
    })
  })
});
////////////////////////////////////
////// Export each model
////////////////////////////////////


exports.Question = Question;
exports.Answer = Answer;

exports.Orm = orm;