angular
  .module('themis.itemMissions')
  .controller('ItemMissionsEditCtrl', function ($scope, $state, ItemMission, itemMission) {

    var isEdit = !_.isUndefined(itemMission.id) && _.isNumber(itemMission.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter une mission-objet';
    }
    else { // edit
      $scope.h2Title = 'Modifier la mission-objet ' + itemMission.label;
      $scope.itemMission = itemMission;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      ItemMission
        [operation]($scope.itemMission)
        .then(function (data) {
          // success
          $state.go('itemMissions.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });