angular
  .module('themis.missions')
  .controller('MissionsEditCtrl', function ($scope, $state, Mission, mission) {

    var isEdit = !_.isUndefined(mission.id) && _.isNumber(mission.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter une mission';
    }
    else { // edit
      $scope.h2Title = 'Modifier la mission ' + mission.label;
      $scope.mission = mission;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Mission
        [operation]($scope.mission)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'La mission ' + $scope.mission.label + ' a bien été ' + (isEdit ? 'modifiée' : 'ajoutée') + '.'
          });
          $state.go('missions.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'La mission n\'a pas pu être ' + (isEdit ? 'modifiée' : 'ajoutée') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });