angular
  .module('themis.tribunals')
  .controller('TribunalsEditCtrl', function ($scope, $state, Tribunal, Court, tribunal) {

    var isEdit = !_.isUndefined(tribunal.id) && _.isNumber(tribunal.id);
    $scope.isEdit = isEdit;

    Court
      .getAll()
      .then(function (data) {
        $scope.courts = _.map(data, function (court) {
          court.selected = (isEdit) ? court.corps.id === court.id : false;
          return court;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un TGI';
    }
    else { // edit
      $scope.h2Title = 'Modifier le TGI ' + tribunal.name;
      $scope.tribunal = tribunal;
    }

    $scope.updateTribunalsCourt = function () {
      _.map($scope.courts, function (court) {
        court.selected = false;
        return court;
      });

      $scope.courts.forEach(function (court) {
        if (court.id === parseInt($scope.tribunal.court.id, 10)) {
          $scope.rank.court = court;
          $scope.rank.court.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Tribunal
        [operation]($scope.tribunal)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le TGI ' + $scope.tribunal.name + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('tribunals.index');
        }, function (err) {
          $scope.addAlert({
            type: 'danger',
            msg: 'Le TGI n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });