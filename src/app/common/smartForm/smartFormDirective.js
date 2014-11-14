angular
  .module('themis')
  .directive('smartForm', function ($state, Grade) { // !!! TODO Grade
    return {
      restrict: 'E',
      scope: {
        entity: '=',
        isEdit: '='
      },
      templateUrl: 'common/smartForm/smartFormDirective.tpl.html',
      link: function (scope, element, attrs) {

        var schema = Grade.schema;
        var fields = Object.keys(schema);

        var setupFormField = function (field, index) {
          var fieldValue = scope.isEdit ? scope.entity[field] : '';
          var readonly = field === 'id' ? 'readonly' : '';
          if (field === 'id') {
            if (scope.isEdit) {
              // TODO not flexible!!
              element.prepend('<div class="form-group"><div class="col-md-6 col-md-offset-3"><label for="'+field+'">'+schema[field].label+'</label><input '+readonly+' type="text" class="form-control" name="'+field+'" value="'+fieldValue+'"></div></div>');
            }
          }
          else {
            element.prepend('<div class="form-group"><div class="col-md-6 col-md-offset-3"><label for="'+field+'">'+schema[field].label+'</label><input '+readonly+' type="text" class="form-control" name="'+field+'" value="'+fieldValue+'"></div></div>');
          }
        };

        fields.forEach(setupFormField);

        scope.submit = function () {
          alert('ENVOYE (ou pas...)');
        };

      }
    };
  });