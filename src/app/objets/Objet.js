angular
  .module('themis.objets')
  .factory('Objet', function (Entity, $q, $http) {
  
    var Objet = function () {
      Entity.call(this);
      this.url += '/objets';
    };
    Objet.prototype = Object.create(Entity.prototype);

	Objet.prototype.getAll = function () {
      var deferred = $q.defer();

      var objets = [];
      for (var i = 0; i < 20; i++) {
        objets.push({
          id: i,
          libelle:"PC portable"
        });
      }
      deferred.resolve(cours);

      return deferred.promise;
    };
	
    Objet.prototype.add = function (objetData) {
      var deferred = $q.defer();
      $http
        .post(this.url, objetData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Objet.prototype.edit = function (objetData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + objetData.id, objetData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Objet.prototype.remove = function (objetData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + objetData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Objet();
  
  });