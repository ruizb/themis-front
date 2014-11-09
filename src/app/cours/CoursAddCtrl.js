angular
  .module('themis.cours')
  .controller('CoursAddCtrl', function ($scope, cour) {

    if (_.isEmpty(cour)) { // add
      $scope.h2Title = 'Veuiller renseigner les informations correspondant a la cour que vous souhaitez ajouter :';
    }

  });