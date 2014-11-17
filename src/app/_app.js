angular
  .module('themis', [
    'templates-app',
    'templates-common',
    'themis.login',
    'themis.home',
    'themis.enqueteurs',
    'themis.corps',
    'themis.ranks',
    'themis.courts',
    'ui.router',
    'ngSanitize',
    'angularUtils.directives.dirPagination'
  ]);