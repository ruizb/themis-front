angular
  .module('themis.status')
  .controller('StatusIndexCtrl', function ($scope, $window, Status) {

    $scope.loading = true;

    Status
      .getAll()
      .then(function (data) {
        $scope.statusList = data;
        $scope.loading = false;
      });

    $scope.remove = function (status) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le titre ' + status.name + ' ?')) {
        Status
          .remove(status)
          .then(function (data) {
            // remove element from DOM
            $scope.statusList.splice($scope.statusList.indexOf(status), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });