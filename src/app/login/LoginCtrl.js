angular
  .module('themis.login')
  .controller('LoginCtrl', function ($scope, $state) {

    $scope.login = function () {
      // TODO
      $state.go('home');
    };

  });