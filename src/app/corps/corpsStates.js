angular
.module('themis.corps')
  .config(function config($stateProvider) {
    $stateProvider
      .state('corps', {
        abstract: true,
        url: '/corps',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
	.state('corps.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'CorpsIndexCtrl',
            templateUrl: 'corps/corpsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des corps' }
      })
	.state('corps.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'CorpsEditCtrl',
            templateUrl: 'corps/corpsEdit.tpl.html'
          }
        },
        resolve: {
          corps: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/grades/:id
              deferred.resolve({
                id: $stateParams.id,
                libelle: "gendarmerie"
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un corps' }
    });
	});