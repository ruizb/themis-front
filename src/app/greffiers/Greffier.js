angular
  .module('themis.greffiers')
  .factory('Greffier', function (Entity, $q, $http) {
  
    var Greffier = function () {
      Entity.call(this);
      this.url += '/greffiers';
    };
    Greffier.prototype = Object.create(Entity.prototype);
	
	Greffier.prototype.getAll = function () {
      var deferred = $q.defer();

      var greffiers = [];
      for (var i = 0; i < 20; i++) {
        greffiers.push({
		id: i,
		firstname:"dupont",
		lastname: "jean",
		adress: "3 rue des lillas 34000 Montpellier",
		phone: "00 11 22 33 44",
		mobile: "06 11 22 33 44",
		fax: "02 11 22 33 44"
        });
      }
      deferred.resolve(greffiers);

      return deferred.promise;
    };
	
    Greffier.prototype.add = function (greffierData) {
      var deferred = $q.defer();
      $http
        .post(this.url, greffierData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Greffier.prototype.edit = function (greffierData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + greffierData.id, greffierData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Greffier.prototype.remove = function (greffierData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + greffierData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Greffier();
  
  });