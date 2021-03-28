angular.module('starter.services', [])

.factory('FirebaseDB', function ($q, $state, $timeout) {
    var instance, storageInstance, unsubscribe, currentUser = null
    var initialized = false

    return {
      initialize: function () {

        // Inicializamos el Firebase, cambia el código por el tuyo dentro del var config
        var config = {
      apiKey: "AIzaSyA_Qmk00dreA4_kgiX9XZYVq_KZJ3agAUs",
    authDomain: "savlogin-c6aad.firebaseapp.com",
    databaseURL: "https://savlogin-c6aad.firebaseio.com",
    storageBucket: "savlogin-c6aad.appspot.com",
    messagingSenderId: "775484720795"
        };

        // initialize database and storage
        instance = firebase.initializeApp(config);
        storageInstance = firebase.storage();

        // listen for authentication event, dont start app until I
        // get either true or false
        unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
          currentUser = user
          console.log("got user..", currentUser);
        })
      },
      /**
       * return database instance
       */
      database: function () {
        return instance.database()
      },
      /**
      * return storage instance
      */
      storage: function () {
        return storageInstance
      },
      isAuth: function () {
        return $q(function (resolve, reject) {
          return firebase.auth().currentUser ? resolve(true) : reject("NO USER")
        })
      },
      /**
       * return the currentUser object
       */
      currentUser: function () {
        // debugger;
        return firebase.auth().currentUser
      },

      /**
       * @param  {any} _credentials
       */
      login: function (_credentials) {
        return firebase.auth().signInWithEmailAndPassword(_credentials.email, _credentials.password)
          .then(function (authData) {
            currentUser = authData
            return authData
          })
      },
      /**
       * @param  {any} _credentials
       */
      createUser: function (_credentials) {
        return firebase.auth().createUserWithEmailAndPassword(_credentials.email, _credentials.password).then(function (authData) {
          currentUser = authData
          return authData
        }).then(function (authData) {

          // add the user to a seperate list
          var ref = instance.database().ref('Trash-Talk/users');
          return ref.child(authData.uid).set({
            "provider": authData.providerData[0],
            "avatar": (authData.profileImageURL || "missing"),
            "displayName": authData.email
          })

        })
      }
    }
  })

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
