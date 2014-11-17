angular
  .module('themis.ranks')
  .controller('RanksIndexCtrl', function ($scope, $window, Rank) {

    $scope.loading = true;

    Rank
      .getAll()
      .then(function (data) {
        $scope.ranks = data;
        $scope.loading = false;
      });

    $scope.remove = function (rank) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le grade ' + rank.label + ' ?')) {
        Rank
          .remove(rank)
          .then(function (data) {
            // remove element from DOM
            $scope.ranks.splice($scope.ranks.indexOf(rank), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });