angular
  .module('themis.corps')
  .controller('CorpsIndexCtrl', function ($scope, $window, Corps) {

    $scope.loading = true;

    Corps
      .getAll()
      .then(function (data) {
        $scope.corps = data;
        $scope.loading = false;
      });

    $scope.remove = function (corps) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le corps ' + corps.label + ' ?')) {
        Corps
          .remove(corps)
          .then(function (data) {
            // remove element from DOM
            $scope.corps.splice($scope.corps.indexOf(corps), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });