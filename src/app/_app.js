angular
  .module('themis', [
    'templates-app',
    'templates-common',
    'themis.login',
    'themis.home',
    'themis.enqueteurs',
	'themis.items',
    'themis.ranks',
    'ui.router',
    'angularUtils.directives.dirPagination'
  ]);