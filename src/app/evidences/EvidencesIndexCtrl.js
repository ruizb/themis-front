angular
  .module('themis.evidences')
  .controller('EvidencesIndexCtrl', function ($scope, $window, Evidence) {

    $scope.loading = true;

    $scope.evidencesFields = [
	{ name: 'ID', value: 'id' },
	{ name: 'Libellé', value: 'label' },
	{ name: 'Numéro', value: 'num' },
	{ name: 'Numéro PV', value: 'numPV' },
	{ name: 'Objet-missions', value: 'itemMission.label' }
    ];

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