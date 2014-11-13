angular
.module('themis.tribunals')
  .config(function config($stateProvider) {
    $stateProvider
      .state('tribunals', {
        abstract: true,
        url: '/tribunals',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('tribunals.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'TribunalsIndexCtrl',
            templateUrl: 'tribunals/tribunalsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des TGIs' }
      })
      .state('tribunals.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'TribunalsEditCtrl',
            templateUrl: 'tribunals/tribunalsEdit.tpl.html'
          }
        },
        resolve: {
          tribunal: function ($stateParams, $q, Tribunal) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ name: '', phone: '', court:'' });
            }
            else {
              Tribunal
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
        data:{ pageTitle: 'Modifier un TGI' }
      });
	});