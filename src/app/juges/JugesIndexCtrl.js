angular
  .module('themis.juges')
  .controller('JugesIndexCtrl', function ($scope, Juge) {

    $scope.loading = true;

    $scope.jugesFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'Fname', value: 'fname' },
		{ name: 'Name', value: 'name'},
		{ name: 'Address', value: 'address.city'},
		{ name: 'Phone', value: 'phone'},
		{ name: 'Fax', value: 'fax'},
		{ name: 'Status', value: 'status.name'},
		{ name: 'TGI', value: 'tgi.name'},
		{ name: 'Greffier', value: 'greffier.name'}
    ];

    $scope.Juge = Juge;

    Juge
      .getAll()
      .then(function (data) {
        $scope.juges = data;
        $scope.loading = false;
      });

  });