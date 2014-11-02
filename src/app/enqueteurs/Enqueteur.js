angular
  .module('themis.enqueteurs')
  .factory('Enqueteur', function (Entity, $q, $http) {

    var Enqueteur = function () {
      Entity.call(this);
      this.url = '/enqueteur';
    };
    Enqueteur.prototype = Object.create(Entity.prototype);

    // TODO tmp
    Enqueteur.prototype.getAll = function () {
      var deferred = $q.defer();

      var enqueteurs = [];
      for (var i = 0; i < 50; i++) {
        enqueteurs.push({
          id: i,
          firstname: "Boby",
          lastname: "Modnar",
          phone: "00 11 22 33 44",
          email: "leboby34@hotmail.fr"
        });
      }
      deferred.resolve(enqueteurs);

      return deferred.promise;
    };

    Enqueteur.prototype.add = function (enqueteurData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, enqueteurData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Enqueteur.prototype.edit = function (enqueteurData) {
      var deferred = $q.defer();
      $http
        .put(this.urlBase + this.url + '/' + enqueteurData.id, enqueteurData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
    Enqueteur.prototype.edit = function (enqueteurData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.urlBase + this.url + '/' + enqueteurData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Enqueteur();

  });