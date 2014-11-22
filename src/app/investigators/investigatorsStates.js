  angular
.module('themis.investigators')
  .config(function config($stateProvider) {
    $stateProvider
      .state('investigators', {
        abstract: true,
        url: '/investigators',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('investigators.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'InvestigatorsIndexCtrl',
            templateUrl: 'investigators/investigatorsIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des enquêteurs' }
      })
      .state('investigators.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'InvestigatorsEditCtrl',
            templateUrl: 'investigators/investigatorsEdit.tpl.html'
          }
        },
        resolve: {
          investigator: function ($stateParams, $q, Investigator) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ fname: '', lname: '', phone: '', mobile: '', fax: '', address: {}, mail: '', rank: {}, business: {}, department: {} });
            }
            else {
              Investigator
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
        data: { pageTitle: 'Modifier un enquêteur' }
      });
	});