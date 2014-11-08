angular
  .module('themis.TGIs')
  .factory('TGI',function(Entity, $q, $http, Cour){
	
	Cour="Cour d'appel de Montpellier";
	
	var TGI = function () {
      Entity.call(this);
      this.url = '/TGI';
    };
	TGI.prototype = Object.create(Entity.prototype);
	 
	TGI.prototype.getAll = function () {
      var deferred = $q.defer();

      var TGIs = [];
      for (var i = 0; i < 20; i++) {
        TGIs.push({
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
      deferred.resolve(TGIs);

      return deferred.promise;
    };
	
	TGI.prototype.add = function (TGIData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, TGIData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	
	TGI.prototype.edit = function (TGIData) {
      var deferred = $q.defer();
      $http
        .put(this.urlBase + this.url + '/' + TGIData.id, TGIData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	//????
    TGI.prototype.remove = function (TGIData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.urlBase + this.url + '/' + TGIData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
  
	return new TGI();
  
  });