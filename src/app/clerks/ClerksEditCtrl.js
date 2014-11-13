angular
  .module('themis.clerks')
  .controller('ClerksEditCtrl', function ($scope, $state, Clerk, clerk) {

    var isEdit = !_.isUndefined(clerk.id) && _.isNumber(clerk.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un greffier';
    }
    else { // edit
      $scope.h2Title = 'Modifier le greffier';
      $scope.clerk = clerk;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Clerk
        [operation]($scope.clerk)
        .then(function (data) {
          // success
          $state.go('clerks.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });