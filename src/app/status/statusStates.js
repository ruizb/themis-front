angular
  .module('themis.status')
  .config(function config($stateProvider) {
    $stateProvider
      .state('status', {
        abstract: true,
        url: '/status',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('status.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'StatusIndexCtrl',
            templateUrl: 'status/statusIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des titres' }
      })
      .state('status.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'StatusEditCtrl',
            templateUrl: 'status/statusEdit.tpl.html'
          }
        },
        resolve: {
          status: function ($stateParams, $q, Status) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ name: '' });
            }
            else {
              Status
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
        data:{ pageTitle: 'Modifier un titre' }
      });
  });