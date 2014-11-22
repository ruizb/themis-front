angular
  .module('themis.itemMissions')
  .controller('ItemMissionsIndexCtrl', function ($scope, $window, ItemMission) {

    $scope.loading = true;

    ItemMission
      .getAll()
      .then(function (data) {
        $scope.itemMissions = data;
        $scope.loading = false;
      });

    $scope.remove = function (itemMission) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le couple objet-mission (' + itemMission.item.label + ')-(' + itemMission.mission.label + ') ?')) {
        ItemMission
          .remove(itemMission)
          .then(function (data) {
            // remove element from DOM
            $scope.itemMissions.splice($scope.itemMissions.indexOf(itemMission), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });