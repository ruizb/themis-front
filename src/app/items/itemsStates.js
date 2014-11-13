angular
.module('themis.items')
  .config(function config($stateProvider) {
    $stateProvider
      .state('items', {
        abstract: true,
        url: '/items',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('items.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'ItemsIndexCtrl',
            templateUrl: 'items/itemsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des objets' }
      })
      .state('items.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'ItemsEditCtrl',
            templateUrl: 'items/itemsEdit.tpl.html'
          }
        },
        resolve: {
          item: function ($stateParams, $q, Item) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ label: '' });
            }
            else {
              Item
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
        data:{ pageTitle: 'Modifier un objet' }
      });
	});