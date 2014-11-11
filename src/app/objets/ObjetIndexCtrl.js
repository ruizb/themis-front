angular
  .module('themis.objets')
  .controller('ObjetsIndexCtrl', function ($scope, Objet) {

    $scope.loading = true;

    $scope.objetsFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libelle', value: 'libelle' }
    ];

    $scope.Objet = Objet;

    Objet
      .getAll()
      .then(function (data) {
        $scope.objets = data;
        $scope.loading = false;
      });

  });