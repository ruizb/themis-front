angular
.module('themis.greffiers')
  .config(function config($stateProvider) {
    $stateProvider
      .state('greffiers', {
        abstract: true,
        url: '/greffiers',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('greffiers.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'GreffiersIndexCtrl',
            templateUrl: 'greffiers/greffiersIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des greffiers' }
      })
      .state('greffiers.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'GreffiersEditCtrl',
            templateUrl: 'greffiers/greffiersEdit.tpl.html'
          }
        },
        resolve: {
          greffier: function ($stateParams, $q, Grade) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ firstname: '', lastname: '' , adress:'', phone:'', mobile:'', fax:'' });
            }
            else {
              Greffier
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
        data:{ pageTitle: 'Modifier un greffier' }
      });
	});