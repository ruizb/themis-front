angular
  .module('themis.enqueteurs')
  .controller('EnqueteursIndexCtrl', function ($scope, Enqueteur) {

    Enqueteur
      .getAll()
      .then(function (data) {
        $scope.enqueteurs = data;
      });

  });