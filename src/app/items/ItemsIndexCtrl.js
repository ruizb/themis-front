angular
  .module('themis.items')
  .controller('ItemsIndexCtrl', function ($scope, Item) {

    $scope.loading = true;

    $scope.itemsFields = [
      { name: 'ID', value: 'id' },
      { name: 'Libelle', value: 'label' }
    ];

    $scope.Item = Item;

    Item
      .getAll()
      .then(function (data) {
        $scope.items = data;
        $scope.loading = false;
      });

  });