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

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
//      $scope.rank.corps.id = parseInt($scope.rank.corps.id, 10);
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