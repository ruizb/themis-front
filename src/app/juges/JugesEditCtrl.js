angular
  .module('themis.juges')
  .controller('JugesEditCtrl', function ($scope, $state, Juge, juge) {

    var isEdit = !_.isUndefined(juge.id) && _.isNumber(juge.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un juge';
    }
    else { // edit
      $scope.h2Title = 'Modifier le juge ' + juge.name + ' ' + juge.fname;
      $scope.juge = juge;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Juge
        [operation]($scope.juge)
        .then(function (data) {
          // success
          $state.go('juges.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });
  