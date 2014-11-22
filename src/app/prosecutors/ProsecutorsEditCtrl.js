angular
  .module('themis.prosecutors')
  .controller('ProsecutorsEditCtrl', function ($scope, $state, Prosecutor, Status, Tribunal, prosecutor) {

    var isEdit = !_.isUndefined(prosecutor.id) && _.isNumber(prosecutor.id);
    $scope.isEdit = isEdit;

    Status
      .getAll()
      .then(function (data) {
        $scope.statusList = _.map(data, function (status) {
          status.selected = (isEdit) ? prosecutor.status.id === status.id : false;
          return status;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    Tribunal
      .getAll()
      .then(function (data) {
        $scope.tribunals = _.map(data, function (tribunal) {
          tribunal.selected = (isEdit) ? prosecutor.tribunal.id === tribunal.id : false;
          return tribunal;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un procureur';
    }
    else { // edit
      $scope.h2Title = 'Modifier le procureur ' + prosecutor.fname + " " + procureur.lname;
      $scope.prosecutor = prosecutor;
    }

    $scope.updateProsecutorsStatus = function () {
      _.map($scope.statusList, function (status) {
        status.selected = false;
        return status;
      });

      $scope.statusList.forEach(function (status) {
        if (status.id === parseInt($scope.prosecutor.status.id, 10)) {
          $scope.prosecutor.status = status;
          $scope.prosecutor.status.selected = true;
        }
      });
    };

    $scope.updateProsecutorsTribunal = function () {
      _.map($scope.tribunals, function (tribunal) {
        tribunal.selected = false;
        return tribunal;
      });

      $scope.tribunals.forEach(function (tribunal) {
        if (tribunal.id === parseInt($scope.prosecutor.tribunal.id, 10)) {
          $scope.prosecutor.tribunal = tribunal;
          $scope.prosecutor.tribunal.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.prosecutor.status.id = parseInt($scope.prosecutor.status.id, 10);
      $scope.prosecutor.tribunal.id = parseInt($scope.prosecutor.tribunal.id, 10);
      Prosecutor
        [operation]($scope.prosecutor)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le procureur ' + $scope.prosecutor.fname + ' ' + $scope.prosecutor.lname + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('prosecutors.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le procureur n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });