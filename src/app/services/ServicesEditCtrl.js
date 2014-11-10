angular
  .module('themis.services')
  .controller('ServicesEditCtrl', function ($scope, $state, Service, service) {

    var isEdit = !_.isUndefined(service.id) && _.isNumber(service.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un service';
    }
    else { // edit
      $scope.h2Title = 'Modifier le service ' + service.name;
      $scope.service = service;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Service
        [operation]($scope.service)
        .then(function (data) {
          // success
          $state.go('services.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });
  