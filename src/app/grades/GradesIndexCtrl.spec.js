describe('GradesIndexCtrl', function () {

  var Grade, ctrl, scope;

  beforeEach(module('themis.grades'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _Grade_) {
    scope = _$rootScope_.$new();
    Grade = _Grade_;
    ctrl = _$controller_('GradesIndexCtrl', {
      $scope: scope,
      Grade: Grade
    });
  }));

  describe('Initialization', function () {

    it('should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    it('should be loading by default', function () {
      expect(scope.loading).toBe(true);
    });

    it('should have Grade property initiated with Grade dependency', function () {
      expect(scope.Grade).toBe(Grade);
    });

    it('should have gradesFields property', function () {
      expect(scope.gradesFields).toEqual([
        { name: 'ID', value: 'id' },
        { name: 'Libellé', value: 'libelle' }
      ]);
    });

  });

});