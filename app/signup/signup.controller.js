'use strict';
angular.
  module('signup')
    .controller('signupController', signupEController);

function signupEController($http,$scope) {
  var vm = this;


  console.log("signup");

  vm.signup = signup;

  function signup() {

    var user = {
      username: vm.username,
      password: vm.password
    };

      //     $http.post('signup', user).success(function (){
      //
      // }
    }
}
