angular
  .module('themis.prosecutors')
  .factory('Prosecutor', function ($q, $http) {

    var Prosecutor = function () {
      Entity.call(this, $http, $q);
      this.url += '/prosecutors';
    };
    Prosecutor.prototype = Object.create(Entity.prototype);

    Prosecutor.prototype.add = function (prosecutorData) {
      var deferred = $q.defer();
      $http
        .post(this.url, prosecutorData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Prosecutor.prototype.edit = function (prosecutorData) {
      var deferred = $q.defer();
      $http
        .put(this.url + '/' + prosecutorData.id, prosecutorData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Prosecutor.prototype.remove = function (prosecutorData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + prosecutorData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Prosecutor();

  });