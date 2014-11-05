angular
  .module('themis.grades')
  .controller('GradesIndexCtrl', function ($scope, Grade) {

    Grade
      .getAll()
      .then(function (data) {
        $scope.grades = data;
      });

  });