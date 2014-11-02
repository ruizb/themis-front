angular
  .module('themis.enqueteurs')
  .config(function config($stateProvider) {
    $stateProvider
      .state('enqueteurs', {
        abstract: true,
        url: '/enqueteurs',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('enqueteurs.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'EnqueteursIndexCtrl',
            templateUrl: 'enqueteurs/enqueteursIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des enquêteurs' }
      })
      .state('enqueteurs.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'EnqueteursEditCtrl',
            templateUrl: 'enqueteurs/enqueteursEdit.tpl.html'
          }
        },
        resolve: {
          enqueteur: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/enqueteur/:id
              deferred.resolve({
                id: $stateParams.id,
                firstname: "Boby",
                lastname: "Modnar",
                phone: "00 11 22 33 44",
                email: "leboby34@hotmail.fr"
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un enquêteur' }
      });
  });