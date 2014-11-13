angular
  .module('themis.corps')
  .controller('CorpsIndexCtrl', function ($scope, Corps) {

    $scope.loading = true;

    $scope.corpsFields = [
      { name: 'ID', value: 'id' },
      { name: 'label', value: 'label' }
    ];

    $scope.Corps = Corps;

    Corps
      .getAll()
      .then(function (data) {
        $scope.corps = data;
        $scope.loading = false;
      });

  });