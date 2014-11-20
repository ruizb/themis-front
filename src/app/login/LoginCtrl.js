angular
  .module('themis.login')
  .controller('LoginCtrl', function ($scope, $http, $state) {

//    if (!_.isUndefined($rootScope.user) && $rootScope.user.isAuthenticated) {
//      $state.go('home');
//    }

    $scope.login = function () {
      // TODO
      $state.go('home');
//      $http
//        .post('http://themisapi.herokuapp.com/user', {
//          headers: {
//            "Authorization": "Basic " + btoa($rootScope.user.username + ':' + $rootScope.user.password)
//          }
//        })
//        .success(function (data) {
//          $rootScope.user.isAuthenticated = true;
//          $scope.addAlert({
//            type: 'success',
//            msg: 'Connexion réussie'
//          });
//          $state.go('home');
//        })
//        .error(function (err) {
//          $scope.addAlert({
//            type: 'danger',
//            msg: 'Il y a eu une error lors de la connexion.<br>Message d\'erreur:<br><code>' + err + '</code>'
//          });
//        });
    };

  });