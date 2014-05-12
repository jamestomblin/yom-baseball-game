/**
 * Created by stomblin on 5/11/14.
 */
app.factory('Gameservice', ['Userservice', '$firebase', 'FIREBASE_URI', function(Userservice, $firebase, FIREBASE_URI){

var playersRef = new Firebase(FIREBASE_URI +'game/players');
var players = $firebase(playersRef);

  var addPlayerForCurrentUser= function(){

    console.log('cool');
   // console.log(Userservice.currentUser());

    //var child = users.$child(currentUser +'/players'+itemRef.name)
/*
    var player =  {name:'playername'};

    players.$add(player).then(function(ref){

      // console.log(ref);

    });
*/
  }


  var getItems = function(){

    return items;
  }

  var addItem= function(item){

    items.$add(item).then(function(ref){

      console.log(ref);

    });

  }

  var updateItem = function(id){

    items.$save(id);

  }

  var removeItems = function(id){

    items.$remove(id);

  }



  return{
    addPlayerForCurrentUser:addPlayerForCurrentUser,
    getItems: getItems,
    addItem: addItem,
    updateItem: updateItem,
    removeItem:removeItems

  }


}]);


app.factory('Loginservice', ['$q', 'Userservice', 'Gameservice' ,'$firebase', 'FIREBASE_URI' ,'$firebaseSimpleLogin',
  function($q, Userservice, Gameservice, $firebase, FIREBASE_URI, $firebaseSimpleLogin){


    var simpleService = $firebaseSimpleLogin(new Firebase(FIREBASE_URI));


    //var loginPromise = $q.defer();
    //loginPromise.promise.then(user){}

    var login =  function(email, password){
      return simpleService.$login('password', {email:email, password:password})
        .then(function(user){

          console.log('logged in');
          Userservice.setCurrentUser(user)
         return user;


        });

    }

    var logout =  function(){
      simpleService.$logout();


    }

    var register = function(email, password){

      return simpleService.$createUser
        (email, password)
        .then(function(user){
          console.log('registered');
          Userservice.setCurrentUser(user)
          Userservice.addUser({name:user.email});
          return user;
        });

    }



    var getCurrentUser = function(){

      return simpleService.$getCurrentUser()
      .then(function(user){
       return user;// this get's pass along in the chain
      });

    }


    return{
    login:login,
    logout:logout,
    register:register,
    getCurrentUser:getCurrentUser

  }


}]);

app.factory('Userservice', [ '$firebase', 'FIREBASE_URI' ,'$firebaseSimpleLogin',
  function(  $firebase, FIREBASE_URI, $firebaseSimpleLogin){

    var usersRef = new Firebase(FIREBASE_URI +'users');
    var users = $firebase(usersRef);

    var currentUser = null

    var addUser= function(item){

      users.$add(item).then(function(ref){

        console.log(ref);

      });

    }

    var setCurrentUser = function(user){

      console.log('this is the user');
      console.log(user);

      currentUser = user;

    }

    var getCurrentUser = function(){

      return currentUser;

    }


    return{
      addUser:addUser,
      setCurrentUser:setCurrentUser,
      currentUser:getCurrentUser


    }


  }]);
