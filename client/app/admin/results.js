(function() {
  'use strict';

  angular.module('app')
  .controller('ResultsController', ['$scope', '$http', '$window', '$location',
  function ($scope, $http, $window, $location) {

    $scope.allQuestions;
    $scope.allAnswers;

    //Gets all questions and their answers from the server
    $scope.getAllQuestions = function() {
      return $http({
        method: 'GET',
        url: '/api/questions/answers',
      })
      .then(function(results) {
        console.log("GOT THIS FOR ALL QUESTIONS: ");
        console.log(results);
        $scope.allQuestions = results.data.questions;
        $scope.allAnswers = results.data.answers;
      })
    };

    //Checks if user has correct admin item in localStorage, redirects if not
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

    //removes admin item from localStorage and redirects to survey
    $scope.signOut = function () {
      $window.localStorage.removeItem("admin");
      $location.path('/');
    };

    $scope.checkAdmin();
    $scope.getAllQuestions();

  }]);
})();
