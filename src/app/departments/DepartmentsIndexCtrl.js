angular
  .module('themis.departments')
  .controller('DepartmentsIndexCtrl', function ($scope, $window, Department) {

    $scope.loading = true;

    Department
      .getAll()
      .then(function (data) {
        $scope.departments = data;
        $scope.loading = false;
      });

    $scope.remove = function (department) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le service ' + department.name + ' ?')) {
        Department
          .remove(department)
          .then(function (data) {
            // remove element from DOM
            $scope.departments.splice($scope.departments.indexOf(department), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });