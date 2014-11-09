angular
  .module('themis.cours')
  .controller('CourssEditCtrl', function ($scope, $state, Cour, cour) {

    var isEdit = !_.isUndefined(cour.id) && _.isNumber(cour.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter une cour';
    }
    else { // edit
      $scope.h2Title = 'Modifier la cour ' + cour.libelle;
      $scope.cour = cour;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Cour
        [operation]($scope.cour)
        .then(function (data) {
          // success
          $state.go('cours.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });