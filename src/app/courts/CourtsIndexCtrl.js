angular
  .module('themis.courts')
  .controller('CourtsIndexCtrl', function ($scope, Court) {

	  $scope.loading = true;

    Court
      .getAll()
      .then(function (data) {
        $scope.courts = data;
        $scope.loading = false;
      });

    $scope.remove = function (court) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer la cour ' + court.label + ' ?')) {
        Court
          .remove(court)
          .then(function (data) {
            // remove element from DOM
            $scope.courts.splice($scope.courts.indexOf(court), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });