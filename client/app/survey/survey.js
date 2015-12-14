(function() {
  'use strict';

  angular.module('app')
  .controller('SurveyController', ['$scope', '$http', '$window', '$location',
  function ($scope, $http, $window, $location) {
    $scope.currentQuestion;
    $scope.currentAnswers;

    //Sets answered to localStorage.doneQuestions, or array containing -1. 
    //Could not use empty array because of the way localStorage stores arrays. 
    var answered = [-1];
    if ($window.localStorage.doneQuestions) {
      answered = JSON.parse($window.localStorage.doneQuestions);
    };
    
    //Gets one unanswered question from server.
    $scope.getQuestion = function() {
      console.log("trying to get any question that is not in " + answered);
      return $http({
        method: 'GET',
        url: '/api/questions',
        headers: {"answered": JSON.stringify(answered)}
      })
      .then(function (retrievedQuestion) {
        console.log("you have already answered " + answered);
        $scope.currentQuestion = retrievedQuestion.data.question;
        $scope.currentAnswers = retrievedQuestion.data.answers; 
      })
    };

    //Sends a vote to server and asks for new unanswered question.
    $scope.giveAnswer = function(answerId) {
      return $http({
        method: 'POST',
        url: '/api/questions/answers',
        data: {"answerId": answerId}
      })
      .then(function (results) {
        console.log("answered question # " + $scope.currentQuestion.id);
        answered.push($scope.currentQuestion.id);
        $window.localStorage.doneQuestions =  JSON.stringify(answered);
        alert("Thanks for answering! Finding you another question.");
        $scope.getQuestion();
      })
    };

    $scope.getQuestion();
  }]);
})();
