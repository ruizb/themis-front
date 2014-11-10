angular
  .module('themis.services')
  .controller('ServicesIndexCtrl', function ($scope, Service) {

    $scope.loading = true;

    $scope.servicesFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'Libelle', value: 'libelle' },
		{ name: 'Corps', value: 'corps'}
    ];

    $scope.Service = Service;

    Service
      .getAll()
      .then(function (data) {
        $scope.services = data;
        $scope.loading = false;
      });

  });