angular
  .module('themis')
  .directive('entityIndex', function ($state) {
    return {
      restrict: 'E',
      scope: {
        entityManager: '=',
        fields: '=',
        entities: '=',
        statesNamespace: '@',
        loading: '='
      },
      templateUrl: 'common/entityIndex/entityIndexDirective.tpl.html',
      link: function (scope, element, attrs) {

        scope.remove = function (entity) {
          scope.entityManager
            .remove(entity)
            .then(function (data) {
              // remove element from DOM
              scope.entities.splice(scope.entities.indexOf(entity), 1);
            }, function (err) {
              console.log(err);
            });
        };

      }
    };
  });