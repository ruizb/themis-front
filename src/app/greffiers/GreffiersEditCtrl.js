angular
  .module('themis.greffiers')
  .controller('GreffiersEditCtrl', function ($scope, greffier) {

    if (_.isEmpty(greffier)) { // add
      $scope.h2Title = 'Ajouter un greffier';
    }
    else { // edit
      $scope.h2Title = 'Modifier le greffier ' + greffier.firstname + ' ' + greffier.lastname;
      $scope.greffier = greffier;
    }

  });