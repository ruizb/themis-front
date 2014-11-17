angular
  .module('themis.status')
  .factory('Status', function ($q, $http) {
  
    var Status = function () {
      Entity.call(this, $http, $q);
      this.url += '/status';
    };
    Status.prototype = Object.create(Entity.prototype);

//	Status.prototype.getAll = function () {
//		var deferred = $q.defer();
//
//		var status = [];
//		for (var i = 0; i < 3; i++) {
//			status.push({
//				id: i,
//				name: "Magistrat"
//			});
//		}
//		deferred.resolve(status);
//	return deferred.promise;
//	};

    Status.prototype.add = function (statusData) {
      var deferred = $q.defer();
      $http
        .post(this.url, statusData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Status.prototype.edit = function (statusData) {
      var deferred = $q.defer();
      $http
        .put(this.url + '/' + statusData.id, statusData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Status.prototype.remove = function (statusData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + statusData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Status();
  
  });