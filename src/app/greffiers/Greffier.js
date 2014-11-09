angular
  .module('themis.greffiers')
  .factory('Greffier', function (Entity, $q, $http) {

    var Greffier = function () {
      Entity.call(this);
      this.url = '/greffier';
    };
    Greffier.prototype = Object.create(Entity.prototype);

    // TODO tmp
    Greffier.prototype.getAll = function () {
      var deferred = $q.defer();

      var greffiers = [];
      for (var i = 0; i < 50; i++) {
        greffiers.push({
        id: i,
        firstname: "Bob",
        lastname: "greffier",
		adress: "3 rue des lillas 34000 Montpellier",
        phone: "00 11 22 33 44",
		mobile: "06 11 22 33 44",
        fax: "02 11 22 33 44",
			TGIs :{
			id :1,
			name : 'TGI de Montpellier',
			phone : '0011223344'
			}
		});
		}
      deferred.resolve(greffiers);

      return deferred.promise;
    };

    Greffier.prototype.add = function (greffierData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, greffierData)
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
        .put(this.urlBase + this.url + '/' + greffierData.id, greffierData)
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
        ['delete'](this.urlBase + this.url + '/' + greffierData.id)
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