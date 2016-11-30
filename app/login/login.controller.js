'use strict';
angular.
  module('login')
    .controller('loginController', loginEController);

function loginEController($http,$scope) {
  var vm = this;
  console.log("login");

  vm.login = login;

  function login() {
    console.log("kliknales");
    var user = {
      username: vm.username,
      password: vm.password
    };

      //     $http.post('login', user).success(function (){
      //
      // }
    }
}
