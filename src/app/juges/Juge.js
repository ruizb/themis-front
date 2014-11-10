angular
  .module('themis.juges')
  .factory('Juge', function (Entity, $q, $http) {
  
    var Juge = function () {
      Entity.call(this);
      this.url += '/juges';
    };
    Juge.prototype = Object.create(Entity.prototype);
	
	// TODO tmp
	Juge.prototype.getAll = function () {
		var deferred = $q.defer();
		var juges = [];
		for (var i = 0; i < 3; i++) {
			juges.push({
				id: 1,
				fname: 'Boby',
				name: 'Modnar',
				address: {
					country: 'France',
					city: 'Montpellier',
					street: '123 Avenue de la France',
					zip_code: '34000'
				},
				phone: '0011223344',
				fax: '0011223344',
				status: {
					id: 1,
					name: 'Magistrat'
				},
				tgi: {
					id: 1,
					name: 'TGI de Montpellier',
					phone: '0011223344',
					court: {
						id: 1,
						name: 'Cours d\'Appel de Montpellier'
					}
				},
				greffier: {
					id: 1,
					fname: 'Boby',
					name: 'Modnar',
					address: {
						country: 'France',
						city: 'Montpellier',
						street: '123 Avenue de la France',
						zip_code: '34000'
					},
					phone: '0011223344',
					fax: '0011223344',
					tgi: {
						id: 1,
						name: 'TGI de Montpellier',
						phone: '0011223344',
						court: {
							id: 1,
							name: 'Cours d\'Appel de Montpellier'
						}
					}
				}
			});
		}
		deferred.resolve(juges);
		return deferred.promise;
	};

    Juge.prototype.add = function (jugeData) {
      var deferred = $q.defer();
      $http
        .post(this.url, jugeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Juge.prototype.edit = function (jugeData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + jugeData.id, jugeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Juge.prototype.remove = function (jugeData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + jugeData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Juge();
  
  });