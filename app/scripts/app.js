'use strict';

var app;
app = angular.module("BBG", [ "firebase", "ngRoute", "ngResource"]);
app.constant('FIREBASE_URI', "https://resplendent-fire-2326.firebaseio.com/bbg/")


app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/start', {
        templateUrl: 'views/start.html',
        controller: 'startCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'gameCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'showUserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });