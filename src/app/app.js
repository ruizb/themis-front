angular
  .module('themis')

  // allow DI for use in controllers, unit tests
  .constant('_', window._)

  // allow lodash to be used in views (like in ng-repeat or ng-class)
  .run(function run($rootScope) {
    $rootScope._ = window._;
  })

  .config(function myAppConfig($stateProvider, $urlRouterProvider) {
    // if (user is logged in) { otherwise=home } else { otherwise=login }
    // TODO
    $urlRouterProvider.otherwise('/login');
  })

  .controller('AppCtrl', function AppCtrl($scope, $location) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle;
      }
      $scope.currentState = angular.isDefined(toState) ? toState.name : 'home';
    });
  });