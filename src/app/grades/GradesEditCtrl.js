angular
  .module('themis.grades')
  .controller('GradesEditCtrl', function ($scope, $state, Grade, grade) {

    var isEdit = !_.isUndefined(grade.id) && _.isNumber(grade.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un grade';
    }
    else { // edit
      $scope.h2Title = 'Modifier le grade ' + grade.libelle;
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