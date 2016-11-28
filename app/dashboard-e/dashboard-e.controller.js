angular.
module('dashboard-e')
  .controller('dashboardController', dashboardEController);

function dashboardEController($http, $scope, $mdDialog) {
  var vm = this;

  // ********************** VARIABLES ********************** //
  vm.query = '';
  vm.przyklad = "Przykladowy napis";
  vm.functionDetailsView = false;
  vm.functions;

  vm.currentFunction = {
    "result": 0
  };

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
      [1, 2, 4],
      [0.4, 1, 6],
      [0.2, 0.1, 1]
    ]
  }, {
    "name": "mDwadwa",
    "dimension": "2",
    "values": [
      [1, 3],
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

  vm.matrix = {
    "name": "",
    "dimension": 2,
    "values": [
      [0, 0],
      [0, 0]
    ]
  };

  vm.vector = {
    "name": "",
    "values": [
      [0]
    ],
    "dimension": 0
  };



  // ********************** FUNCTIONS ********************** //

  vm.getFunctions = getFunctions;
  vm.addColumn = addColumn;
  vm.addRow = addRow;
  vm.deleteRow = deleteRow;
  vm.deleteColumn = deleteColumn;
  vm.saveNewMatrix = saveNewMatrix;
  vm.addRowV = addRowV;
  vm.deleteRowV = deleteRowV;
  vm.saveNewVector = saveNewVector;
  vm.openDalog = openDalog;
  vm.openMatrixDialog = openMatrixDialog;
  vm.openVectorDialog = openVectorDialog;
  vm.showDetailView = showDetailView;
  vm.cancel = cancel;
  vm.runCurrentFunction = runCurrentFunction;


  // ********************** ACTIONS ********************** //
  vm.getFunctions();




  // ********************** FUNCTIONS BODY ********************** //

function runCurrentFunction(){
  vm.currentFunction.params.forEach(function(arg){
    if(arg.type === "matrix"){
      vm.userMatrices.forEach(function(userMatrix){
        if(arg.name === userMatrix.name){
          arg.values = userMatrix.values;
        }
      });
    }
  });

  cancel();
}


  function cancel() {
    $mdDialog.hide();
  }

  function addColumn() {
    vm.matrix.values.forEach(function(row) {
      row.push(0);
    });
  }

  function addRow() {
    var columnCount = vm.matrix.values[0].length;
    var newRow = [];
    for (var i = 0; i < columnCount; i++) {
      newRow.push(0);
    }
    vm.matrix.values.push(newRow);
  }

  function deleteRow(idx) {
    if (idx >= 0 && idx < vm.matrix.values.length) {
      vm.matrix.values.splice(idx, 1);
    }
  }

  function deleteColumn(idx) {
    if (idx >= 0 && idx < vm.matrix.values[0].length) {
      vm.matrix.values.forEach(function(row) {
        row.splice(idx, 1);
      });
    }
  }

  function saveNewMatrix(newMatrix) {
    newMatrix.dimension = newMatrix.values.length;
    vm.userMatrices.push(newMatrix);
    $mdDialog.hide();
    vm.matrix = {
      "name": "",
      "dimension": 2,
      "values": [
        [0, 0],
        [0, 0]
      ]
    };
  }

  function addRowV() {
    var columnCountV = vm.vector.values[0].length;
    var newRowV = [];
    for (var j = 0; j < columnCountV; j++) {
      newRowV.push(0);
    }
    vm.vector.values.push(newRowV);
  }

  function deleteRowV(idxV) {
    if (idxV >= 0 && idxV < vm.vector.values.length) {
      vm.vector.values[0].splice(idxV, 1);
    }
  }

  function saveNewVector(newVector) {
    newVector.dimension = newVector.values.length;
    vm.userVectors.push(newVector);
    $mdDialog.hide();
    vm.vector = {
      "name": "",
      "values": [
        [0]
      ],
      "dimension": 0
    };
  }

  function getFunctions() {
    $http.get('dashboard-e/functions.json').then((response) => {
      vm.functions = response.data;
    });
  }

  function openDalog(ev, clickedFnction) {
    vm.currentFunction = clickedFnction;
    showPrompt(ev);
  }

  function openMatrixDialog(ev1) {
    showPromptM(ev1);
  }

  function openVectorDialog(ev2) {
    showPromptV(ev2);
  }

  function showDetailView(bool, currentFunction) {
    vm.functionDetailsView = bool;
    vm.currentFunction = currentFunction;
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

  }

  function showPromptM(ev1) {
    $mdDialog.show({
      controller: () => vm,
      controllerAs: 'vm',
      templateUrl: '/dashboard-e/matrixDia.tmpl.html',
      targetEvent: ev1,
      clickOutsideToClose: true,
      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
    });

  }

  function showPromptV(ev2) {
    console.log("cos");
    $mdDialog.show({
      controller: () => vm,
      controllerAs: 'vm',
      templateUrl: '/dashboard-e/vectorDia.tmpl.html',
      targetEvent: ev2,
      clickOutsideToClose: true,
      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
    });

  }
}
