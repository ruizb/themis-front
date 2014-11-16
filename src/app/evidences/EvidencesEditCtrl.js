angular
  .module('themis.evidences')
  .controller('EvidencesEditCtrl', function ($scope, $state, Evidence, evidence) {

    var isEdit = !_.isUndefined(evidence.id) && _.isNumber(evidence.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un scelle';
    }
    else { // edit
      $scope.h2Title = 'Modifier le scelle ' + evidence.label;
      $scope.evidence = evidence;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Evidence
        [operation]($scope.evidence)
        .then(function (data) {
          // success
          $state.go('evidences.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });