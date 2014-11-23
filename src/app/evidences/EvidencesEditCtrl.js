angular
  .module('themis.evidences')
  .controller('EvidencesEditCtrl', function ($scope, $state, Evidence, ItemMission, evidence) {

    var isEdit = !_.isUndefined(evidence.num) && _.isNumber(evidence.num);
    $scope.isEdit = isEdit;

    $scope.selectedItemMissions = [];
    $scope.selectedItemMissionId = null; // id of the last itemMission selected in the select input

    $scope.addSelectedItemMission = function () {
      var selectedIM = _.find($scope.itemMissions, { id: parseInt($scope.selectedItemMissionId, 10) }),
        alreadySelected = false,
        i = 0;
      while (i < $scope.selectedItemMissions.length && !alreadySelected) {
        if ($scope.selectedItemMissions[i] === selectedIM) {
          alreadySelected = true;
        }
        i++;
      }
      if (!alreadySelected) {
        $scope.selectedItemMissions.push(selectedIM);
      }
    };

    $scope.removeListedItemMission = function (im) {
      var deleted = false,
        i = 0;
      while (i < $scope.selectedItemMissions.length && !deleted) {
        if ($scope.selectedItemMissions[i] === im) {
          $scope.selectedItemMissions.splice(i, 1);
          deleted = true;
        }
        i++;
      }
    };

    ItemMission
      .getAll()
      .then(function (data) {
        $scope.itemMissions = data;
        _.forEach(data, function (itemMission) {
          if (_.find($scope.evidence.operations, { id: itemMission.id })) {
            $scope.selectedItemMissions.push(itemMission);
          }
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un scellé';
    }
    else { // edit
      $scope.h2Title = 'Modifier le scellé ' + evidence.label;
    }
    $scope.evidence = evidence;

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.evidence.num = parseInt($scope.evidence.num, 10);
      $scope.evidence.numPV = parseInt($scope.evidence.numPV, 10);
      $scope.evidence.operations = $scope.selectedItemMissions;
      console.log('Sending...', $scope.evidence);
      Evidence
        [operation]($scope.evidence)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le scellé ' + $scope.evidence.label + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('evidences.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le scellé n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });