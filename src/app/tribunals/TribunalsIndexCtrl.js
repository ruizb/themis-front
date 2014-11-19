angular
  .module('themis.tribunals')
  .controller('TribunalsIndexCtrl', function ($scope, $window, Tribunal) {

    $scope.loading = true;

    Tribunal
      .getAll()
      .then(function (data) {
        $scope.tribunals = data;
        $scope.loading = false;
      });

    $scope.remove = function (tribunal) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le TGI ' + tribunal.name + ' ?')) {
        Tribunal
          .remove(tribunal)
          .then(function (data) {
            // remove element from DOM
            $scope.tribunals.splice($scope.tribunals.indexOf(tribunal), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });