angular
  .module('themis.tgis')
  .controller('TgisEditCtrl', function ($scope, $state, Tgi, tgi) {

    var isEdit = !_.isUndefined(tgi.id) && _.isNumber(tgi.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un TGI';
    }
    else { // edit
      $scope.h2Title = 'Modifier le TGI ' + tgi.name;
      $scope.tgi = tgi;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Tgi
        [operation]($scope.TGI)
        .then(function (data) {
          // success
          $state.go('tgis.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });