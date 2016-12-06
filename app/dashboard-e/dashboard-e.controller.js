angular.
module('dashboard-e')
  .controller('dashboardController', dashboardEController);

function dashboardEController($http, $scope, $mdDialog, FunctionsService) {
  var vm = this;

  // ********************** VARIABLES ********************** //
  vm.query = '';
  vm.przyklad = "Przykladowy napis";
  vm.functionDetailsView = false;
  vm.functions;
  vm.matrixToShow = {};
  vm.vectorToShow = {};
  vm.showMatrix = false;
  vm.showVector = false;
  vm.showFunction = false;
  vm.numOfParams = 0;
  vm.clickedFunction = {};
  vm.currentFunction = {
    "result": 0
  };

  vm.userMatrices = [{
    "constantName": "matrix",
    "type": "matrix",
    "name": "mDwa",
    "dimension": "2",
    "values": [
      [1, 2],
      [0.4, 1]
    ]
  }, {
    "constantName": "matrix",
    "type": "matrix",
    "name": "exapmleMatrix",
    "dimension": "5",
    "values": [
      [1, 0.6, 0.57, 0.625, 0.5],
      [1.67, 1, 0.714, 2.5, 3.33],
      [1.75, 1.4, 1, 3.5, 4],
      [1.6, 0.4, 0.28, 1, 1.33],
      [2, 0.33, 0.25, 0.75, 1]
    ]
  }];

  vm.userVectors = [{
    "constantName": "vector",
    "type": "vector",
    "name": "mk",
    "values": [0, 5, 7, 0, 0],
    "dimension": "5"
  }, {
    "constantName": "vector",
    "type": "vector",
    "name": "listToDelete",
    "values": [1, 2, 3],
    "dimension": "3"
  }, {
    "constantName": "vector",
    "type": "vector",
    "name": "triad",
    "values": [0.8, 3, 0.12],
    "dimension": "3"
  }, {
    "constantName": "vector",
    "type": "vector",
    "name": "rank",
    "values": [0.12, 0.30, 0.39, 0.08, 0.11],
    "dimension": "3"
  }];

  vm.matrix = {
    "constantName": "vector",
    "type": "vector",
    "name": "",
    "dimension": 2,
    "values": [
      [0, 0],
      [0, 0]
    ]
  };

  vm.vector = {
    "constantName": "vector",
    "type": "vector",
    "name": "",
    "values": [0, 0],
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
  vm.seeMatrix = seeMatrix;
  vm.deleteMatrix = deleteMatrix;
  vm.seeVector = seeVector;
  vm.deleteVector = deleteVector;
  vm.setNumOfParams = setNumOfParams;
  // ********************** ACTIONS ********************** //
  vm.getFunctions();




  // ********************** FUNCTIONS BODY ********************** //

  function buildOneMatrix(matrices) {
    let oneMatrix = [];
    matrices.forEach((matrix) => {
      matrix.values.forEach((row) => {
        oneMatrix.push(row);
      });
    });
    return oneMatrix;
  }

  function buildOneVector(vectors) {
    let oneVector = [];
    vectors.forEach((vector) => {
      vector.values.forEach((element) => {
        oneVector.push(element);
      });
    });
    return oneVector;
  }


  function runCurrentFunction() {
    vm.showMatrix = false;
    vm.showVector = false;
    vm.showFunction = true;

      vm.currentFunction.params.forEach(function(arg) {
        if (arg.type === "matrix") {
          vm.userMatrices.forEach(function(userMatrix) {
            if (arg.name === userMatrix.name) {
              arg.values = userMatrix.values;
            }
          });
        } else if (arg.type === "vector") {
          vm.userVectors.forEach(function(userVector) {
            if (arg.name === userVector.name) {
              arg.values = userVector.values;
            }
          });
        }
      });

      if (vm.currentFunction.name === 'ahp') {
        let tempFunction = angular.copy(vm.currentFunction);
        const oneMatrix = buildOneMatrix(tempFunction.params);
        let arg = {};
        arg.constantName = "matrix";
        arg.values = oneMatrix;
        tempFunction.params = [];
        tempFunction.params.push(arg);
        FunctionsService.runMultipleFunction(vm.currentFunction, tempFunction);
      }
      else if (vm.currentFunction.name === 'AIJaddMatrices' || vm.currentFunction.name === 'AIJgeomMatrices' ) {
        let tempFunction = angular.copy(vm.currentFunction);
        const oneMatrix = buildOneMatrix(tempFunction.params);
        let arg = {};
        arg.constantName = "matrix";
        arg.values = oneMatrix;
        tempFunction.params = [];
        tempFunction.params.push(arg);
        FunctionsService.runMultipleFunction(vm.currentFunction, tempFunction);
      }
      else  if (vm.currentFunction.name === 'AIJaddVectors' || vm.currentFunction.name === 'AIJgeomVectors' ) {
        let tempFunction = angular.copy(vm.currentFunction);
        const oneVector = buildOneVector(tempFunction.params);
        let arg = {};
        arg.constantName = "vector";
        arg.values = oneVector;
        tempFunction.params = [];
        tempFunction.params.push(arg);
        let arg2 = {};
        arg2.constantName = "column";
        arg2.values = tempFunction.params[0].values.length/vm.numOfParams;
        tempFunction.params.push(arg2);
        FunctionsService.runMultipleFunction(vm.currentFunction, tempFunction);
      }
      else {
      FunctionsService.runFunction(vm.currentFunction);
    }

    cancel();
  }


  function cancel() {
    $mdDialog.hide();
  }


  function seeMatrix(matrix) {
    vm.showMatrix = true;
    vm.showVector = false;
    vm.showFunction = false;
    vm.matrixToShow = matrix;
  }

  function deleteMatrix(name) {
    vm.userMatrices.forEach(function(item, index, object) {
      if (item.name === name) {
        object.splice(item, 1);
      }
    });
  }

  function seeVector(vector) {
    vm.showMatrix = false;
    vm.showVector = true;
    vm.showFunction = false;
    vm.vectorToShow = vector;
  }

  function deleteVector(name) {
    vm.userVectors.forEach(function(item, index, object) {
      if (item.name === name) {
        object.splice(item, 1);
      }
    });
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
      "constantName": "matrix",
      "type": "matrix",
      "name": "",
      "dimension": 2,
      "values": [
        [0, 0],
        [0, 0]
      ]
    };
  }

  function addRowV() {
    vm.vector.values.push(0);
  }

  function deleteRowV(idxV) {
    if (idxV >= 0 && idxV < vm.vector.values.length) {
      vm.vector.values.splice(idxV, 1);
    }
  }

  function saveNewVector(newVector) {
    newVector.dimension = newVector.values.length;
    vm.userVectors.push(newVector);
    $mdDialog.hide();
    vm.vector = {
      "constantName": "vector",
      "type": "vector",
      "name": "",
      "values": [0, 1],
      "dimension": 0
    };
  }

  function getFunctions() {
    $http.get('dashboard-e/functions.json').then((response) => {
      vm.functions = response.data;
    });
  }


  function setNumOfParams(numOfParams) {
    vm.currentFunction = vm.clickedFunction;
    if(vm.currentFunction.name === 'ahp'){
      prepareParamsInFunction(numOfParams);
    } else {
      prepareParamsInAIJFunction(numOfParams);
    }
    showPrompt(null);
  }

  function prepareParamsInFunction(numOfParams) {
    vm.currentFunction.params = [];
    if (numOfParams > 0) {
      vm.currentFunction.params.push({
        "constantName": "main matrix",
        "desc": "Main PC matrix",
        "type": "matrix",
        "values": []
      });
    }
    if (numOfParams > 1) {
      for (i = 0; i < numOfParams; i++) {
        vm.currentFunction.params.push({
          "constantName": "matrix",
          "desc": "PC matrix",
          "type": "matrix",
          "values": []
        });
      }
    }
  }

  function prepareParamsInAIJFunction(numOfParams) {
    let oldParams = angular.copy(vm.currentFunction.params);
    vm.currentFunction.params = [];
    if (numOfParams > 0) {
      for (i = 0; i < numOfParams; i++) {
        vm.currentFunction.params.push({
          "constantName": oldParams[0].constantName,
          "desc": oldParams[0].desc,
          "type": oldParams[0].type,
          "values": []
        });
      }
    }
  }

  function openDalog(ev, clickedFunction) {
    vm.clickedFunction = clickedFunction;
    if (clickedFunction.name === 'ahp' || clickedFunction.name.substring(0,3) === 'AIJ') {
      showSetterNumberOfParams(ev);
    } else {
      vm.currentFunction = clickedFunction;
      showPrompt(ev);
    }
  }

  function openMatrixDialog(ev1) {
    showPromptM(ev1);
  }

  function openVectorDialog(ev2) {
    showPromptV(ev2);
  }

  function showDetailView(bool, currentFunction) {
    vm.functionDetailsView = bool;
    // vm.currentFunction = currentFunction;
  }

  function showSetterNumberOfParams(ev1) {
    $mdDialog.show({
      controller: () => vm,
      controllerAs: 'vm',
      templateUrl: '/dashboard-e/numOfParams.tmpl.html',
      targetEvent: ev1,
      clickOutsideToClose: true,
      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
    });

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
