angular
  .module('themis.itemMissions')
  .controller('ItemMissionsIndexCtrl', function ($scope, ItemMission) {

    $scope.loading = true;

    $scope.itemMissionsFields = [
	{ name: 'ID', value: 'id' },
	{ name: 'Libellé', value: 'label' },
	{ name: 'Objet', value: 'item.label' },
	{ name: 'Mission', value: 'mission.label' },
	{ name: 'Prix', value: 'price' }
    ];

    $scope.ItemMission = ItemMission;

    ItemMission
      .getAll()
      .then(function (data) {
        $scope.itemMissions = data;
        $scope.loading = false;
      });

  });