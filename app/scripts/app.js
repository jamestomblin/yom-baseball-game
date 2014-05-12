'use strict';

var app;
app = angular.module("BBG", [ "firebase", "ngRoute", "ngResource"]);
app.constant('FIREBASE_URI', "https://resplendent-fire-2326.firebaseio.com/bbg/")


app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'loginCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'showUserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });