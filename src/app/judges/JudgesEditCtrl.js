angular
  .module('themis.judges')
  .controller('JudgesEditCtrl', function ($scope, $state, Judge, Status, Tribunal, Clerk, judge) {

    var isEdit = !_.isUndefined(judge.id) && _.isNumber(judge.id);
    $scope.isEdit = isEdit;

    Status
      .getAll()
      .then(function (data) {
        $scope.statusList = _.map(data, function (status) {
          status.selected = (isEdit) ? judge.status.id === status.id : false;
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
          tribunal.selected = (isEdit) ? judge.clerk.tribunal.id === tribunal.id : false;
          return tribunal;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    Clerk
      .getAll()
      .then(function (data) {
        $scope.clerks = _.map(data, function (clerk) {
          clerk.selected = (isEdit) ? judge.clerk.id === clerk.id : false;
          return clerk;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un juge';
    }
    else { // edit
      $scope.h2Title = 'Modifier le juge ' + judge.lname + ' ' + judge.fname;
    }
    $scope.judge = judge;

    $scope.updateStatus = function () {
      _.map($scope.statusList, function (status) {
        status.selected = false;
        return status;
      });

      $scope.statusList.forEach(function (status) {
        if (status.id === parseInt($scope.judge.status.id, 10)) {
          $scope.judge.status = status;
          $scope.judge.status.selected = true;
        }
      });
    };

    $scope.updateTribunal = function () {
      _.map($scope.tribunals, function (tribunal) {
        tribunal.selected = false;
        return tribunal;
      });

      $scope.tribunals.forEach(function (tribunal) {
        if (tribunal.id === parseInt($scope.judge.clerk.tribunal.id, 10)) {
          $scope.judge.clerk.tribunal = tribunal;
          $scope.judge.clerk.tribunal.selected = true;
        }
      });
    };

    $scope.updateClerk = function () {
      _.map($scope.clerks, function (clerk) {
        clerk.selected = false;
        return clerk;
      });

      $scope.clerks.forEach(function (clerk) {
        if (clerk.id === parseInt($scope.judge.clerk.id, 10)) {
          $scope.judge.clerk = clerk;
          $scope.judge.clerk.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.judge.status.id = parseInt($scope.judge.status.id, 10);
      $scope.judge.clerk.id = parseInt($scope.judge.clerk.id, 10);
      Judge
        [operation]($scope.judge)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le juge ' + $scope.judge.fname + ' ' + $scope.judge.lname + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('judges.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le juge n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });
  