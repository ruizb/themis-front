angular
  .module('themis.investigators')
  .factory('Investigator', function ($q, $http) {
  
    var Investigator = function () {
      Entity.call(this, $http, $q);
      this.url += '/investigators';
    };
    Investigator.prototype = Object.create(Entity.prototype);
	
	Investigator.prototype.getAll = function () {
      var deferred = $q.defer();

      var investigators = [];
      for (var i = 0; i < 20; i++) {
        investigators.push({
			id: i,
			fname:"dupont",
			lname: "jean",
			phone: "0205060907",
			mobile: "0102030405",
			fax: "0102030406",
			mail: "dupont.jean@gmail.com",
			address: {
				country: "France",
				city: "Montpellier",
				street: "16 rue de la pomme",
				zip_code: "34090"
			},
			rank: {
				id:1, 
				label: "Commissaire", 
				corps: {
					id:1, 
					label: "Corps1"
				}
			},
			business: {
				id: 1, 
				name: "Etablissement1",
				phone: "0105090603",
				address: {
					country: "France",
					city: "Toulouse",
					street: "16 rue de la poire",
					zip_code: "31000"
				},
				tribunal: {
					id: 1, 
					name: "TGI de Toulouse", 
					phone: "0206080705",
					court: {
						id: 1, 
						label: "Cours appel de Montpellier"
					}
				},
				corps: {
					id:2, 
					label: "Corps2"
				},
				departments:
				[ 
					{
						id:1,
						name: "Service1",
						corps: {
							id: 3,
							label: "corps3"
						}
					},
					{
						id:2,
						name: "Service2",
						corps: {
							id: 4,
							label: "corps4"
						}
					}
				]
			},
			department: {
				id:1,
				name: "Service1",
				corps: {
					id: 3,
					label: "corps3"
				}
			}
			
        });
      }
      deferred.resolve(investigators);

      return deferred.promise;
    };
    Investigator.prototype.add = function (investigatorData) {
      var deferred = $q.defer();
      $http
        .post(this.url,investigatorData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Investigator.prototype.edit = function (investigatorData) {
        var deferred = $q.defer();
      $http
        .put(this.url + '/' + investigatorData.id, investigatorData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    Investigator.prototype.remove = function (investigatorData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.url + '/' + investigatorData.id)// ['delete'] instead of .delete because of jshint ("delete is a reserved key word...")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    return new Investigator();
  
  });