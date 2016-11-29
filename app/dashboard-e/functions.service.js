angular.
module('dashboard-e')
  .service('FunctionsService', functionsService);

function functionsService($http) {


  this.runFunction = function(name, args) {
    var params = {};
    params.name = name;
    args.forEach(function(arg) {
      params[arg.name] = arg.values;
    });
    $http({
      url: '127.0.0.1:8080/function',
      method: 'POST',
      data: params
    }).then(function success(resp) {
      console.log('success');
      console.log(resp);
    }, function error(resp) {
      console.log('error');
      console.log(resp);
    });
  };

}
