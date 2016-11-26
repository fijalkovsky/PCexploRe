'use strict';
angular.
  module('dashboard-e')
    .controller('dashboardController', dashboardEController);

function dashboardEController($http,$scope) {
  var vm = this;
vm.query = '';
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
