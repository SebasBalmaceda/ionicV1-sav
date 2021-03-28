// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

 .run(function ($ionicPlatform, FirebaseDB, $rootScope, $state) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    FirebaseDB.initialize();

    // for authentication
    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {

        // if the error is "noUser" the go to login state
        if (error === "NO USER") {
          event.preventDefault();
          console.log("go to login state");
          $state.go('login', {});
        }
      });
var defaultHTTPHeaders={
      'Content-Type':'application/json',
      'Accept':'application/json'
  };

  })
  

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl',
        cache: false
      })
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        resolve: {
          user: ['FirebaseDB', '$q', function (FirebaseDB, $q) {
            var authData = FirebaseDB.currentUser();
            return $q(function (resolve, reject) {
              authData ? resolve(authData) : reject("NO USER")
            })
          }]
        }
      })

  // Each tab has its own nav history stack:
.state('mostrar_pedido', {
      url: '/mostrar_pedido',
      templateUrl: 'templates/mostrar_pedido.html',
      controller: 'MostrarPedidoCtrl'
})
  
.state('mostrar_proveedores', {
      url: '/mostrar_proveedores',
      templateUrl: 'templates/mostrar_proveedores.html',
      controller: 'MostrarProveedorCtrl'
  })

 

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  
  

.state('tab.ListaMenu', {
    url: '/ListaMenu',
    views: {
      'tab-ListaMenu': {
        templateUrl: 'templates/tab-ListaMenu.html',
        controller: 'ListaMenuCtrl'
      }
    }
  })

.state('tab.Proveedores', {
    url: '/Proveedores',
    views: {
      'tab-Proveedores': {
        templateUrl: 'templates/tab-Proveedores.html',
        controller: 'ProveedoresCtrl'
      }
    }
  })
  



.state('tab.PedidoMenu', {
    url: '/PedidoMenu',
    views: {
      'tab-PedidoMenu': {
        templateUrl: 'templates/tab-PedidoMenu.html',
        controller: 'PedidoMenuCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
