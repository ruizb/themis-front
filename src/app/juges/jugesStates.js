angular
.module('themis.juges')
  .config(function config($stateProvider) {
    $stateProvider
      .state('juges', {
        abstract: true,
        url: '/juges',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('juges.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'JugesIndexCtrl',
            templateUrl: 'juges/jugesIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des juges' }
      })
      .state('juges.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'JugesEditCtrl',
            templateUrl: 'juges/jugesEdit.tpl.html'
          }
        },
        resolve: {
          juge: function ($stateParams, $q, Juge) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ fname: '', name:'', address:'', phone:'', fax:'', status:'', tgi:'', greffier:''});
            }
            else {
              Juge
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