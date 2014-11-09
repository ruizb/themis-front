angular
  .module('themis.procureurs')
  .controller('ProcureursIndexCtrl', function ($scope, Procureur) {

    Procureur
      .getAll()
      .then(function (data) {
        $scope.procureurs = data;
      });

  });