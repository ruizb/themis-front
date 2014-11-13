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
          procureur: function ($stateParams, $q, Procureur) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ libelle: '' });
            }
            else {
              Procureur
                .get($stateParams.id)
                .then(function (data) {
                  deferred.resolve(data);
                }, function (err) {
                  deferred.reject(err);
                });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un procureur' }
      });
	});