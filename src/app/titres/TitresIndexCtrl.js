angular
  .module('themis.titres')
  .controller('TitresIndexCtrl', function ($scope, Titre) {

    $scope.loading = true;

    $scope.titresFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libellé', value: 'name' }
    ];

    $scope.Titre = Titre;

    Titre
      .getAll()
      .then(function (data) {
        $scope.titres = data;
        $scope.loading = false;
      });

  });