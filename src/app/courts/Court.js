angular
  .module('themis.courts')
  .factory('Court',function($q, $http){
  
	var Court = function () {
      Entity.call(this, $http, $q);
      this.url = '/courts';
    };
	Court.prototype = Object.create(Entity.prototype);
	 
//	Court.prototype.getAll = function () {
//      var deferred = $q.defer();
//
//      var courts = [];
//      for (var i = 0; i < 20; i++) {
//        courts.push({
//          id: i,
//          label:"Cour d'appel de Montpellier"
//        });
//      }
//      deferred.resolve(courts);
//
//      return deferred.promise;
//    };
	
	Court.prototype.add = function (courtData) {
      var deferred = $q.defer();
      $http
        .post(this.url, courtData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	
	Court.prototype.edit = function (courtData) {
      var deferred = $q.defer();
      $http
        .put(this.url + '/' + courtData.id, courtData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

  Court.prototype.remove = function (courtData) {
    var deferred = $q.defer();
    $http
      ['delete'](this.url + '/' + courtData.id)
      .success(function (data) {
        deferred.resolve(data);
      })
      .error(function (err) {
        deferred.reject(err);
      });
    return deferred.promise;
  };
  
	return new Court();
  
  });