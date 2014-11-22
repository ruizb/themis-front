angular
  .module('themis.business')
  .factory('Business', function ($q, $http) {

    var Business = function () {
      Entity.call(this, $http, $q);
      this.url += '/business';
    };
    Business.prototype = Object.create(Entity.prototype);
	
    Business.prototype.getAll = function () {
      var deferred = $q.defer();
      var business = [];
      for (var i = 0; i < 5; i++) {
        business.push({
          id: i,
          name: 'Commissariat de Montpellier',
          phone: '0467000102',
          address: {
            country: 'France',
            city: 'Montpellier',
            street: 'Place de la Comedie',
            zip_code: '34000'
          },
          tribunal: {
            id: 1,
            name: 'TGI de Montpellier',
            phone: '0467053159',
            court: {
              id: 1,
              label: 'Cour d\'appel de Montpellier'
            }
          },
          corps: {
            id: 1,
            label: 'Police'
          },
          departments: [
            {
              id: 1,
              name: 'BAC',
              corps: {
                id: 1,
                label: 'Police'
              }
            },
            {
              id: 2,
              name: 'BAC 2',
              corps: {
                id: 1,
                label: 'Police'
              }
            }
          ]
        });
      }
      deferred.resolve(business);
      return deferred.promise;
    };

    Business.prototype.add = function (businessData) {
      var deferred = $q.defer();
      $http
        .post(this.url, businessData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Business.prototype.edit = function (businessData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + businessData.id, businessData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Business.prototype.remove = function (businessData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + businessData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Business();
  
  });