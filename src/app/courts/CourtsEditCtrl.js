angular
  .module('themis.courts')
  .controller('CourtsEditCtrl', function ($scope, $state, Court, court) {

    var isEdit = !_.isUndefined(court.id) && _.isNumber(court.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter une cour';
    }
    else { // edit
      $scope.h2Title = 'Modifier la cour ' + court.label;
    }
    $scope.court = court;

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Court
        [operation]($scope.court)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'La cour ' + $scope.court.label + ' a bien été ' + (isEdit ? 'modifiée' : 'ajoutée') + '.'
          });
          $state.go('courts.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'La cour n\'a pas pu être ' + (isEdit ? 'modifiée' : 'ajoutée') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });