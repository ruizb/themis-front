angular
  .module('themis.greffiers')
  .controller('GreffiersIndexCtrl', function ($scope, Greffier) {

    $scope.loading = true;

    $scope.greffiersFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'firstname', value: 'firstname' },
		{ name: 'lastname', value: 'lastname' },
		{ name: 'adress', value: 'adress' },
		{ name: 'phone', value: 'phone' },
		{ name: 'mobile', value: 'mobile' },
		{ name: 'fax', value: 'fax' }
    ];

    $scope.Greffier = Greffier;

    Greffier
      .getAll()
      .then(function (data) {
        $scope.greffiers = data;
        $scope.loading = false;
      });

  });