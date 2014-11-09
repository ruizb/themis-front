angular
.module('themis.cours')
  .config(function config($stateProvider) {
    $stateProvider
      .state('cours', {
        abstract: true,
        url: '/cours',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('cours.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'CoursIndexCtrl',
            templateUrl: 'cours/coursIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des cours' }
      })
      .state('cours.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'CoursEditCtrl',
            templateUrl: 'cours/coursEdit.tpl.html'
          }
        },
        resolve: {
          cour: function ($stateParams, $q, Cour) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ libelle: '' });
            }
            else {
              Cour
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