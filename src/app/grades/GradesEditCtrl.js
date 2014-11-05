angular
  .module('themis.grades')
  .controller('GradesEditCtrl', function ($scope, grade) {

    if (_.isEmpty(grade)) { // add
      $scope.h2Title = 'Ajouter un grade';
    }
    else { // edit
      $scope.h2Title = 'Modifier le grade ' + grade.name;
      $scope.grade = grade;
    }

  });