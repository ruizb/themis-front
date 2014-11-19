angular
  .module('themis.items')
  .factory('Item', function ($q, $http) {
  
    var Item = function () {
      Entity.call(this, $http, $q);
      this.url += '/items';
    };
    Item.prototype = Object.create(Entity.prototype);

//	Item.prototype.getAll = function () {
//      var deferred = $q.defer();
//
//      var items = [];
//      for (var i = 0; i < 20; i++) {
//        items.push({
//          id: i,
//          label:"PC portable"
//        });
//      }
//      deferred.resolve(items);
//
//      return deferred.promise;
//    };
	
    Item.prototype.add = function (itemData) {
      var deferred = $q.defer();
      $http
        .post(this.url, itemData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Item.prototype.edit = function (itemData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + itemData.id, itemData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Item.prototype.remove = function (itemData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + itemData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Item();
  
  });