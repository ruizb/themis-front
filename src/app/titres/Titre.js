angular
  .module('themis.titres')
  .factory('Titre', function (Entity, $q, $http) {
  
    var Titre = function () {
      Entity.call(this);
      this.url += '/titres';
    };
    Titre.prototype = Object.create(Entity.prototype);
	
	// TODO tmp
	Titre.prototype.getAll = function () {
		var deferred = $q.defer();

		var titres = [];
		for (var i = 0; i < 3; i++) {
			titres.push({
				id: i,
				name: "Magistrat"
			});
		}
		deferred.resolve(titres);
	return deferred.promise;
	};

    Titre.prototype.add = function (titreData) {
      var deferred = $q.defer();
      $http
        .post(this.url, titreData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Titre.prototype.edit = function (titreData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + titreData.id, titreData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Titre.prototype.remove = function (titreData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + titreData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Titre();
  
  });