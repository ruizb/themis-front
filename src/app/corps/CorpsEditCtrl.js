angular
  .module('themis.corps')
  .controller('CorpsEditCtrl', function ($scope, corps) {

    if (_.isEmpty(corps)) { // add
      $scope.h2Title = 'Ajouter un corps';
    }
    else { // edit
      $scope.h2Title = 'Modifier le corps ' + corps.libelle;
      $scope.corps = corps;
    }

  });