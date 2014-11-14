angular
.module('themis.corpss')
  .config(function config($stateProvider) {
    $stateProvider
      .state('corpss', {
        abstract: true,
        url: '/corps',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('corpss.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'CorpssIndexCtrl',
            templateUrl: 'corps/corpssIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des corps' }
      })
      .state('corpss.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'CorpssEditCtrl',
            templateUrl: 'corps/corpssEdit.tpl.html'
          }
        },
        resolve: {
          corps: function ($stateParams, $q, Corps) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ libelle: '' });
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