angular
  .module('themis.tribunals')
  .controller('TribunalsModalCtrl', function ($scope, $modalInstance, tribunal) {

    $scope.tribunal = tribunal;

    $scope.ok = function () {
      $modalInstance.close();
    };

  });