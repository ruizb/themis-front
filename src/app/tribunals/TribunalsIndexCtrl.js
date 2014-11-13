angular
  .module('themis.tribunals')
  .controller('TribunalsIndexCtrl', function ($scope, Tribunal) {

    $scope.loading = true;

    $scope.tribunalsFields = [
	{ name: 'ID', value: 'id' },
    { name: 'name', value: 'name' },
	{ name: 'phone', value: 'phone' }
    ];

    $scope.Tribunal = Tribunal;

    Tribunal
      .getAll()
      .then(function (data) {
        $scope.tribunals = data;
        $scope.loading = false;
      });

  });