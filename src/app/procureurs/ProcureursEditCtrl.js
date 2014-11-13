angular
  .module('themis.procureurs')
  .controller('ProcureursEditCtrl', function ($scope, $state, Procureur, procureur) {

    var isEdit = !_.isUndefined(procureur.id) && _.isNumber(procureur.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un procureur';
    }
    else { // edit
      $scope.h2Title = 'Modifier le procureur ' + procureur.firstname + " " + procureur.lastname;
      $scope.procureur = procureur;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Procureur
        [operation]($scope.procureur)
        .then(function (data) {
          // success
          $state.go('procureurs.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });