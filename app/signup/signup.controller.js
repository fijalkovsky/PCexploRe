'use strict';
angular.
  module('signup')
    .controller('signupController', signupEController);

function signupEController($http, $scope, $location, UsersService) {
  var vm = this;


  console.log("signup");

  vm.signup = signup;
  vm.user = {
    name: '',
    username: '',
    password: ''
  };

  vm.createdAccount = false;


  function signup() {


    UsersService.signup(vm.user.name, vm.user.login, vm.user.password).then((user) => {
      console.log(user);
      if(user){
        vm.createdAccount = true;
      }
    });
    }
}
