(function() {
  'use strict';

  angular.module('app')
  .controller('AddQuestionController', ['$scope', '$http', '$window',
  function ($scope, $http, $window) {

    $scope.questionText;
    $scope.currentAnswer;
    $scope.answerList = [];

    $scope.addAnswer = function(){
      $scope.answerList.push("asdfasfd");
      $scope.currentAnswer = "";
      console.log($scope.answerList);
    };

    $scope.addQuestion = function() {
      return $http({
        method: 'POST',
        url: '/api/questions',
        data:{
          questionText: $scope.questionText,
          answerList: $scope.answerList
        }
      })
      .then(function(results) {
        
      })
    };

  }]);
})();