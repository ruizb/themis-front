angular
  .module('themis.prosecutors')
  .factory('Prosecutor', function ($q, $http) {

    var Prosecutor = function () {
      Entity.call(this, $http, $q);
      this.url += '/prosecutors';
    };
    Prosecutor.prototype = Object.create(Entity.prototype);

    // TODO tmp
    Prosecutor.prototype.getAll = function () {
      var deferred = $q.defer();

      var prosecutors = [];
      for (var i = 0; i < 50; i++) {
        prosecutors.push({
			id: i,
			fname: "Boby",
			lname: "Modnar",
			status:{
				id: i,
				name: "Mega Procureur"
			},
			tribunal:{
				id: i, 
				name: "TGI de Montpellier",
				phone: "01586987548",
				court: {
					id : i,
					label: "Cour appel de Montpellier"
				}
			}
		});
      }
      deferred.resolve(prosecutors);

      return deferred.promise;
    };

    Prosecutor.prototype.add = function (prosecutorData) {
      var deferred = $q.defer();
      $http
        .post(this.url, prosecutorData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Prosecutor.prototype.edit = function (prosecutorData) {
      var deferred = $q.defer();
      $http
        .put(this.url + '/' + prosecutorData.id, prosecutorData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Prosecutor.prototype.remove = function (prosecutorData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + prosecutorData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Prosecutor();

  });