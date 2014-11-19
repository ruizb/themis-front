angular
  .module('themis.missions')
  .factory('Mission', function ($q, $http) {
  
    var Mission = function () {
      Entity.call(this, $http, $q);
      this.url += '/missions';
    };
    Mission.prototype = Object.create(Entity.prototype);
	
//	Mission.prototype.getAll = function () {
//    var deferred = this.$q.defer();
//
//    var missions = [];
//    for (var i = 0; i < 50; i++) {
//      missions.push({
//        id: i,
//        label: "Chat"
//      });
//    }
//    deferred.resolve(missions);
//
//    return deferred.promise;
//  };

    Mission.prototype.add = function (missionData) {
      var deferred = $q.defer();
      $http
        .post(this.url, missionData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Mission.prototype.edit = function (missionData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + missionData.id, missionData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Mission.prototype.remove = function (missionData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + missionData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Mission();
  
  });