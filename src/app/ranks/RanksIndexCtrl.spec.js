describe('RanksIndexCtrl', function () {

  var Rank, ctrl, scope;

  beforeEach(module('themis.ranks'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _Rank_) {
    scope = _$rootScope_.$new();
    Rank = _Rank_;
    ctrl = _$controller_('RanksIndexCtrl', {
      $scope: scope,
      Rank: Rank
    });
  }));

  describe('Initialization', function () {

    it('should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    it('should be loading by default', function () {
      expect(scope.loading).toBe(true);
    });

    it('should have Rank property initiated with Grade dependency', function () {
      expect(scope.Rank).toBe(Rank);
    });

    it('should have ranksFields property', function () {
      expect(scope.ranksFields).toEqual([
        { name: 'ID', value: 'id' },
        { name: 'Libellé', value: 'label' },
        { name: 'Corps', value: 'corps.label' }
      ]);
    });

  });

});