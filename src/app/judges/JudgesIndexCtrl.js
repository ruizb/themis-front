angular
  .module('themis.judges')
  .controller('JudgesIndexCtrl', function ($scope, Judge) {

    $scope.loading = true;

    $scope.judgesFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'Prénom', value: 'fname' },
		{ name: 'Nom', value: 'lname'},
		{ name: 'Adresse', value: 'address.city'},
		{ name: 'Telephone', value: 'phone'},
		{ name: 'Fax', value: 'fax'},
		{ name: 'Titre', value: 'status.name'},
		{ name: 'Greffier', value: 'clerk.lname'}
    ];

    $scope.Judge = Judge;

    Judge
      .getAll()
      .then(function (data) {
        $scope.judges = data;
        $scope.loading = false;
      });

  });