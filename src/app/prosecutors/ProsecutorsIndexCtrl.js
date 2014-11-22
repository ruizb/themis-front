angular
	.module('themis.prosecutors')
	.controller('ProsecutorsIndexCtrl', function ($scope, Prosecutor) {

		$scope.loading = true;
	
		$scope.prosecutorsFields = [
			{ name: 'ID', value: 'id' },
			{ name: 'Prénom', value: 'fname'},
			{ name: 'Nom', value: 'lname'},
			{ name: 'Titre', value: 'status.name' }, 
			{ name: 'TGI', value: 'tribunal.name'}
		];
	
		$scope.Prosecutor = Prosecutor;
	
		Prosecutor
		.getAll()
		.then(function (data) {
			$scope.prosecutors = data;
			$scope.loading = false;
		});

	});