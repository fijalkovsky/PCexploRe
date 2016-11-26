'use strict';
angular.
  module('welcome')
    .controller('welcomeController', welcomeEController);

function welcomeEController($http,$scope) {
  var vm = this;


  console.log("welcome");
}
