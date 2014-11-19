angular
  .module('themis.missions')
  .controller('MissionsIndexCtrl', function ($scope, $window, Mission) {

    $scope.loading = true;

    Mission
      .getAll()
      .then(function (data) {
        $scope.missions = data;
        $scope.loading = false;
      });

    $scope.remove = function (mission) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer la mission ' + mission.label + ' ?')) {
        Mission
          .remove(mission)
          .then(function (data) {
            // remove element from DOM
            $scope.missions.splice($scope.missions.indexOf(mission), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });