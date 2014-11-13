angular
.module('themis.departments')
  .config(function config($stateProvider) {
    $stateProvider
      .state('departments', {
        abstract: true,
        url: '/departments',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('departments.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'DepartmentsIndexCtrl',
            templateUrl: 'departments/departmentsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des services' }
      })
      .state('departments.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'DepartmentsEditCtrl',
            templateUrl: 'departments/departmentsEdit.tpl.html'
          }
        },
        resolve: {
          department: function ($stateParams, $q, Department) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ name: '', corps:''});
            }
            else {
              Department
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
        data:{ pageTitle: 'Modifier un service' }
      });
	});