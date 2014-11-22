angular
  .module('themis.investigators')
  .controller('InvestigatorsEditCtrl', function ($scope, $state, Investigator, Rank, Department, Business, investigator) {

    var isEdit = !_.isUndefined(investigator.id) && _.isNumber(investigator.id);
    $scope.isEdit = isEdit;

    Rank
      .getAll()
      .then(function (data) {
        $scope.ranks = _.map(data, function (rank) {
          rank.selected = (isEdit) ? investigator.rank.id === rank.id : false;
          return rank;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    Department
      .getAll()
      .then(function (data) {
        $scope.departments = _.map(data, function (department) {
          department.selected = (isEdit) ? investigator.department.id === department.id : false;
          return department;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    Business
      .getAll()
      .then(function (data) {
        $scope.businesses = _.map(data, function (business) {
          business.selected = (isEdit) ? investigator.business.id === business.id : false;
          return business;
        });
      }, function (err) {
        // error
        console.log(err);
      });

    if (!isEdit) { // add
      $scope.h2Title = 'Ajouter un enquêteur';
    }
    else { // edit
      $scope.h2Title = 'Modifier l\'enquêteur ' + investigator.fname + ' ' + investigator.lname;
    }
    $scope.investigator = investigator;

    $scope.updateRank = function () {
      _.map($scope.ranks, function (rank) {
        rank.selected = false;
        return rank;
      });
      $scope.ranks.forEach(function (rank) {
        if (rank.id === parseInt($scope.investigator.rank.id, 10)) {
          $scope.investigator.rank = rank;
          $scope.investigator.rank.selected = true;
        }
      });
    };

    $scope.updateDepartment = function () {
      _.map($scope.departments, function (department) {
        department.selected = false;
        return department;
      });
      $scope.departments.forEach(function (department) {
        if (department.id === parseInt($scope.investigator.department.id, 10)) {
          $scope.investigator.department = department;
          $scope.investigator.department.selected = true;
        }
      });
    };

    $scope.updateBusiness = function () {
      _.map($scope.businesses, function (business) {
        business.selected = false;
        return business;
      });
      $scope.businesses.forEach(function (business) {
        if (business.id === parseInt($scope.investigator.business.id, 10)) {
          $scope.investigator.business = business;
          $scope.investigator.business.selected = true;
        }
      });
    };

    $scope.submit = function () {
      var operation = isEdit ? 'edit' : 'add';
      $scope.investigator.rank.id = parseInt($scope.investigator.rank.id, 10);
      $scope.investigator.department.id = parseInt($scope.investigator.department.id, 10);
      $scope.investigator.business.id = parseInt($scope.investigator.business.id, 10);
      Investigator
        [operation]($scope.investigator)
        .then(function (data) {
          $scope.addAlert({
            type: 'success',
            msg: 'L\'enquêteur ' + $scope.investigator.fname + ' ' + $scope.investigator.lname + ' a bien été ' + (isEdit ? 'modifié' : 'ajouté') + '.'
          });
          $state.go('investigators.index');
        }, function (err) {
          // error
          $scope.addAlert({
            type: 'danger',
            msg: 'L\'enquêteur n\'a pas pu être ' + (isEdit ? 'modifié' : 'ajouté') + '. Message d\'erreur :<br><code>' + err + '</code>'
          });
          console.log(err);
        });
    };

  });