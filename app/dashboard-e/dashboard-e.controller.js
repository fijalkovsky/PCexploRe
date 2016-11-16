'use strict';
angular.
  module('dashboard-e')
  .config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
})
    .controller('dashboardController', dashboardEController);

function dashboardEController($http) {
  var vm = this;

var imagePath = 'img/list/60.jpeg';

  vm.przyklad = "Przykladowy napis";
  vm.functions;

  vm.funkcjaNaProbe = proba;

  vm.functions = $http.get('dashboard-e/functions.json').then((response) => {
    vm.functions = response.data;
  });

  function proba(){
    console.log("wywolalem probe, ktora jest przypisana na poczatku, ale zdefiniowana na koncu, tak dla elegancji");
  }
  console.log("dashboard");
}
