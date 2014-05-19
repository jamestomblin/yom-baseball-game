/**
 * Created by stomblin on 5/11/14.
 */
app.factory('Gameservice', ['Userservice', '$firebase', 'FIREBASE_URI', function(Userservice, $firebase, FIREBASE_URI){


 //$firebase(playersRef);

  var gameRef = new Firebase(FIREBASE_URI +'game');
  var game = $firebase(gameRef);
  //myUser.set({ email: 'hello@hello.com', name: 'Alex', phone: 12912912 });

  var newGame= function(){
  var currentUser= Userservice.getCurrentUser();
  var newGame={userid:currentUser.id ,players:['player'], teams:['teams']}

    game.$add(newGame).then(function(ref){
     // console.log(ref.name());
      Userservice.addNewGameForUser(ref.name());

    });

  }

  var addPlayerForCurrentUser= function(){

    //var child = players.$child(currentUser +'/game/players/')
    myUser.set({ email: 'hello@hello.com', name: 'test', phone: 12912912 });
    //myUser.$add('steve')

  }

  var getGames= function(){

    //var child = players.$child(currentUser +'/game/players/')
    //myUser.set({ email: 'hello@hello.com', name: 'test', phone: 12912912 });
    //myUser.$add('steve')

   // game.


  }


 // game:{ players:['player'], teams:['team'] }

  var addUPlayer= function(item){



    users.$add(item).then(function(ref){

      console.log(ref);

    });

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
    removeItem:removeItems,
    newGame:newGame

  }


}]);


app.factory('Loginservice', ['$q', 'Userservice', 'Gameservice' ,'$firebase', 'FIREBASE_URI' ,'$firebaseSimpleLogin',
  function($q, Userservice, Gameservice, $firebase, FIREBASE_URI, $firebaseSimpleLogin){


    var simpleService = $firebaseSimpleLogin(new Firebase(FIREBASE_URI));


    //JMv-HUiauDIwtDuw3vn

    //var loginPromise = $q.defer();
    //loginPromise.promise.then(user){}

    var login =  function(email, password){
      return simpleService.$login('password', {email:email, password:password})
        .then(function(user){

          console.log('logged in');
          console.log(user);
          Userservice.setCurrentUser(user);


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


          var createUser = {
            email:user.email,
            id:user.id
          };
          Userservice.addUser(createUser);

          Userservice.setCurrentUser(user)


          return user;
        });

    }

    var getCurrentUser = function(){

      return simpleService.$getCurrentUser()
      .then(function(user){
          Userservice.setCurrentUser(user)
          console.log(user);

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

    var addUser= function(user){

      usersRef.child('user_'+user.id).set(user);

    }

    var setCurrentUser = function(user){

      currentUser = user;

    }

    var getCurrentUser = function(){

      return currentUser;

    }

    var getUserObject = function(){

      var currentUsersRef = new Firebase(FIREBASE_URI +'users/user_'+currentUser.id);
      var userObject = $firebase(currentUsersRef);

      console.log(userObject);

    }

    var addNewGameForUser= function(ref){

      usersRef.child('user_'+currentUser.id).child('games').push(ref);

    }

    return{
      addUser:addUser,
      setCurrentUser:setCurrentUser,
      getCurrentUser:getCurrentUser,
      addNewGameForUser:addNewGameForUser,
      getUserObject:getUserObject


    }


  }]);
