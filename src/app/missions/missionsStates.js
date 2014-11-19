angular
.module('themis.missions')
  .config(function config($stateProvider) {
    $stateProvider
      .state('missions', {
        abstract: true,
        url: '/missions',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('missions.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'MissionsIndexCtrl',
            templateUrl: 'missions/missionsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des missions' }
      })
      .state('missions.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'MissionsEditCtrl',
            templateUrl: 'missions/missionsEdit.tpl.html'
          }
        },
        resolve: {
          mission: function ($stateParams, $q, Mission) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ label: '' });
            }
            else {
              Mission
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
        data:{ pageTitle: 'Modifier une mission' }
      });
	});