describe('RanksEditCtrl', function () {

  var Rank, Corps, createController, scope, state, $httpBackend;

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

  var corpsDataFromAPI = [
    {
      id: 1,
      label: 'Gendarmerie'
    }
  ];

  var apiUrl = 'http://themisapi.herokuapp.com';

  beforeEach(module('themis.ranks'));
  beforeEach(module('themis.corps'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$state_, _$httpBackend_, _Rank_, _Corps_) {
    scope = _$rootScope_.$new();
    Rank = _Rank_;
    Corps = _Corps_;
    state = _$state_;
    $httpBackend = _$httpBackend_;

    // expect is placed here because the API is contacted at controller initialization
    $httpBackend
      .expect('GET', apiUrl + '/corps')
      .respond(corpsDataFromAPI);

    spyOn(_$state_, 'go');

    createController = function (rank) {
      return _$controller_('RanksEditCtrl', {
        $scope: scope,
        $state: state,
        Corps: Corps,
        Rank: Rank,
        rank: rank
      });
    };
  }));

  describe('Initialization', function () {

    it('should be defined', function () {
      var ctrl = createController(emptyRankMock);
      expect(ctrl).toBeDefined();
    });

    it('should have isEdit to false if plain rank is passed in as dependency', function () {
      createController(emptyRankMock);
      expect(scope.isEdit).toBe(false);
    });

    it('should have isEdit to true if empty rank is passed in as dependency', function () {
      createController(rankMock);
      expect(scope.isEdit).toBe(true);
    });

    it('should not set $scope.rank if rank is empty', function () {
      createController(emptyRankMock);
      expect(scope.rank).toBeUndefined();
    });

    it('should set $scope.rank to rank if rank is not empty', function () {
      createController(rankMock);
      expect(scope.rank).toEqual(rankMock);
    });

    it('should set $scope.corpsList when corps data are received', function () {
      createController(rankMock);
      $httpBackend.flush();

      corpsDataFromAPI[0].selected = true; // first corps of corpsDataFromAPI is the corps of rankMock

      expect(scope.corpsList).toEqual(corpsDataFromAPI);
    });

  });

  describe('When user submits the add form', function () {

    beforeEach(function () {
      createController(emptyRankMock);
      $httpBackend.flush();
    });

    it('should redirect to ranks/index when success', function () {
      $httpBackend
        .expect('POST', apiUrl + '/ranks', rankMock)
        .respond(201);

      scope.rank = rankMock;
      scope.submit();
      $httpBackend.flush();
      expect(state.go).toHaveBeenCalledWith('ranks.index');
    });

    it('should not redirect to ranks/index when failure', function () {
      $httpBackend
        .expect('POST', apiUrl + '/ranks', rankMock)
        .respond(400);

      scope.rank = rankMock;
      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

  describe('When user submits the edit form', function () {

    beforeEach(function () {
      createController(rankMock);
      $httpBackend.flush();
    });

    it('should redirect to ranks/index when success', function () {
      $httpBackend
        .expect('PUT', apiUrl + '/ranks/' + rankMock.id, rankMock)
        .respond(201);

      scope.submit();
      $httpBackend.flush();
      expect(state.go).toHaveBeenCalledWith('ranks.index');
    });

    it('should not redirect to ranks/index when failure', function () {
      $httpBackend
        .expect('PUT', apiUrl + '/ranks/' + rankMock.id, rankMock)
        .respond(400);

      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

});