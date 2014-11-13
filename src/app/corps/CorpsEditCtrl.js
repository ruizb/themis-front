angular
  .module('themis.corps')
  .controller('CorpsEditCtrl', function ($scope, $state, Corps, corps) {

    var isEdit = !_.isUndefined(corps.id) && _.isNumber(corps.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un corps';
    }
    else { // edit
      $scope.h2Title = 'Modifier le corps ' + corps.label;
      $scope.grade = grade;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Grade
        [operation]($scope.grade)
        .then(function (data) {
          // success
          $state.go('grades.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });