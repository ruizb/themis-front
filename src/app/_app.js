angular
  .module('themis', [
    'templates-app',
    'templates-common',
    'themis.login',
    'themis.home',
    'themis.enqueteurs',
	'themis.procureurs',
    'themis.ranks',
    'ui.router',
    'angularUtils.directives.dirPagination'
  ]);