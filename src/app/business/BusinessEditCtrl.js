angular
  .module('themis.business')
  .controller('BusinessEditCtrl', function ($scope, $state, Business, business) {

    var isEdit = !_.isUndefined(business.id) && _.isNumber(business.id);
    $scope.isEdit = isEdit;

/*    Corps
      .getAll()
      .then(function (data) {
        $scope.corpsList = _.map(data, function (corps) {
          corps.selected = (isEdit) ? rank.corps.id === corps.id : false;
          return corps;
        });
      }, function (err) {
        // error
        console.log(err);
      });
*/
    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un etablissement';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'etablissement ' + business.label;
      $scope.business = business;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
//      $scope.rank.corps.id = parseInt($scope.rank.corps.id, 10);
      Business
        [operation]($scope.business)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'L\'&eacute;tablissement ' + $scope.business.name + ' a bien &eacute;t&eacute; ajout&eacute;.'
          });
          $state.go('business.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'L\'&eacute;tablissement n\'a pas pu &eacirc;tre ajout&eacute;. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });