angular
.module('themis.clerks')
  .config(function config($stateProvider) {
    $stateProvider
      .state('clerks', {
        abstract: true,
        url: '/clerks',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('clerks.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'ClerksIndexCtrl',
            templateUrl: 'clerks/clerksIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des greffiers' }
      })
      .state('clerks.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'ClerksEditCtrl',
            templateUrl: 'clerks/clerksEdit.tpl.html'
          }
        },
        resolve: {
          clerk: function ($stateParams, $q, Clerk) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ fname: '', lname: '' , address:'', phone:'', mobile:'', fax:'' }); //Ajouter le tribunal !
            }
            else {
              Clerk
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
        data:{ pageTitle: 'Modifier un greffier' }
      });
	});