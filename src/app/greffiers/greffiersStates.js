angular
  .module('themis.greffiers')
  .config(function config($stateProvider) {
    $stateProvider
      .state('greffiers', {
        abstract: true,
        url: '/greffiers',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('greffiers.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'GreffiersIndexCtrl',
            templateUrl: 'greffiers/greffiersIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des greffiers' }
      })
      .state('greffiers.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'GreffiersEditCtrl',
            templateUrl: 'greffiers/greffiersEdit.tpl.html'
          }
        },
        resolve: {
          enqueteur: function ($stateParams, $q) {
            var deferred = $q.defer();
            if ($stateParams.id === '') {
              deferred.resolve({});
            }
            else {
              // should call GET api/1/enqueteur/:id
              deferred.resolve({
                id: $stateParams.id,
                firstname: "Bob",
				lastname: "greffier",
				adress: "3 rue des lillas 34000 Montpellier",
				phone: "00 11 22 33 44",
				mobile: "06 11 22 33 44",
				fax: "02 11 22 33 44"
				/*TGIs :{
				id :1,
				name : 'TGI de Montpellier',
				phone : '0011223344'
				}*/
              });
            }

            return deferred.promise;
          }
        },
        data:{ pageTitle: 'Modifier un greffier' }
      });
  });