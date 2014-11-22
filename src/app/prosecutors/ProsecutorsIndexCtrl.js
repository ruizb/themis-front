angular
	.module('themis.prosecutors')
	.controller('ProsecutorsIndexCtrl', function ($scope, $modal, Prosecutor) {

		$scope.loading = true;
	
		Prosecutor
		.getAll()
		.then(function (data) {
			$scope.prosecutors = data;
			$scope.loading = false;
		});

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

    $scope.remove = function (prosecutor) {
      if ($window.confirm('Etes-vous sûr de vouloir supprimer le procureur ' + prosecutor.fname + ' ' + prosecutor.lname + ' ?')) {
        Prosecutor
          .remove(prosecutor)
          .then(function (data) {
            // remove element from DOM
            $scope.prosecutors.splice($scope.prosecutors.indexOf(prosecutor), 1);
          }, function (err) {
            console.log(err);
          });
      }
    };

	});