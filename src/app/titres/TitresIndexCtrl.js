angular
  .module('themis.titres')
  .controller('TitresIndexCtrl', function ($scope, Titre) {

    Titre
      .getAll()
      .then(function (data) {
        $scope.titres = data;
      });

  });