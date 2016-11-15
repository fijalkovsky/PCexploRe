angular
.module('myApp', [ 'ngRoute'])
.config(['$routeProvider',
         function($routeProvider) {
            $routeProvider
                .when('/', {
                templateUrl : '/index.html',
                controller : 'homeController'
            })
                .when('/login', {
                templateUrl : '/views/login.html',
                controller : 'loginController'
            })
                .when('/signup', {
                templateUrl : '/views/signup.html',
                controller : 'signUpController'
            })
                .when('/dashboard', {
                templateUrl : 'dashboard/dashboard.template.html',
                controller : 'dashboardController'
            });
      }]);


 