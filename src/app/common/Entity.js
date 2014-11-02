angular
  .module('themis')
  .service('Entity', function ($http, $q) {

    var Entity = function () {
      this.urlBase = 'http://themis-back.herokuapp.com/api/1';
      this.url = ''; // need override!
    };
    Entity.prototype = {
      getAll: function () {
        var deferred = $q.defer();
        $http
          .get(this.urlBase + this.url)
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      get: function (id) {
        var deferred = $q.defer();
        $http
          .get(this.urlBase + this.url + '/' + id)
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (err) {
            deferred.reject(err);
          });
        return deferred.promise;
      },
      add: function () {
        throw new Error('Cannot call add method on Entity service');
      },
      edit: function (id) {
        throw new Error('Cannot call edit method on Entity service');
      },
      remove: function (id) {
        throw new Error('Cannot call delete method on Entity service');
      }
    };

    return Entity;
  });