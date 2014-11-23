angular
  .module('themis.itemMissions')
  .factory('ItemMission', function ($q, $http) {

    var ItemMission = function () {
      Entity.call(this, $http, $q);
      this.url += '/operations';
    };
    ItemMission.prototype = Object.create(Entity.prototype);

   /* ItemMission.prototype.getAll = function () {
      var deferred = $q.defer();

      var itemMissions = [];
      for (var i = 0; i < 20; i++) {
        itemMissions.push({
          id: i,
          label: "Recherche de contacts",
          item: {
            id: 1,
            label: "Item1"
          },
          mission: {
            id: 5,
            label: "mission1"
          },
          price: "230"
        });
      }
      deferred.resolve(itemMissions);

      return deferred.promise;
    };*/

    ItemMission.prototype.add = function (itemMissionData) {
      var deferred = $q.defer();
      $http
        .post(this.url, itemMissionData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    ItemMission.prototype.edit = function (itemMissionData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + itemMissionData.id, itemMissionData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    ItemMission.prototype.remove = function (itemMissionData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + itemMissionData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new ItemMission();
  
  });