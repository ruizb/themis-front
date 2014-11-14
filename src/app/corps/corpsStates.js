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
          corps: function ($stateParams, $q, Corps) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ label: '' });
            }
            else {
              Corps
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
        data:{ pageTitle: 'Modifier un corps' }
      });
	});