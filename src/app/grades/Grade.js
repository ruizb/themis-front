angular
  .module('themis.grades')
  .factory('Grade', function ($q, $http) {

    var Grade = function () {
      Entity.call(this, $http, $q);
      this.url += '/grades';
    };
    Grade.prototype = Object.create(Entity.prototype);

    Grade.prototype.add = function (gradeData) {
      var deferred = $q.defer();
      $http
        .post(this.url, gradeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Grade.prototype.edit = function (gradeData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + gradeData.id, gradeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Grade.prototype.remove = function (gradeData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + gradeData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Grade();
  
  });