angular
  .module('themis.titres')
  .controller('TitresEditCtrl', function ($scope, titre) {

    if (_.isEmpty(titre)) { // add
      $scope.h2Title = 'Ajouter un titre';
    }
    else { // edit
      $scope.h2Title = 'Modifier le titre ' + titre.name;
      $scope.titre = titre;
    }

  });