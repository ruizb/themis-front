angular
  .module('themis.titres')
  .controller('TitresEditCtrl', function ($scope, $state, Titre, titre) {

    var isEdit = !_.isUndefined(titre.id) && _.isNumber(titre.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un titre';
    }
    else { // edit
      $scope.h2Title = 'Modifier le titre ' + titre.name;
      $scope.titre = titre;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Titre
        [operation]($scope.titre)
        .then(function (data) {
          // success
          $state.go('titres.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });