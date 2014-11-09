angular
  .module('themis.greffiers')
  .controller('GreffiersEditCtrl', function ($scope, $state, Greffier, greffier) {

    var isEdit = !_.isUndefined(greffier.id) && _.isNumber(greffier.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un greffier';
    }
    else { // edit
      $scope.h2Title = 'Modifier le greffier ' + greffier.firstname + greffier.lastname;
      $scope.greffier = greffier;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Greffier
        [operation]($scope.greffier)
        .then(function (data) {
          // success
          $state.go('greffiers.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });