angular.
module('dashboard-e')
  .controller('dashboardController', dashboardEController);

function dashboardEController($http, $scope) {
  var vm = this;
  vm.query = '';


  vm.przyklad = "Przykladowy napis";
  vm.functions;
  vm.userMatrices =
  [
    {
      "name" : "mDwa",
      "dimension": "2",
      "values": [[1,2],[0.4,1]]
    },
    {
      "name" : "mTrzy",
      "dimension": "3",
      "values": [[1,2,3],[0.4,1,6],[0.2,0.1,1]]
    },
    {
      "name" : "mDwadwa",
      "dimension": "2",
      "values": [[1,2],[0.4,1]]
    },
    {
      "name" : "mTrzytrzy",
      "dimension": "3",
      "values": [[1,2,3],[0.4,1,6],[0.2,0.1,1]]
    }
  ];

  vm.userVectors =
  [
    {
      "name" : "vectorDwa",
      "values": [0.4,0.6],
      "dimension": "2"
    },
    {
      "name" : "vectorTrzy",
      "values": [0,2,5],
      "dimension": "3"
    }
  ];

  vm.funkcjaNaProbe = proba;

  vm.functions = $http.get('dashboard-e/functions.json').then((response) => {
    vm.functions = response.data;
  });

  function proba() {
    console.log("wywolalem probe, ktora jest przypisana na poczatku, ale zdefiniowana na koncu, tak dla elegancji");
  }
  console.log("dashboard");
}
