angular
  .module('themis.procureurs')
  .factory('Procureur', function (Entity, $q, $http) {

    var Procureur = function () {
      Entity.call(this);
      this.url = '/procureur';
    };
    Procureur.prototype = Object.create(Entity.prototype);

    // TODO tmp
    Procureur.prototype.getAll = function () {
      var deferred = $q.defer();

      var procureurs = [];
      for (var i = 0; i < 50; i++) {
        procureurs.push({
			id: i,
			firstname: "Boby",
			lastname: "Modnar",
			status:{
				id: i,
				name: "Mega Procureur"
			},
			tgi:{
				id: i, 
				name: "TGI de Montpellier",
				phone: "01586987548",
				courAppel: {
					id : i,
					name: "Cour appel de Montpellier"
				}
			}
		});
      }
      deferred.resolve(procureurs);

      return deferred.promise;
    };

    Procureur.prototype.add = function (procureurData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, procureurData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Procureur.prototype.edit = function (procureurData) {
      var deferred = $q.defer();
      $http
        .put(this.urlBase + this.url + '/' + procureurData.id, procureurData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Procureur.prototype.remove = function (procureurData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.urlBase + this.url + '/' + procureurData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Procureur();

  });