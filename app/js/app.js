'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp',
      ['myApp.config', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'firebase']
   )

   // configure views; note the authRequired parameter for authenticated pages
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view1', {
         templateUrl: 'partials/view1.html',
         controller: 'MyCtrl1'
      });

      $routeProvider.when('/view2', {
         templateUrl: 'partials/view2.html',
         controller: 'MyCtrl2'
      });

      $routeProvider.when('/account', {
         authRequired: true,
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/view1'});
   }])

   // establish authentication
   .run(['angularFireAuth', 'FBURL', '$rootScope', function(angularFireAuth, FBURL, $rootScope) {
      $rootScope.firebase = {
         URL: FBURL,
         ref: new Firebase(FBURL)
      };

      angularFireAuth.initialize($rootScope.firebase.ref, {scope: $rootScope, name: "auth", path: '/login'});
    
   }]);