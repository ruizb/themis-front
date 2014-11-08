angular
  .module('themis.cours')
  .controller('CoursEditCtrl', function ($scope, cour) {

    if (_.isEmpty(cour)) { // add
      $scope.h2Title = 'Ajouter une cour';
    }
    else { // edit
      $scope.h2Title = 'Modifier la cour ' + cour.libelle;
      $scope.cour = cour;
    }

  });