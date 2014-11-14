angular
.module('themis.prosecutors')
  .config(function config($stateProvider) {
    $stateProvider
      .state('prosecutors', {
        abstract: true,
        url: '/prosecutors',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('prosecutors.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'ProsecutorsIndexCtrl',
            templateUrl: 'prosecutors/prosecutorsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des procureurs' }
      })
      .state('prosecutors.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'ProsecutorsEditCtrl',
            templateUrl: 'prosecutors/prosecutorsEdit.tpl.html'
          }
        },
        resolve: {
          prosecutor: function ($stateParams, $q, Prosecutor) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ fname: '', lname: '', status: {}, tribunal: {} });
            }
            else {
              Prosecutor
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