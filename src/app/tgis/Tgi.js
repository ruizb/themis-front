angular
  .module('themis.tgis')
  .factory('Tgi', function (Entity, $q, $http /*Cour*/) {
	
	//Cour = "cour de montpellier";
	
    var Tgi = function () {
      Entity.call(this);
      this.url += '/tgis';
    };
    Tgi.prototype = Object.create(Entity.prototype);

	Tgi.prototype.getAll = function () {
		var deferred = $q.defer();

		var tgis = [];
		for (var i = 0; i < 20; i++) {
		tgis.push({
			id: i,
			name:"TGI de Montpellier",
			phone:"010101010110"
			//court:"cour de montp"
			});
			}
			deferred.resolve(tgis);

      return deferred.promise;
    };
	
    Tgi.prototype.add = function (tgiData) {
      var deferred = $q.defer();
      $http
        .post(this.url, tgiData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Tgi.prototype.edit = function (tgiData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + tgiData.id, tgiData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Tgi.prototype.remove = function (tgiData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + tgiData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Tgi();
  
  });