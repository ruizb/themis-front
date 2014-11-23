  angular
.module('themis.evidences')
  .config(function config($stateProvider) {
    $stateProvider
      .state('evidences', {
        abstract: true,
        url: '/evidences',
        views: {
          "main": {
            template: '<div ui-view="mainContent"></div>'
          }
        }
      })
      .state('evidences.index', {
        url: '/index',
        views: {
          "mainContent": {
            controller: 'EvidencesIndexCtrl',
            templateUrl: 'evidences/evidencesIndex.tpl.html'
          }
        },
        data:{ pageTitle: 'Liste des scellés' }
      })
      .state('evidences.edit', {
        url: '/edit/:id',
        views: {
          "mainContent": {
            controller: 'EvidencesEditCtrl',
            templateUrl: 'evidences/evidencesEdit.tpl.html'
          }
        },
        resolve: {
          evidence: function ($stateParams, $q, Evidence) {
            var deferred = $q.defer();
            if (_.isUndefined($stateParams.id) || $stateParams.id === '') {
              deferred.resolve({ label: '',num:'',numPV:'',itemMissions:{} });
            }
            else {
              Evidence
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
        data:{ pageTitle: 'Modifier un scellé' }
      });
	});