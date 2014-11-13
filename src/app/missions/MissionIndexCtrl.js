angular
  .module('themis.missions')
  .controller('MissionsIndexCtrl', function ($scope, Mission) {

    $scope.loading = true;

    $scope.missionsFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libellé', value: 'label' }
    ];

    $scope.Mission = Mission;

    Mission
      .getAll()
      .then(function (data) {
        $scope.missions = data;
        $scope.loading = false;
      });

  });