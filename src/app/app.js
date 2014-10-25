angular.module('themis', [
  'templates-app',
  'templates-common',
  'themis.home',
  'themis.about',
  'ui.router'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
})

.run(function run() {

})

.controller('AppCtrl', function AppCtrl($scope, $location) {
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle;
    }
    $scope.currentState = angular.isDefined(toState) ? toState.name : 'home';
  });
});