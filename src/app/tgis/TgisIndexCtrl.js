angular
  .module('themis.tgis')
  .controller('TgisIndexCtrl', function ($scope, Tgi) {

    $scope.loading = true;

    $scope.tgisFields = [
	{ name: 'ID', value: 'id' },
    { name: 'name', value: 'name' },
	{ name: 'phone', value: 'phone' }
	//{ name: 'court', value: 'court' }
    ];

    $scope.Tgi = Tgi;

    Tgi
      .getAll()
      .then(function (data) {
        $scope.tgis = data;
        $scope.loading = false;
      });

  });