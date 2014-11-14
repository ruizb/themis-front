  angular
.module('themis.ranks')
  .config(function config($stateProvider) {
    $stateProvider
      .state('ranks', {
        abstract: true,
        url: '/ranks',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('ranks.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'RanksIndexCtrl',
            templateUrl: 'ranks/ranksIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des grades' }
      })
      .state('ranks.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'RanksEditCtrl',
            templateUrl: 'ranks/ranksEdit.tpl.html'
          }
        },
        resolve: {
          rank: function ($stateParams, $q, Rank) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ label: '', corps: {} });
            }
            else {
              Rank
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
        data:{ pageTitle: 'Modifier un grade' }
      });
	});