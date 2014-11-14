angular
  .module('themis.prosecutors')
  .controller('ProsecutorsEditCtrl', function ($scope, $state, Prosecutor, prosecutor) {

    var isEdit = !_.isUndefined(prosecutor.id) && _.isNumber(prosecutor.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un procureur';
    }
    else { // edit
      $scope.h2Title = 'Modifier le procureur ' + prosecutor.fname + " " + procureur.lname;
      $scope.prosecutor = prosecutor;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Prosecutor
        [operation]($scope.prosecutor)
        .then(function (data) {
          // success
          $state.go('prosecutors.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });