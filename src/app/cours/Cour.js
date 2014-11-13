angular
  .module('themis.cours')
  .factory('Cour',function(Entity, $q, $http){
  
	var Cour = function () {
      Entity.call(this);
      this.url = '/cours';
    };
	Cour.prototype = Object.create(Entity.prototype);
	 
	Cour.prototype.getAll = function () {
      var deferred = $q.defer();

      var cours = [];
      for (var i = 0; i < 20; i++) {
        cours.push({
          id: i,
          libelle:"Cour d'appel de Montpellier"
        });
      }
      deferred.resolve(cours);

      return deferred.promise;
    };
	
	Cour.prototype.add = function (courData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, courData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	
	Cour.prototype.edit = function (courData) {
      var deferred = $q.defer();
      $http
        .put(this.urlBase + this.url + '/' + courData.id, courData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	//????
    Cour.prototype.remove = function (courData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.urlBase + this.url + '/' + courData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
  
	return new Cour();
  
  });