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
          // success
          $state.go('missions.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });