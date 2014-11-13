angular
  .module('themis.clerks')
  .controller('ClerksIndexCtrl', function ($scope, Clerk) {

    $scope.loading = true;

    $scope.clerksFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'Prénom', value: 'fname' },
		{ name: 'Nom', value: 'lname' },
		{ name: 'Adresse', value: 'address' },
		{ name: 'Téléphone', value: 'phone' },
		{ name: 'Portable', value: 'mobile' },
		{ name: 'Fax', value: 'fax' },
		{ name: 'TGI', value: 'tribunal.name' }
    ];

    $scope.Clerk = Clerk;

    Clerk
      .getAll()
      .then(function (data) {
        $scope.clerks = data;
        $scope.loading = false;
      });

  });