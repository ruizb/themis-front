angular
  .module('themis.business')
  .controller('BusinessEditCtrl', function ($scope, $state, Business, Department, Tribunal, Corps, business) {

    var isEdit = !_.isUndefined(business.id) && _.isNumber(business.id);
    $scope.isEdit = isEdit;

    $scope.selectedDepartments = [];
    $scope.selectedDepartmentId = null; // id of the last department selected in the select input

    $scope.addSelectedDepartement = function () {
      var selectedDep = _.find($scope.departments, { id: parseInt($scope.selectedDepartmentId, 10) }),
          alreadySelected = false,
          i = 0;
      while (i < $scope.selectedDepartments.length && !alreadySelected) {
        if ($scope.selectedDepartments[i] === selectedDep) {
          alreadySelected = true;
        }
        i++;
      }
      if (!alreadySelected) {
        $scope.selectedDepartments.push(selectedDep);
      }
    };

    $scope.removeListedDepartment = function (dep) {
      var deleted = false,
        i = 0;
      while (i < $scope.selectedDepartments.length && !deleted) {
        if ($scope.selectedDepartments[i] === dep) {
          $scope.selectedDepartments.splice(i, 1);
          deleted = true;
        }
        i++;
      }
    };

    Department
      .getAll()
      .then(function (data) {
        $scope.departments = data;
        _.forEach(data, function (department) {
          if (_.find($scope.business.departments, { id: department.id })) {
            $scope.selectedDepartments.push(department);
          }
        });
      }, function (err) {
        // error
        console.log(err);
      });

    Tribunal
      .getAll()
      .then(function (data) {
        $scope.tribunals = _.map(data, function (tribunal) {
          tribunal.selected = (isEdit) ? business.tribunal.id === tribunal.id : false;
          return tribunal;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    Corps
      .getAll()
      .then(function (data) {
        $scope.corpsList = _.map(data, function (corps) {
          corps.selected = (isEdit) ? business.corps.id === corps.id : false;
          return corps;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un etablissement';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'etablissement ' + business.label;
    }
    $scope.business = business;

    $scope.updateTribunal = function () {
      _.map($scope.tribunals, function (tribunal) {
        tribunal.selected = false;
        return tribunal;
      });
      $scope.tribunals.forEach(function (tribunal) {
        if (tribunal.id === parseInt($scope.business.tribunal.id, 10)) {
          $scope.business.tribunal = tribunal;
          $scope.business.tribunal.selected = true;
        }
      });
    };

    $scope.updateCorps = function () {
      _.map($scope.corpsList, function (corps) {
        corps.selected = false;
        return corps;
      });
      $scope.corpsList.forEach(function (corps) {
        if (corps.id === parseInt($scope.business.corps.id, 10)) {
          $scope.business.corps = corps;
          $scope.business.corps.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.business.tribunal.id = parseInt($scope.business.tribunal.id, 10);
      $scope.business.corps.id = parseInt($scope.business.corps.id, 10);
      $scope.business.departments = $scope.selectedDepartments;
      console.log('Sending...', $scope.business);
      Business
        [operation]($scope.business)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'L\'établissement ' + $scope.business.name + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('business.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'L\'établissement n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });