angular
  .module('themis.corps')
  .controller('CorpsIndexCtrl', function ($scope, Corps) {

    Corps
      .getAll()
      .then(function (data) {
        $scope.corps = data;
      });

  });