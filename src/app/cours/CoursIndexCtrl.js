angular
  .module('themis.cours')
  .controller('CoursIndexCtrl', function ($scope, Cour) {

    Cour
      .getAll()
      .then(function (data) {
        $scope.cours = data;
      });

  });