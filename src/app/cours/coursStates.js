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
          cour: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/grades/:id
              deferred.resolve({
                id: $stateParams.id,
                libelle: "cour d'appel de Montpellier"
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier une cour' }
    });
	});