angular
.module('themis.tgis')
  .config(function config($stateProvider) {
    $stateProvider
      .state('tgis', {
        abstract: true,
        url: '/tgis',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('tgis.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'TgisIndexCtrl',
            templateUrl: 'tgis/tgisIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des TGIs' }
      })
      .state('tgis.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'TgisEditCtrl',
            templateUrl: 'tgis/tgisEdit.tpl.html'
          }
        },
        resolve: {
          tgi: function ($stateParams, $q, Tgi) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ name: '' });
            }
            else {
              Tgi
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