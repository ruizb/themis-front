  angular
.module('themis.itemMissions')
  .config(function config($stateProvider) {
    $stateProvider
      .state('itemMissions', {
        abstract: true,
        url: '/operations',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('itemMissions.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'ItemMissionsIndexCtrl',
            templateUrl: 'itemMissions/itemMissionsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des missions-objet' }
      })
      .state('itemMissions.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'ItemMissionsEditCtrl',
            templateUrl: 'itemMissions/itemMissionsEdit.tpl.html'
          }
        },
        resolve: {
          itemMission: function ($stateParams, $q, ItemMission) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ label:'', item: {}, mission: {}, price: ''});
            }
            else {
              ItemMission
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
        data:{ pageTitle: 'Modifier une mission-objet' }
      });
	});