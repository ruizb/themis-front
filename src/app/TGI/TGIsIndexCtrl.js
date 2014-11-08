angular
  .module('themis.TGIs')
  .controller('TGIsIndexCtrl', function ($scope, TGI) {

    TGI
      .getAll()
      .then(function (data) {
        $scope.TGIs = data;
      });

  });