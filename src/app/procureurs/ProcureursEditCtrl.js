angular
  .module('themis.procureurs')
  .controller('ProcureursEditCtrl', function ($scope, procureur) {

    if (_.isEmpty(procureur)) { // add
      $scope.h2Title = 'Ajouter un procureur';
    }
    else { // edit
      $scope.h2Title = 'Modifier le procureur ' + procureur.firstname + ' ' + procureur.lastname;
      $scope.procureur = procureur;
    }

  });