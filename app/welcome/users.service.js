angular.
module('dashboard-e')
  .service('UsersService', usersService);

function usersService($http) {

  var isLogged = false;
  var user = {};

  return {
    login: logIn,
    logout: logout,
    getIsLogged : getIsLogged,
    getUser: getUser,
    signup: signup
  };

  function getIsLogged() {
    return isLogged;
  }

  function getUser() {
    return user;
  }

  function logIn(login, password){
    return $http({
      url: 'http://127.0.0.1:2000/user/login/'+login+'/'+password,
      method: 'GET'
    }).then(function(resp) {
      if(resp.data){
        console.log('zalogowalem w serivisie');
        isLogged = true;
        user = resp.data;
      } else {
        isLogged = false;
        user = {};
      }
      return resp.data;
    }, function(error){
      return null;
    });
  }

  function signup(name, login, password){
    return $http({
      url: 'http://127.0.0.1:2000/user/create/'+name+'/'+login+'/'+password,
      method: 'GET'
    }).then(function(resp) {
      if(resp.data){
        console.log('zstworzylem konto');
      } else {
        console.log('blad tworzenia');
      }
      return resp.data;
    }, function(error){
      return null;
    });
  }

  function logout(){
    isLogged = false;
    user = user;
  }

  //
  //
  // function saveMatricesToDB(matrice, userId){
  //   matrices = angular.copy(matrice);
  //   matrices.ownerId = userId;
  //
  //   matrices.forEach((matrix) => {
  //     matrix.dimension1 = matrix.values.length;
  //     matrix.dimension2 = matrix.values[0].length;
  //     matrix.values = twoDimToOne(matrix.values);
  //   });
  //   $http({
  //     url: 'http://127.0.0.1:2000/matrices/'+userId,
  //     method: 'PUT',
  //     data: matrices
  //   }).then(function(resp) {
  //     console.log('zapisalem');
  //   }, function(error){
  //     console.log('blad');
  //   });
  // }


}
