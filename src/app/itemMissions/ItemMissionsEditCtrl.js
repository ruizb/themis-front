angular
  .module('themis.itemMissions')
  .controller('ItemMissionsEditCtrl', function ($scope, $state, ItemMission, Item, Mission, itemMission) {

    var isEdit = !_.isUndefined(itemMission.id) && _.isNumber(itemMission.id);
    $scope.isEdit = isEdit;

    Item
      .getAll()
      .then(function (data) {
        $scope.items = _.map(data, function (item) {
          item.selected = (isEdit) ? itemMission.item.id === item.id : false;
          return item;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    Mission
      .getAll()
      .then(function (data) {
        $scope.missions = _.map(data, function (mission) {
          mission.selected = (isEdit) ? itemMission.mission.id === mission.id : false;
          return mission;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter une mission-objet';
    }
    else { // edit
      $scope.h2Title = 'Modifier la mission-objet ' + itemMission.label;
    }
    $scope.itemMission = itemMission;

    $scope.updateItem = function () {
      _.map($scope.items, function (item) {
        item.selected = false;
        return item;
      });

      $scope.items.forEach(function (item) {
        if (item.id === parseInt($scope.itemMission.item.id, 10)) {
          $scope.itemMission.item = item;
          $scope.itemMission.item.selected = true;
        }
      });
    };

    $scope.updateMission = function () {
      _.map($scope.missions, function (mission) {
        mission.selected = false;
        return mission;
      });

      $scope.missions.forEach(function (mission) {
        if (mission.id === parseInt($scope.itemMission.mission.id, 10)) {
          $scope.itemMission.mission = mission;
          $scope.itemMission.mission.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.itemMission.item.id = parseInt($scope.itemMission.item.id, 10);
      $scope.itemMission.mission.id = parseInt($scope.itemMission.mission.id, 10);
      $scope.itemMission.price = parseInt($scope.itemMission.price, 10);
      ItemMission
        [operation]($scope.itemMission)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le couple objet-mission (' + $scope.itemMission.item.label + ')-(' + $scope.itemMission.mission.label + ') a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('itemMissions.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le couple objet-mission n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });