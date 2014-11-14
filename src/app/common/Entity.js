var Entity = function ($http, $q) {
  this.$http = $http;
  this.$q = $q;
  this.url = 'http://themisapi.herokuapp.com'; // need override!
};

Entity.prototype = {
  getAll: function () {
    var deferred = this.$q.defer();
    this.$http
      .get(this.url)
      .success(function (data) {
        deferred.resolve(data);
      })
      .error(function (err) {
        deferred.reject(err);
      });
    return deferred.promise;
  },

  get: function (id) {
    var deferred = this.$q.defer();
    this.$http
      .get(this.url + '/' + id)
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