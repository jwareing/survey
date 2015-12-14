(function() {
  'use strict';

  angular.module('app')
  .controller('AddQuestionController', ['$scope', '$http', '$window', '$location',
  function ($scope, $http, $window, $location) {

    $scope.questionText;
    $scope.currentAnswer;
    $scope.answerList = [];
    $scope.hasQuestion = false;
    $scope.hasAnswers = false;

    //sets hasQuestion to true if valid question text has been entered
    $scope.addQuestion = function () {
      if ($scope.questionText && $scope.questionText.length > 0){
        $scope.hasQuestion = true;
      } else {
        alert("Please type a valid question.");
      }
    };

    //adds current answer to answer list and sets hasAnswer to true
    //runs once for each answer
    $scope.addAnswer = function(){
      if($scope.currentAnswer && $scope.currentAnswer.length >0){
        $scope.answerList.push($scope.currentAnswer);
        $scope.currentAnswer = "";
        $scope.hasAnswers = true;
      } else {
        alert("Please type a valid answer.");
      }
    };

    //send question to server to be added to database
    $scope.submitQuestion = function() {
      if ($scope.hasQuestion && $scope.hasAnswers){
        return $http({
          method: 'POST',
          url: '/api/questions',
          data:{
            questionText: $scope.questionText,
            answerList: $scope.answerList
          }
        })
        .then(function(results) {
          alert("Question submitted!");
          $scope.questionText = null;
          $scope.answerList = [];
          $scope.currentAnswer = null;
          $scope.hasQuestion = false;
          $scope.hasAnswers = false;
        })
      } else {
        alert("Oops! Your question is not complete! \nPlease make sure you have entered a question and at least one answer!")
      }
    };

    $scope.goToResults = function () {
      $location.path('/results');
    };

    //Checks if user has admin item in localStorage, redirects if not.
    //Thought about putting this in a service, but only had to write it in one other file
    //so I just copy/pasted.
    $scope.checkAdmin = function () {
      if (JSON.parse($window.localStorage.getItem("admin")) !== true){
        var password = prompt("What is admin password?");
        if (password !== "admin") {
          alert("Sorry, wrong password! Sending you back to the survey.")
          $location.path('/');
        } else {
          $window.localStorage.setItem("admin", JSON.stringify(true));
        }
      }
    };

    $scope.checkAdmin();

  }]);
})();