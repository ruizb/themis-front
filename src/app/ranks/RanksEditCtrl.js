angular
  .module('themis.ranks')
  .controller('RanksEditCtrl', function ($scope, $state, Rank, rank) {

    var isEdit = !_.isUndefined(rank.id) && _.isNumber(rank.id);
    $scope.isEdit = isEdit;

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un grade';
    }
    else { // edit
      $scope.h2Title = 'Modifier le grade ' + rank.libelle;
      $scope.rank = rank;
    }

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      Rank
        [operation]($scope.rank)
        .then(function (data) {
          // success
          $state.go('ranks.index');
        }, function (err) {
          // error
          console.log(err);
        });
    };

  });