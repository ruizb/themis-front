angular
.module('themis.TGIs')
  .config(function config($stateProvider) {
    $stateProvider
      .state('TGIs', {
        abstract: true,
        url: '/TGIs',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
	.state('TGIs.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'TGIsIndexCtrl',
            templateUrl: 'TGIs/TGIsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des TGIs' }
      })
	.state('TGIs.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'TGIsEditCtrl',
            templateUrl: 'TGIs/TGIsEdit.tpl.html'
          }
        },
        resolve: {
          TGI: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/grades/:id
              deferred.resolve({
                id: $stateParams.id,
				name:'TGI de Montpellier',
				phone: '0011223344',
				cours: //ou courts?
				{
				id: 1,
				libelle: 'Cours d\'Appel de Montpellier'
				}
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un TGI' }
    });
	});