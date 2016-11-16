'use strict';
angular
  .module('my.app')
  .config(['$routeProvider', function config($routeProvider) {

    $routeProvider
      .when('/', {
        controller: 'mainController',
        template: '<h1>Witojcież na noszyj stronie</h1>'
      })

    .when('/dashboard', {
        controller: 'dashboardController',
        controllerAs: 'vm',
        templateUrl: 'dashboard-e/dashboard-e.template.html'
      })
      .otherwise('/dashboard');
  }]);
