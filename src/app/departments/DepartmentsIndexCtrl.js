angular
  .module('themis.departments')
  .controller('DepartmentsIndexCtrl', function ($scope, Department) {

    $scope.loading = true;

    $scope.departmentsFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'Libelle', value: 'name' },
		{ name: 'Corps', value: 'corps'}
    ];

    $scope.Department = Department;

    Department
      .getAll()
      .then(function (data) {
        $scope.departments = data;
        $scope.loading = false;
      });

  });