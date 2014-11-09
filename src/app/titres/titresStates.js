angular
  .module('themis.titres')
  .config(function config($stateProvider) {
    $stateProvider
      .state('titres', {
        abstract: true,
        url: '/titres',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('titres.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'TitresIndexCtrl',
            templateUrl: 'titres/titresIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des titres' }
      })
      .state('titres.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'TitresEditCtrl',
            templateUrl: 'titres/titresEdit.tpl.html'
          }
        },
        resolve: {
          titre: function ($stateParams, $q, Titre) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ libelle: '' });
            }
            else {
              Titre
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