(function() {
  'use strict';

  angular.module('app')
  .controller('SurveyController', ['$scope', '$http', '$window',
  function ($scope, $http, $window) {

    $scope.currentQuestion;
    $scope.currentAnswers;

    $scope.getQuestion = function(questionId) {
      return $http({
        method: 'GET',
        url: '/api/questions',
        headers: {"questionid": questionId}
      })
      .then(function(retrievedQuestion) {
        $scope.currentQuestion = retrievedQuestion.data.question.questionText;
        $scope.currentAnswers = retrievedQuestion.data.answers;
      })
    };

    $scope.giveAnswer = function(answerId) {
      return $http({
        method: 'POST',
        url: '/api/questions/answers',
        data: {"answerId": answerId}
      })
    }

    $scope.getQuestion(3);
  }]);
})();
