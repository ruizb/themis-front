angular
  .module('themis')
  .directive('navBar', function ($state) {
    return {
      restrict: 'E',
      scope: {
        currentState: '='
      },
      templateUrl: 'common/navbar/navbarDirective.tpl.html',
      link: function (scope, element, attrs) {

        scope.logout = function () {
          // TODO
          $state.go('login');
        };

      }
    };
  });