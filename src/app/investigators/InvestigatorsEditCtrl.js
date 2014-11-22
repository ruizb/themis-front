angular
  .module('themis.investigators')
  .controller('InvestigatorsEditCtrl', function ($scope, $state, Investigator, investigator) {

    var isEdit = !_.isUndefined(investigator.id) && _.isNumber(investigator.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un enquêteur';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'enquêteur ' + investigator.fname + ' ' + investigator.lname;
      $scope.investigator = investigator;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Investigator
        [operation]($scope.investigator)
        .then(function (data) {
          // success
          $state.go('investigators.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });