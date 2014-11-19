angular
  .module('themis.items')
  .controller('ItemsEditCtrl', function ($scope, $state, Item, item) {

    var isEdit = !_.isUndefined(item.id) && _.isNumber(item.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un objet';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'objet ' + item.label;
      $scope.item = item;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Item
        [operation]($scope.item)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'L\'objet ' + $scope.item.label + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('items.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'L\'objet n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });