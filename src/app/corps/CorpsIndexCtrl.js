angular
  .module('themis.grades')
  .controller('GradesIndexCtrl', function ($scope, Grade) {

    $scope.loading = true;

    $scope.gradesFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libellé', value: 'libelle' }
    ];

    $scope.Grade = Grade;

    Grade
      .getAll()
      .then(function (data) {
        $scope.grades = data;
        $scope.loading = false;
      });

  });