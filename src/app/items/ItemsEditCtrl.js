angular
  .module('themis.items')
  .controller('ItemsEditCtrl', function ($scope, $state, Item, item) {

    var isEdit = !_.isUndefined(item.id) && _.isNumber(item.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un objet';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'objet ' + item.libelle;
      $scope.item = item;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Item
        [operation]($scope.item)
        .then(function (data) {
          // success
          $state.go('item.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });