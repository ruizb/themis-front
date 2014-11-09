angular
  .module('themis.cours')
  .controller('CoursIndexCtrl', function ($scope, Cour) {

	$scope.loading = true;

    $scope.coursFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libelle', value: 'libelle' }
    ];

    $scope.Cour = Cour;

    Cour
      .getAll()
      .then(function (data) {
        $scope.cours = data;
        $scope.loading = false;
      });

  });