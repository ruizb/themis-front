  angular
.module('themis.business')
  .config(function config($stateProvider) {
    $stateProvider
      .state('business', {
        abstract: true,
        url: '/business',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('business.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'BusinessIndexCtrl',
            templateUrl: 'business/businessIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des etablissements' }
      })
      .state('business.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'BusinessEditCtrl',
            templateUrl: 'business/businessEdit.tpl.html'
          }
        },
        resolve: {
          business: function ($stateParams, $q, Business) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ name: '', phone: '', address: {}, tribunal: {}, corps: {}, department: {} }); //Changer en departments
            }
            else {
              Business
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
        data:{ pageTitle: 'Modifier un etablissement' }
      });
	});