angular
  .module('themis.corpss')
  .controller('CorpssIndexCtrl', function ($scope, Corps) {

    $scope.loading = true;

    $scope.corpssFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libelle', value: 'libelle' }
    ];

    $scope.Corps = Corps;

    Corps
      .getAll()
      .then(function (data) {
        $scope.corpss = data;
        $scope.loading = false;
      });

  });