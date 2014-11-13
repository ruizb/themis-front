angular
  .module('themis.tribunals')
  .controller('TribunalsEditCtrl', function ($scope, $state, Tribunal, tribunal) {

    var isEdit = !_.isUndefined(tribunal.id) && _.isNumber(tribunal.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un TGI';
    }
    else { // edit
      $scope.h2Title = 'Modifier le TGI ' + tribunal.name;
      $scope.tribunal = tribunal;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Tribunal
        [operation]($scope.tribunal)
        .then(function (data) {
          // success
          $state.go('tribunals.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });