'use strict';
angular.
module('login')
  .controller('loginController', loginEController);

function loginEController($http, $scope, $location, UsersService) {
  var vm = this;
  console.log("login");

  vm.user = {
    login: '',
    password: '',
    name: '',
    id: ''
  };

  vm.login = login;
  vm.blad = false;

  function login() {
    UsersService.login(vm.user.login, vm.user.password).then((user) => {
      console.log(user);
      if(user){
        vm.user = user;
        vm.blad = false;
        $location.path('/dashboard');
      } else {
        vm.blad = true;
        vm.user = {};
        console.log('blad');
      }
    });
  }

}
