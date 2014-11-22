angular
  .module('themis.business')
  .controller('BusinessIndexCtrl', function ($scope, $modal, $window, Business) {

    $scope.loading = true;

    Business
      .getAll()
      .then(function (data) {
        $scope.business = data;
        $scope.loading = false;
      });

    $scope.openTribunalDetails = function (tribunal) {
      $modal.open({
        templateUrl: 'tribunals/tribunalsModal.tpl.html',
        controller: 'TribunalsModalCtrl',
        size: 'sm',
        resolve: {
          tribunal: function () {
            return tribunal;
          }
        }
      });
    };

    $scope.remove = function (business) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer l\'établissement ' + business.name + ' ?')) {
        Business
          .remove(business)
          .then(function (data) {
            // remove element from DOM
            $scope.businesses.splice($scope.businesses.indexOf(business), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });