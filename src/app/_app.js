angular
  .module('themis', [
    'templates-app',
    'templates-common',
    'themis.login',
    'themis.home',
    'themis.enqueteurs',
    'themis.ranks',
	'themis.courts',
    'ui.router',
    'angularUtils.directives.dirPagination'
  ]);