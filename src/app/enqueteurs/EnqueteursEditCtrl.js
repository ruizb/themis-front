angular
  .module('themis.enqueteurs')
  .controller('EnqueteursEditCtrl', function ($scope, enqueteur) {

    if (_.isEmpty(enqueteur)) { // add
      $scope.h2Title = 'Ajouter un enquêteur';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'enquêteur ' + enqueteur.firstname + ' ' + enqueteur.lastname;
    }
    $scope.enqueteur = enqueteur;

  });