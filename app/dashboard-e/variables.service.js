angular.
module('dashboard-e')
  .service('VariablesService', variablesService);

function variablesService($http) {

  return {
    getUserMatrices: getUserMatrices,
    getUserVectors: getUserVectors,
    saveMatricesToDB: saveMatricesToDB,
    saveVectorsToDB: saveVectorsToDB
  };

  function getUserMatrices(userId){
    return $http({
      url: 'http://127.0.0.1:2000/matrices/'+userId,
      method: 'GET'
    }).then(function(resp) {
      return resp.data;
    }, function(error){
      return [];
    });
  }

  function getUserVectors(userId){
    return $http({
      url: 'http://127.0.0.1:2000/vectors/'+userId,
      method: 'GET'
    }).then(function(resp) {
      console.log(resp.da);
      return resp.data;
    }, function(error){
      return [];
    });
  }

  function saveMatricesToDB(matrice, userId){
    matrices = angular.copy(matrice);
    matrices.ownerId = userId;

    matrices.forEach((matrix) => {
      matrix.dimension1 = matrix.values.length;
      matrix.dimension2 = matrix.values[0].length;
      matrix.values = twoDimToOne(matrix.values);
    });
    $http({
      url: 'http://127.0.0.1:2000/matrices/'+userId,
      method: 'PUT',
      data: matrices
    }).then(function(resp) {
      console.log('zapisalem');
    }, function(error){
      console.log('blad');
    });
  }

  function twoDimToOne(array) {

  //     matrix = [].concat.apply([], array);
    // matrix.map(String)
  //    matrix.map((value) => ""+value);
     console.log("\"");
    // console.log(matrix);
     return "" + array;
  }

  function saveVectorsToDB(vector, userId){
    vectors = angular.copy(vector);
    vectors.ownerId = userId;

    vectors.forEach((vector) => {
      vector.dimension = vector.values.length;
      vector.values = twoDimToOne(vector.values);
    });
    $http({
      url: 'http://127.0.0.1:2000/vectors/'+userId,
      method: 'PUT',
      data: vectors
    }).then(function(resp) {
      console.log('zapisalem');
    }, function(error){
      console.log('blad');
    });
  }

}
