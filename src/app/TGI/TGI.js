angular
  .module('themis.tgis')
  .factory('Tgi',function(Entity, $q, $http, Cour){
	
	Cour="Cour d'appel de Montpellier";
	
	var Tgi = function () {
      Entity.call(this);
      this.url = '/tgis';
    };
	Tgi.prototype = Object.create(Entity.prototype);
	 
	Tgi.prototype.getAll = function () {
      var deferred = $q.defer();

      var tgis = [];
      for (var i = 0; i < 20; i++) {
        tgis.push({
        id: i,
		name:'TGI de Montpellier',
		phone: '0011223344',
		cours: //ou courts?
			{
			id: 1,
			libelle: 'Cours d\'Appel de Montpellier'
			}
          
        });
      }
      deferred.resolve(tgis);

      return deferred.promise;
    };
	
	Tgi.prototype.add = function (tgiData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, tgiData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	
	Tgi.prototype.edit = function (TGIData) {
      var deferred = $q.defer();
      $http
        .put(this.urlBase + this.url + '/' + tgiData.id, tgiData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	//????
    TGI.prototype.remove = function (tgiData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.urlBase + this.url + '/' + tgiData.id)
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