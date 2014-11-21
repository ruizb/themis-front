angular
  .module('themis.corps')
  .controller('CorpsEditCtrl', function ($scope, $state, Corps, corps) {

    var isEdit = !_.isUndefined(corps.id) && _.isNumber(corps.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un corps';
    }
    else { // edit
      $scope.h2Title = 'Modifier le corps ' + corps.label;
    }
    $scope.corps = corps;

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Corps
        [operation]($scope.corps)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le corps ' + $scope.corps.label + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('corps.index');
        }, function (err) {
          $scope.addAlert({
            type: 'danger',
            msg: 'Le corps n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });