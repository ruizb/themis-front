angular
  .module('themis.login')
  .config(function config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          "main": {
            controller: 'LoginCtrl',
            templateUrl: 'login/login.tpl.html'
          }
        },
        data:{ pageTitle: 'Connexion' }
      });
  });