angular
  .module('themis.ranks')
  .factory('Rank', function ($q, $http) {

    var Rank = function () {
      Entity.call(this, $http, $q);
      this.url += '/ranks';
    };
    Rank.prototype = Object.create(Entity.prototype);

    Rank.prototype.getAll = function () {
      var deferred = this.$q.defer();
//      deferred.resolve([
//        {
//          id: 1,
//          label: "Test",
//          corps: {
//            id: 1,
//            name: "Corps hehehe"
//          }
//        }
//      ]);
      this.$http
        .get(this.url)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Rank.prototype.add = function (rankData) {
      var deferred = $q.defer();
      $http
        .post(this.url, rankData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Rank.prototype.edit = function (rankData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + rankData.id, rankData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Rank.prototype.remove = function (rankData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + rankData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Rank();
  
  });