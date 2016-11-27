angular.
module('dashboard-e')
  .controller('dashboardController', dashboardEController);

function dashboardEController($http, $scope, $mdDialog) {
  var vm = this;
  vm.query = '';

  vm.currentFunction = {
    "name": "",
    "title": "Nazwa tej funkcji",
    "description": "Opis funkcji. Może być trochę dłuższy niż się wydaje, np. tak jak ten. Może być nawet dłuższy.",
    "params": [
      {
        "name": "matrix",
        "desc": "PC matrix",
        "type": "matrix",
        "values": []
      },
      {
        "name": "vector",
        "desc": "vector of know values",
        "type": "vector",
        "values": []
      },
      {
        "name": "row",
        "desc": "number of row",
        "type": "int",
        "values": 0
      },
      {
        "name": "value",
        "desc": "value to set in matrix",
        "type": "double",
        "values": 0
      }
    ],
    "return": "Zwracana wartość",
    "result": 0
  },
  vm.przyklad = "Przykladowy napis";
  vm.size;
  vm.size2;
  vm.openDalog = openDalog;
  vm.functions;
  vm.userMatrices = [{
    "name": "mDwa",
    "dimension": "2",
    "values": [
      [1, 2],
      [0.4, 1]
    ]
  }, {
    "name": "mTrzy",
    "dimension": "3",
    "values": [
      [1, 2, 3],
      [0.4, 1, 6],
      [0.2, 0.1, 1]
    ]
  }, {
    "name": "mDwadwa",
    "dimension": "2",
    "values": [
      [1, 2],
      [0.4, 1]
    ]
  }, {
    "name": "mTrzytrzy",
    "dimension": "3",
    "values": [
      [1, 2, 3],
      [0.4, 1, 6],
      [0.2, 0.1, 1]
    ]
  }];

  vm.userVectors = [{
    "name": "vectorDwa",
    "values": [0.4, 0.6],
    "dimension": "2"
  }, {
    "name": "vectorTrzy",
    "values": [0, 2, 5],
    "dimension": "3"
  }];


/// FUNTIONS
  vm.functions = $http.get('dashboard-e/functions.json').then((response) => {
    vm.functions = response.data;
  });

  function openDalog(ev, funName) {
    vm.currentFunction.name = funName;
    showPrompt(ev);
  }

  function showPrompt(ev) {
    $mdDialog.show({
      controller: () => vm,
      controllerAs: 'vm',
      templateUrl: '/dashboard-e/dialog.tmpl.html',
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
    });

  };
}
