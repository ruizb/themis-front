angular
  .module('themis.clerks')
  .controller('ClerksIndexCtrl', function ($scope, $window, $modal, Clerk) {

    $scope.loading = true;

    Clerk
      .getAll()
      .then(function (data) {
        $scope.clerks = data;
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

    $scope.remove = function (clerk) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le greffier ' + clerk.fname + ' ' + clerk.lname + ' ?')) {
        Clerk
          .remove(clerk)
          .then(function (data) {
            // remove element from DOM
            $scope.clerks.splice($scope.clerks.indexOf(clerk), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });