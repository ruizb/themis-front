angular
  .module('themis.departments')
  .controller('DepartmentsEditCtrl', function ($scope, $state, Department, department) {

    var isEdit = !_.isUndefined(department.id) && _.isNumber(department.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un service';
    }
    else { // edit
      $scope.h2Title = 'Modifier le service ' + department.name;
      $scope.department = department;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Department
        [operation]($scope.department)
        .then(function (data) {
          // success
          $state.go('departments.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });
  