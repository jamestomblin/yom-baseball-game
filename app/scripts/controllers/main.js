'use strict';
/*
angular.module('yomBaseballGameApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
*/

app.controller('loginCtrl', ['$scope', 'Loginservice' ,'Userservice','Gameservice', 'FIREBASE_URI',
  function($scope , Loginservice, Userservice, Gameservice ,$firebaseSimpleLogin, FIREBASE_URI) {

  $scope.user = {email:'', password:''}
  $scope.currentUser = null;

    $scope.login = function(email, password){

      Loginservice.login(email,password).then(function(user){
        $scope.currentUser = user;
      })

    }

    $scope.logout = function(){
      Loginservice.logout();

      $scope.currentUser = null;

    }

    $scope.register =function(email, password){

      Loginservice.register(email,password).then(function(user){
        console.log('registered: '+user)
        $scope.currentUser = user;
      })

    }

    //getCurrentUser();
    //function getCurrentUser(){

      Loginservice.getCurrentUser().then(function(user){
        console.log('current user: '+user)
        $scope.currentUser = user;

      })

    //}

    $scope.addPlayer = Gameservice.addPlayerForCurrentUser;





}]);




app.controller('showUserCtrl', ['$scope' ,'FBservice', function($scope, FBservice) {

console.log('test');
console.log(FBservice.getItems())

  $scope.addItem = function(){

    FBservice.addItem({test:'testing'});

  }



}]);