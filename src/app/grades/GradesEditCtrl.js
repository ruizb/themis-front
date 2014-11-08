angular
  .module('themis.grades')
  .controller('GradesEditCtrl', function ($scope, $state, $timeout, Grade, grade) {

    $scope.alerts = [];

    var isEdit = grade.id !== '' && _.isNumber(grade.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un grade';
    }
    else { // edit
      $scope.h2Title = 'Modifier le grade ' + grade.name;
      $scope.grade = grade;
    }

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.submit = function () {
      console.log('Submitting...', $scope.grade);
      var operation = isEdit ? 'edit' : 'add';
      Grade
        [operation]($scope.grade)
        .then(function (data) {
          // success
          $scope.alerts.push({
            type: 'success',
            message: 'Grade successfully updated!'
          });
          $timeout(function () {
            $state.go('grades.index');
          }, 1000);
        }, function (err) {
          // error
          $scope.alerts.push({
            type: 'danger',
            message: 'There was a problem sending data to the API. Please try again later.'
          });
        });
    };

  });