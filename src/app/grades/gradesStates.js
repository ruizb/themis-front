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
          grade: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/grades/:id
              deferred.resolve({
                id: $stateParams.id,
                name: "commissaire"
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un grade' }
    });
	});