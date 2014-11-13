angular
  .module('themis.courts')
  .controller('CourtsIndexCtrl', function ($scope, Court) {

	$scope.loading = true;

    $scope.courtsFields = [
      { name: 'ID', value: 'id' },
      { name: 'label', value: 'label' }
    ];

    $scope.Court = Court;

    Court
      .getAll()
      .then(function (data) {
        $scope.courts = data;
        $scope.loading = false;
      });

  });