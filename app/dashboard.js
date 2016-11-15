'use strict';
angular.
  module('my.app').
    controller('dashboardController', dashboardEController);

function dashboardEController() {
  var vm = this;

  vm.przyklad = "Przykladowy napis";

  vm.funkcjaNaProbe = proba;



  function proba(){
    console.log("wywolalem probe, ktora jest przypisana na poczatku, ale zdefiniowana na koncu, tak dla elegancji");
  }
  console.log("dashboard");
}
