angular
  .module('themis.evidences')
  .controller('EvidencesIndexCtrl', function ($scope, Evidence) {

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

  });