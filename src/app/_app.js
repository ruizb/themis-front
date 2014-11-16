angular
  .module('themis', [
    'templates-app',
    'templates-common',
    'themis.login',
    'themis.home',
    'themis.investigators',
    'themis.ranks',
    'ui.router',
    'angularUtils.directives.dirPagination'
  ]);