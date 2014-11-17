angular
  .module('themis.ranks')
  .controller('RanksEditCtrl', function ($scope, $state, Rank, Corps, rank) {

    var isEdit = !_.isUndefined(rank.id) && _.isNumber(rank.id);
    $scope.isEdit = isEdit;

    Corps
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

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un grade';
    }
    else { // edit
      $scope.h2Title = 'Modifier le grade ' + rank.label;
      $scope.rank = rank;
    }

    $scope.updateRanksCorps = function () {
      _.map($scope.corpsList, function (corps) {
        // reinitialize selected property of each corps
        corps.selected = false;
        return corps;
      });

      // get full Corps because we only have to ID in $scope.rank.corps from the select
      $scope.corpsList.forEach(function (corps) {
        if (corps.id === parseInt($scope.rank.corps.id, 10)) {
          $scope.rank.corps = corps;
          $scope.rank.corps.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.rank.corps.id = parseInt($scope.rank.corps.id, 10);
      Rank
        [operation]($scope.rank)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le grade ' + $scope.rank.label + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('ranks.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le grade n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });