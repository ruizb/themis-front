angular
  .module('themis.status')
  .controller('StatusIndexCtrl', function ($scope, Status) {

    $scope.loading = true;

    $scope.statusFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libellé', value: 'name' }
    ];

    $scope.Status = Status;

    Status
      .getAll()
      .then(function (data) {
        $scope.status = data;
        $scope.loading = false;
      });

  });