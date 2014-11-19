angular
  .module('themis.items')
  .controller('ItemsIndexCtrl', function ($scope, $window, Item) {

    $scope.loading = true;

    Item
      .getAll()
      .then(function (data) {
        $scope.items = data;
        $scope.loading = false;
      });

    $scope.remove = function (item) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer l\'objet ' + item.label + ' ?')) {
        Item
          .remove(item)
          .then(function (data) {
            // remove element from DOM
            $scope.items.splice($scope.items.indexOf(item), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });