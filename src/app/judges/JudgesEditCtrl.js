angular
  .module('themis.judges')
  .controller('JudgesEditCtrl', function ($scope, $state, Judge, judge) {

    var isEdit = !_.isUndefined(judge.id) && _.isNumber(judge.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un juge';
    }
    else { // edit
      $scope.h2Title = 'Modifier le juge ' + judge.lname + ' ' + judge.fname;
      $scope.judge = judge;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Judge
        [operation]($scope.judge)
        .then(function (data) {
          // success
          $state.go('judges.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });
  