angular
  .module('themis.corps')
  .factory('Corps',function(Entity, $q, $http){
  
	var Corps = function () {
      Entity.call(this);
      this.url = '/corps';
    };
	Corps.prototype = Object.create(Entity.prototype);
	 
	Corps.prototype.getAll = function () {
      var deferred = $q.defer();

      var corps = [];
      for (var i = 0; i < 20; i++) {
        corps.push({
          id: i,
          libelle:"gendarmerie"
        });
      }
      deferred.resolve(corps);

      return deferred.promise;
    };
	
	Corps.prototype.add = function (corpsData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, corpsData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	
	Corps.prototype.edit = function (corpsData) {
      var deferred = $q.defer();
      $http
        .put(this.urlBase + this.url + '/' + corpsData.id, corpsData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	//????
    Corps.prototype.remove = function (corpsData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.urlBase + this.url + '/' + corpsData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
  
	return new Corps();
  
  });