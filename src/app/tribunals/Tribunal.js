angular
  .module('themis.tribunals')
  .factory('Tribunal', function ($q, $http) {
	
    var Tribunal = function () {
      Entity.call(this, $q, $http);
      this.url += '/tribunals';
    };
    Tribunal.prototype = Object.create(Entity.prototype);

	Tribunal.prototype.getAll = function () {
		var deferred = $q.defer();

		var tribunals = [];
		for (var i = 0; i < 20; i++) {
		tribunals.push({
			id: i,
			name:"TGI de Montpellier",
			phone:"010101010110"
			});
			}
			deferred.resolve(tribunals);

      return deferred.promise;
    };
	
    Tribunal.prototype.add = function (tribunalData) {
      var deferred = $q.defer();
      $http
        .post(this.url, tribunalData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Tribunal.prototype.edit = function (tribunalData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + tribunalData.id, tribunalData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Tribunal.prototype.remove = function (tribunalData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + tribunalData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Tribunal();
  
  });