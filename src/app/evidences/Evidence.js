angular
  .module('themis.evidences')
  .factory('Evidence', function ($q, $http) {

    var Evidence = function () {
      Entity.call(this, $http, $q);
      this.url += '/evidences';
    };
    Evidence.prototype = Object.create(Entity.prototype);

//    Evidence.prototype.getAll = function () {
//      var deferred = $q.defer();
//
//      var evidences = [];
//      for (var i = 0; i < 20; i++) {
//        evidences.push({
//          id: i,
//          label: "telephone",
//          num: "2355",
//          numPV: "345",
//          itemMissions: [{
//            id: 4,
//            item: {
//              id: 1,
//              label: "Samsung Galaxy S42"
//            },
//            mission: {
//              id: 1,
//              label: "Recherche de contact"
//            }
//          }]
//        });
//      }
//      deferred.resolve(evidences);
//
//      return deferred.promise;
//    };

    Evidence.prototype.add = function (evidenceData) {
      var deferred = $q.defer();
      $http
        .post(this.url, evidenceData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Evidence.prototype.edit = function (evidenceData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + evidenceData.id, evidenceData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Evidence.prototype.remove = function (evidenceData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + evidenceData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Evidence();
  
  });