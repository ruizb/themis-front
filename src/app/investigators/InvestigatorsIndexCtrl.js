angular
  .module('themis.investigators')
  .controller('InvestigatorsIndexCtrl', function ($scope, $window, Investigator) {

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

    Investigator
      .getAll()
      .then(function (data) {
        $scope.investigators = data;
        $scope.loading = false;
      });

    $scope.remove = function (investigator) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer l\'enquêteur ' + investigator.fname + ' ' + investigator.lname + ' ?')) {
        Investigator
          .remove(investigator)
          .then(function (data) {
            // remove element from DOM
            $scope.investigators.splice($scope.investigators.indexOf(investigator), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });