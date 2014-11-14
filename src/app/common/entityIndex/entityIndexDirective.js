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

        scope.entitiesValues = [];
        scope.$watch('loading', function(newValue, oldValue) {
          if (!newValue) { // data (scope.entities) is done loading
            _.forEach(scope.entities, function (entity) {
              var entityValues = []; // values of id, label, etc. of the current entity
              _.forEach(scope.fields, function (field, index) { // for each field -> find the value (for example corps.name -> entity.corps.name)
                var key = field.value,
                    path = key.split('.'),
                    currentValue = entity[path[0]],
                    i = 1;

                while (i < path.length && _.isObject(currentValue)) {
                  currentValue = currentValue[path[i]];
                  i++;
                }

                var fieldValue = 'N/A';
                if (_.isString(currentValue) || _.isNumber(currentValue) || _.isBoolean(currentValue) || _.isArray(currentValue)) {
                  fieldValue = currentValue;
                }
//                else {
//                  throw new Error('The value for the field ' + key + ' was not found for entity ' + entity.id);
//                }

                entityValues.push(fieldValue);
              });

              scope.entitiesValues.push(entityValues);
            });
          }
        });

        scope.remove = function (entity) {
          if (confirm('Etes-vous sûr de vouloir supprimer cet élément ?')) {
            scope.entityManager
              .remove(entity)
              .then(function (data) {
                // remove element from DOM
                scope.entities.splice(scope.entities.indexOf(entity), 1);
              }, function (err) {
                console.log(err);
              });
          }

        };

      }
    };
  });