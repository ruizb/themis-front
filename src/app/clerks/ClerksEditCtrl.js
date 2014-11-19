angular
  .module('themis.clerks')
  .controller('ClerksEditCtrl', function ($scope, $state, Clerk, Tribunal, clerk) {

    var isEdit = !_.isUndefined(clerk.id) && _.isNumber(clerk.id);
    $scope.isEdit = isEdit;

    Tribunal
      .getAll()
      .then(function (data) {
        $scope.tribunals = _.map(data, function (tribunal) {
          tribunal.selected = (isEdit) ? clerk.tribunal.id === tribunal.id : false;
          return tribunal;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un greffier';
    }
    else { // edit
      $scope.h2Title = 'Modifier le greffier';
      $scope.clerk = clerk;
    }

    $scope.updateClerksTribunal = function () {
      _.map($scope.tribunals, function (tribunal) {
        tribunal.selected = false;
        return tribunal;
      });

      $scope.tribunals.forEach(function (tribunal) {
        if (tribunal.id === parseInt($scope.clerk.tribunal.id, 10)) {
          $scope.clerk.tribunal = tribunal;
          $scope.clerk.tribunal.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.clerk.tribunal.id = parseInt($scope.clerk.tribunal.id, 10);
      Clerk
        [operation]($scope.clerk)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le greffier ' + $scope.clerk.fname + ' ' + $scope.clerk.lname + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('clerks.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le greffier n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });