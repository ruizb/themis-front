angular
  .module('themis.clerks')
  .factory('Clerk', function ($q, $http) {
  
    var Clerk = function () {
      Entity.call(this, $http, $q);
      this.url += '/clerks';
    };
    Clerk.prototype = Object.create(Entity.prototype);
	
//	Clerk.prototype.getAll = function () {
//    var deferred = $q.defer();
//
//    var clerks = [];
//    for (var i = 0; i < 20; i++) {
//      clerks.push({
//        id: i,
//        fname: "dupont",
//        lname: "jean",
//        address: "3 rue des lillas 34000 Montpellier",
//        phone: "00 11 22 33 44",
//        mobile: "06 11 22 33 44",
//        fax: "02 11 22 33 44",
//        tribunal: {
//          id: 1,
//          name: "TGI Montpellier",
//          phone: "0102030405",
//          court: {
//            id: 1,
//            label: "Cour appel Montpellier"
//          }
//        }
//      });
//    }
//    deferred.resolve(clerks);
//
//    return deferred.promise;
//    };
	
    Clerk.prototype.add = function (clerkData) {
      var deferred = $q.defer();
      $http
        .post(this.url, clerkData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Clerk.prototype.edit = function (clerkData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + clerkData.id, clerkData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Clerk.prototype.remove = function (clerkData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + clerkData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Clerk();
  
  });