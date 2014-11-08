angular
  .module('themis.greffiers')
  .controller('GreffiersIndexCtrl', function ($scope, Greffier) {

    Greffier
      .getAll()
      .then(function (data) {
        $scope.greffiers = data;
      });

  });