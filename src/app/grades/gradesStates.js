angular
.module('themis.grades')
  .config(function config($stateProvider) {
    $stateProvider
      .state('grades', {
        abstract: true,
        url: '/grades',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('grades.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'GradesIndexCtrl',
            templateUrl: 'grades/gradesIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des grades' }
      })
      .state('grades.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'GradesEditCtrl',
            templateUrl: 'grades/gradesEdit.tpl.html'
          }
        },
        resolve: {
          grade: function ($stateParams, $q, Grade) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ libelle: '' });
            }
            else {
              Grade
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