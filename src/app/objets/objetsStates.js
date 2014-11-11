angular
.module('themis.objets')
  .config(function config($stateProvider) {
    $stateProvider
      .state('objets', {
        abstract: true,
        url: '/objets',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('objets.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'ObjetsIndexCtrl',
            templateUrl: 'objets/objetsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des objets' }
      })
      .state('objets.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'ObjetsEditCtrl',
            templateUrl: 'objets/objetsEdit.tpl.html'
          }
        },
        resolve: {
          objet: function ($stateParams, $q, Grade) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ libelle: '' });
            }
            else {
              Objet
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