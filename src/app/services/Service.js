angular
  .module('themis.services')
  .factory('Service', function (Entity, $q, $http) {
  
    var Service = function () {
      Entity.call(this);
      this.url += '/services';
    };
    Service.prototype = Object.create(Entity.prototype);
	
	// TODO tmp
	Service.prototype.getAll = function () {
		var deferred = $q.defer();
		var services = [];
		for (var i = 0; i < 3; i++) {
			services.push({
				id: i,
				name: "BAC",
				corps: {
					id: 1,
					name: 'Police'	
				}
			});
		}
		deferred.resolve(services);
		return deferred.promise;
	};

    Service.prototype.add = function (serviceData) {
      var deferred = $q.defer();
      $http
        .post(this.url, serviceData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Service.prototype.edit = function (serviceData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + serviceData.id, serviceData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Service.prototype.remove = function (serviceData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + serviceData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Service();
  
  });