angular.
module('dashboard-e')
  .service('FunctionsService', functionsService);

function functionsService($http, $mdDialog) {

  

  this.runFunction = function(currentFunction) {
    var args = currentFunction.params;
    var params = {};
    params.name = currentFunction.name;
    args.forEach(function(arg) {
      params[arg.constantName] = arg.values;
    });
    $http({
      url: 'http://127.0.0.1:8080/function',
      method: 'POST',
      data: params
    }).then(function success(resp) {

      if(resp.data.type === 'error'){
        $mdDialog.show({
          controller: () => this,
          controllerAs: 'this',
          templateUrl: '/dashboard-e/error.tmpl.html',
          clickOutsideToClose: true,
        });
        console.log('######ERROR');
      } else {
        currentFunction.result = resp.data;

      }
    }, function error(resp) {
      console.log('error');
    });
  };

  this.runMultipleFunction = function(currentFunction, tempFunction){
    var args = tempFunction.params;
    var params = {};
    params.name = tempFunction.name;
    args.forEach(function(arg) {
      params[arg.constantName] = arg.values;
    });
    $http({
      url: 'http://127.0.0.1:8080/function',
      method: 'POST',
      data: params
    }).then(function success(resp) {
      currentFunction.result = resp.data;
    }, function error(resp) {
      console.log('error');
    });
  };

  this.close = function(){
    $mdDialog.hide();
  };

}
