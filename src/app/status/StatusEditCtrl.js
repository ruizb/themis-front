angular
  .module('themis.status')
  .controller('StatusEditCtrl', function ($scope, $state, Status, status) {

    var isEdit = !_.isUndefined(status.id) && _.isNumber(status.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un titre';
    }
    else { // edit
      $scope.h2Title = 'Modifier le titre ' + status.name;
      $scope.status = status;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Status
        [operation]($scope.status)
        .then(function (data) {
          // success
          $state.go('status.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });