'use strict';


angular.module("my.app").controller("mainController", function(){
  console.log('main');
});
// var myApp = angular.module('myApp', [ 'ngRoute']);
// myApp.config(['$routeProvider',function($routeProvider) {
//     $routeProvider.when('/', {
//       templateUrl : '/views/dashboard.html',
//       controller : 'dashboardController'
//     }).when('/login', {
//         templateUrl : '/views/login.html',
//         controller : 'loginController'
//     }).when('/signup', {
//         templateUrl : '/views/signup.html',
//         controller : 'signUpController'
//     }).when('/dashboard', {
//         templateUrl : '/views/dashboard.html',
//         controller : 'dashboardController'
//     });
//   }]);
//
//
//   myApp.controller('loginController',['$scope', function($s) {
//
//       console.log("dupa");
//
//
//   }]);
//
//   myApp.controller('dashboardController',['$scope', function($scope) {
//
//
//
//     }]);
//
//     myApp.controller('signUpController',['$scope', function($s) {
//
//         console.log("dupa");
//
//
//     }]);
//
//     myApp.controller('homeController',['$scope', function($s) {
//
//         console.log("home kontoler");
//
//
//     }]);
