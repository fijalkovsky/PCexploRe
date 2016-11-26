angular.
module('dashboard-e')
  .controller('dashboardController', dashboardEController);

function dashboardEController($http, $scope, $mdDialog) {
  var vm = this;
  vm.query = '';

    
    
     $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('I\'m a cat person');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };
    
    
    
    

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
