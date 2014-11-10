angular
.module('themis.services')
  .config(function config($stateProvider) {
    $stateProvider
      .state('services', {
        abstract: true,
        url: '/services',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('services.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'ServicesIndexCtrl',
            templateUrl: 'services/servicesIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des services' }
      })
      .state('services.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'ServicesEditCtrl',
            templateUrl: 'services/servicesEdit.tpl.html'
          }
        },
        resolve: {
          service: function ($stateParams, $q, Service) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ name: '', corps:''});
            }
            else {
              Service
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