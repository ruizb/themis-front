angular
  .module('themis.business')
  .controller('BusinessIndexCtrl', function ($scope, $window, Business) {

    $scope.loading = true;

    Business
      .getAll()
      .then(function (data) {
        $scope.business = data;
        $scope.loading = false;
      });

    $scope.remove = function (business) {
      if ($window.confirm('Etes-vous s&uacirc;r de vouloir supprimer l\'&eacute;tablissement ' + business.label + ' ?')) {
        Business
          .remove(business)
          .then(function (data) {
            // remove element from DOM
            $scope.business.splice($scope.business.indexOf(business), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });