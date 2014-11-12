angular
  .module('themis.objets')
  .controller('ObjetsEditCtrl', function ($scope, $state, Objet, objet) {

    var isEdit = !_.isUndefined(objet.id) && _.isNumber(objet.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un objet';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'objet ' + objet.libelle;
      $scope.objet = objet;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Objet
        [operation]($scope.objet)
        .then(function (data) {
          // success
          $state.go('objets.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });