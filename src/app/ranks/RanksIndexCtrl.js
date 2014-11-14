angular
  .module('themis.ranks')
  .controller('RanksIndexCtrl', function ($scope, Rank) {

    $scope.loading = true;

    $scope.ranksFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libellé', value: 'label' },
      { name: 'Corps', value: 'corps.label' }
    ];

    $scope.Rank = Rank;

    Rank
      .getAll()
      .then(function (data) {
        $scope.ranks = data;
        $scope.loading = false;
      });

  });