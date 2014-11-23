angular
  .module('themis.judges')
  .controller('JudgesIndexCtrl', function ($scope, $modal, $window, Judge) {

    $scope.loading = true;

    $scope.judgesFields = [
		{ name: 'ID', value: 'id' },
		{ name: 'Prénom', value: 'fname' },
		{ name: 'Nom', value: 'lname'},
		{ name: 'Adresse', value: 'address.city'},
		{ name: 'Telephone', value: 'phone'},
		{ name: 'Fax', value: 'fax'},
		{ name: 'Titre', value: 'status.name'},
		{ name: 'Greffier', value: 'clerk.lname'}
    ];

    $scope.openTribunalDetails = function (tribunal) {
      $modal.open({
        templateUrl: 'tribunals/tribunalsModal.tpl.html',
        controller: 'TribunalsModalCtrl',
        size: 'sm',
        resolve: {
          tribunal: function () {
            return tribunal;
          }
        }
      });
    };

    Judge
      .getAll()
      .then(function (data) {
        $scope.judges = data;
        $scope.loading = false;
      });

    $scope.remove = function (judge) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le juge ' + judge.fname + ' ' + judge.lname + ' ?')) {
        Judge
          .remove(judge)
          .then(function (data) {
            // remove element from DOM
            $scope.judges.splice($scope.judges.indexOf(judge), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

  });