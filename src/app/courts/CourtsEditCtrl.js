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
      $scope.court = court;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Court
        [operation]($scope.court)
        .then(function (data) {
          // success
          $state.go('courts.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });