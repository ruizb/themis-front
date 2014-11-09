angular
	.module('themis.procureurs')
	.config(function config($stateProvider) {
		$stateProvider
		.state('procureurs', {
			abstract: true,
			url: '/procureurs',
			views: {
				"main": {
					template: '<div ui-view="mainContent"></div>'
				}
			}
		})
		.state('procureurs.index', {
			url: '/index',
			views: {
				"mainContent": {
					controller: 'ProcureursIndexCtrl',
					templateUrl: 'procureurs/procureursIndex.tpl.html'
				}
			},
			data:{ pageTitle: 'Liste des procureurs' }
		})
		.state('procureurs.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'ProcureursEditCtrl',
            templateUrl: 'procureurs/procureursEdit.tpl.html'
          }
        },
        resolve: {
          enqueteur: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/enqueteur/:id
              deferred.resolve({
                id: i,
				firstname: "Boby",
				lastname: "Modnar",
				status:{
					id: i,
					name: "Mega Procureur"
				},
				tgi:{
					id: i, 
					name: "TGI de Montpellier",
					phone: "01586987548",
					courAppel: {
						id : i,
						name: "Cour appel de Montpellier"
					}
				}
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un procureur' }
      });
  });