angular.module('app', ['ngRoute'])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/survey/survey.html',
      controller: 'SurveyController'
    })
    .when('/results', {
      templateUrl: 'app/admin/results.html',
      controller: 'ResultsController'
    })
    .when('/addQuestion', {
      templateUrl: 'app/admin/addQuestion.html',
      controller: 'AddQuestionController'
    });

}])