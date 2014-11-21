angular
  .module('themis.status')
  .controller('StatusEditCtrl', function ($scope, $state, Status, status) {

    var isEdit = !_.isUndefined(status.id) && _.isNumber(status.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un titre';
    }
    else { // edit
      $scope.h2Title = 'Modifier le titre ' + status.name;
    }
    $scope.status = status;

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Status
        [operation]($scope.status)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le titre ' + $scope.status.name + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('status.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le titre n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });