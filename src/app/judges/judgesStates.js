angular
.module('themis.judges')
  .config(function config($stateProvider) {
    $stateProvider
      .state('judges', {
        abstract: true,
        url: '/judges',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('judges.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'JudgesIndexCtrl',
            templateUrl: 'judges/judgesIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des juges' }
      })
      .state('judges.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'JudgesEditCtrl',
            templateUrl: 'judges/judgesEdit.tpl.html'
          }
        },
        resolve: {
          judge: function ($stateParams, $q, Judge) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ fname: '', lname: '', address: {}, phone:'', fax: '', status: {}, clerk: {} });
            }
            else {
              Judge
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
        data:{ pageTitle: 'Modifier un juge' }
      });
	});