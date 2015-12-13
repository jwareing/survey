(function() {
  'use strict';

  angular.module('app')
  .controller('ResultsController', ['$scope', '$http', '$window',
  function ($scope, $http, $window) {

    $scope.allQuestions;
    $scope.allAnswers;

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

    $scope.getAllQuestions();

  }]);
})();
