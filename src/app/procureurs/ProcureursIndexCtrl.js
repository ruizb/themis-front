angular
	.module('themis.procureurs')
	.controller('ProcureursIndexCtrl', function ($scope, Procureur) {

		$scope.loading = true;
	
		$scope.procureursFields = [
			{ name: 'ID', value: 'id' },
			{ name: 'Name', value: 'firstname'},
			{ name: 'Status', value: 'status.name' }, 
			{ name: 'TGI', value: 'tgi.name'}
		];
	
		$scope.Procureur = Procureur;
	
		Procureur
		.getAll()
		.then(function (data) {
			$scope.procureurs = data;
			$scope.loading = false;
		});

	});