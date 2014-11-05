angular
  .module('themis.grades')
  .factory('Grade',function(Entity, $q, $http){
  
	var Grade = function () {
      Entity.call(this);
      this.url = '/grade';
    };
	Grade.prototype = Object.create(Entity.prototype);
	 
	Grade.prototype.getAll = function () {
      var deferred = $q.defer();

      var grades = [];
      for (var i = 0; i < 50; i++) {
        grades.push({
          id: i,
          name:"Commissaire"
        });
      }
      deferred.resolve(grades);

      return deferred.promise;
    };
	
	Grade.prototype.add = function (gradeData) {
      var deferred = $q.defer();
      $http
        .post(this.urlBase + this.url, gradeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	
	Grade.prototype.edit = function (gradeData) {
      var deferred = $q.defer();
      $http
        .put(this.urlBase + this.url + '/' + gradeData.id, gradeData)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
	//????
    Grade.prototype.remove = function (gradeData) {
      var deferred = $q.defer();
      $http
        ['delete'](this.urlBase + this.url + '/' + gradeData.id)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
  
	return new Grade();
  
  });