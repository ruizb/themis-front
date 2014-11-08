angular
  .module('themis.TGIs')
  .controller('TGIsEditCtrl', function ($scope, TGI) {

    if (_.isEmpty(TGI)) { // add
      $scope.h2Title = 'Ajouter un TGI';
    }
    else { // edit
      $scope.h2Title = 'Modifier le TGI ' + TGI.name;
      $scope.TGI = TGI;
    }

  });