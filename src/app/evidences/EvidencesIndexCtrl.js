angular
  .module('themis.evidences')
  .controller('EvidencesIndexCtrl', function ($scope, $window, Evidence) {

    $scope.loading = true;

    $scope.Evidence = Evidence;

    Evidence
      .getAll()
      .then(function (data) {
        $scope.evidences = data;
        $scope.loading = false;
      });

    $scope.remove = function (evidence) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le scellé ' + evidence.label + ' ?')) {
        Evidence
          .remove(evidence)
          .then(function (data) {
            // remove element from DOM
            $scope.evidences.splice($scope.evidences.indexOf(evidence), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });