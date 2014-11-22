angular
  .module('themis.departments')
  .controller('DepartmentsEditCtrl', function ($scope, $state, Department, Corps, department) {

    var isEdit = !_.isUndefined(department.id) && _.isNumber(department.id);
    $scope.isEdit = isEdit;

    Corps
      .getAll()
      .then(function (data) {
        $scope.corpsList = _.map(data, function (corps) {
          corps.selected = (isEdit) ? department.corps.id === corps.id : false;
          return corps;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un service';
    }
    else { // edit
      $scope.h2Title = 'Modifier le service ' + department.name;
      $scope.department = department;
    }

    $scope.updateDepartmentsCorps = function () {
      _.map($scope.corpsList, function (corps) {
        // reinitialize selected property of each corps
        corps.selected = false;
        return corps;
      });

      // get full Corps because we only have to ID in $scope.rank.corps from the select
      $scope.corpsList.forEach(function (corps) {
        if (corps.id === parseInt($scope.department.corps.id, 10)) {
          $scope.department.corps = corps;
          $scope.department.corps.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.department.corps.id = parseInt($scope.department.corps.id, 10);
      Department
        [operation]($scope.department)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'Le service ' + $scope.department.name + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('departments.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'Le service n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });
  