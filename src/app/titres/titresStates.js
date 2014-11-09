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
          titre: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/titre/:id
              deferred.resolve({
                id: $stateParams.id,
                name: "Magistrat"
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un titre' }
      });
  });