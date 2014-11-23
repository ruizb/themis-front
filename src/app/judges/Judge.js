angular
  .module('themis.judges')
  .factory('Judge', function ($q, $http) {
  
    var Judge = function () {
      Entity.call(this, $http, $q);
      this.url += '/judges';
    };
    Judge.prototype = Object.create(Entity.prototype);
	
    // TODO tmp
   /* Judge.prototype.getAll = function () {
      var deferred = $q.defer();
      var judges = [];
      for (var i = 0; i < 3; i++) {
        judges.push({
          id: 1,
          fname: 'Boby',
          lname: 'Modnar',
          address: {
            country: 'France',
            city: 'Montpellier',
            street: '123 Avenue de la France',
            zip_code: '34000'
          },
          phone: '0011223344',
          fax: '0011223345',
          status: {
            id: 1,
            name: 'Magistrat'
          },
          tribunal: {
            id: 1,
            name: "TGI de Montpellier",
            court: {}
          },
          clerk: {
            id: 1,
            fname: 'Bob',
            lname: 'Michou',
            address: {
              country: 'France',
              city: 'Montpellier',
              street: '123 Avenue de la France',
              zip_code: '34000'
            },
            phone: '0011223351',
            fax: '0011223352',
            tribunal: {
              id: 1,
              name: 'TGI de Montpellier',
              phone: '0011223371',
              court: {
                id: 1,
                label: 'Cours d\'Appel de Montpellier'
              }
            }
          }
        });
      }
      deferred.resolve(judges);
      return deferred.promise;
    };
*/
    Judge.prototype.add = function (judgeData) {
      var deferred = $q.defer();
      $http
        .post(this.url, judgeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Judge.prototype.edit = function (judgeData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + judgeData.id, judgeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Judge.prototype.remove = function (judgeData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + judgeData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Judge();
  
  });