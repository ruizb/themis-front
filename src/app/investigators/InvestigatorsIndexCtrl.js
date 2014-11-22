angular
  .module('themis.investigators')
  .controller('InvestigatorsIndexCtrl', function ($scope, Investigator) {

    $scope.loading = true;

    $scope.investigatorsFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'Prénom', value: 'fname' },
		{ name: 'Nom', value: 'lname' },
		{ name: 'Téléphone', value: 'phone' },
		{ name: 'Portable', value: 'mobile' },
		{ name: 'Fax', value: 'fax' },
		{ name: 'E-mail', value: 'mail' },
		{ name: 'Adresse', value: 'address.country' },
		{ name: 'Grade', value: 'rank.label' },
		{ name: 'Etablissement', value: 'business.name' },
		{ name: 'Service', value: 'department.name' }
    ];

    $scope.Investigator = Investigator;

    Investigator
      .getAll()
      .then(function (data) {
        $scope.investigators = data;
        $scope.loading = false;
      });

  });