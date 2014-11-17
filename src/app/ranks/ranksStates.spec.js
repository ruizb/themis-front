describe('RanksIndexCtrl', function () {

  var state, editState, Rank, q, $httpBackend, $rootScope;

  var apiUrl = 'http://themisapi.herokuapp.com';

  var rankMock = {
    id: 1,
    label: 'General',
    corps: {
      id: 1,
      label: 'Gendarmerie'
    }
  };

  var emptyRankMock = {
    label: '',
    corps: {}
  };

  var params = {
    id: 1
  };

  beforeEach(module('themis.ranks'));

  beforeEach(inject(function (_$state_, _$rootScope_, _$httpBackend_, _Rank_, _$q_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    state = _$state_;
    editState = _$state_.get('ranks.edit');
    Rank = _Rank_;
    q = _$q_;
  }));

  describe('ranks.edit state configuration', function () {

    it('should have resolve.rank defined', function () {
      expect(editState.resolve.rank).toBeDefined();
    });

    it('should have resolve.rank to return a promise with id empty', function () {
      expect(typeof editState.resolve.rank({}, q, Rank).then).toBe('function');
    });

    it('should have resolve.rank to return a promise with id not empty', function () {
      expect(typeof editState.resolve.rank(params, q, Rank).then).toBe('function');
    });

    it('should resolve to rank if GET api/ranks/1 with no error', function () {
      $httpBackend
        .expect('GET', apiUrl + '/ranks/' + params.id)
        .respond(200, rankMock);

      var promise = editState.resolve.rank(params, q, Rank);
      $httpBackend.flush();

      var resolvedValue;
      promise.then(function (data) {
        resolvedValue = data;
      });
      $rootScope.$digest();

      expect(resolvedValue).toEqual(rankMock);
    });

    it('should reject if GET api/ranks/1 with error', function () {
      var errorMessage = 'error message when Rank.get(' + params.id + ')';

      $httpBackend
        .expect('GET', apiUrl + '/ranks/' + params.id)
        .respond(400, errorMessage);

      var promise = editState.resolve.rank(params, q, Rank);
      $httpBackend.flush();

      var rejectedMessage;
      promise.then(undefined, function (err) {
        rejectedMessage = err;
      });
      $rootScope.$digest();

      expect(rejectedMessage).toEqual(errorMessage);
    });

    it('should resolve to "empty rank" when id is empty', function () {
      var promise = editState.resolve.rank({}, q, Rank);

      var resolvedValue;
      promise.then(function (data) {
        resolvedValue = data;
      });
      $rootScope.$digest();

      expect(resolvedValue).toEqual(emptyRankMock);
    });

  });

});