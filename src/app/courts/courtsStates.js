angular
.module('themis.courts')
  .config(function config($stateProvider) {
    $stateProvider
      .state('courts', {
        abstract: true,
        url: '/courts',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('courts.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'CourtsIndexCtrl',
            templateUrl: 'courts/courtsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des cours' }
      })
      .state('courts.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'CourtsEditCtrl',
            templateUrl: 'courts/courtsEdit.tpl.html'
          }
        },
        resolve: {
          court: function ($stateParams, $q, Court) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ label: '' });
            }
            else {
              Court
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
        data:{ pageTitle: 'Modifier une cour' }
      });
	});