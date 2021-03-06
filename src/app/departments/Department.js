angular
  .module('themis.departments')
  .factory('Department', function ($q, $http) {
  
    var Department = function () {
      Entity.call(this, $http, $q);
      this.url += '/departments';
    };
    Department.prototype = Object.create(Entity.prototype);

    Department.prototype.add = function (departmentData) {
      var deferred = $q.defer();
      $http
        .post(this.url, departmentData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Department.prototype.edit = function (departmentData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + departmentData.id, departmentData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Department.prototype.remove = function (departmentData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + departmentData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Department();
  
  });