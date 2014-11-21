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
    },
    {
      id: 2,
      label: 'Police'
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

    spyOn(_$state_, 'go');

    scope.addAlert = function () {}; // mock the addAlert method inherited from AppCtrl scope

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

    describe('With HTTP 200 from Corps.getAll', function () {

      beforeEach(function () {
        $httpBackend
          .expect('GET', apiUrl + '/corps')
          .respond(200, corpsDataFromAPI);
      });

      it('should have isEdit to false if plain rank is passed in as dependency', function () {
        createController(emptyRankMock);
        expect(scope.isEdit).toBe(false);
      });

      it('should have isEdit to true if empty rank is passed in as dependency', function () {
        createController(rankMock);
        expect(scope.isEdit).toBe(true);
      });

      it('should set $scope.rank to rank if rank is not empty', function () {
        createController(rankMock);
        expect(scope.rank).toEqual(rankMock);
      });

      it('should set $scope.corpsList when corps data are received', function () {
        createController(rankMock);
        $httpBackend.flush();

        corpsDataFromAPI[0].selected = true; // first corps of corpsDataFromAPI is the corps of rankMock
        corpsDataFromAPI[1].selected = false;

        expect(scope.corpsList).toEqual(corpsDataFromAPI);
      });

    });

    describe('With HTTP 400 from Corps.getAll', function () {

      beforeEach(function () {
        $httpBackend
          .expect('GET', apiUrl + '/corps')
          .respond(400, 'error message Corps.getAll');
      });

      it('should not set $scope.corpsList if error when corps data are received', function () {
        createController(rankMock);
        $httpBackend.flush();

        corpsDataFromAPI[0].selected = true; // first corps of corpsDataFromAPI is the corps of rankMock
        corpsDataFromAPI[1].selected = false;

        expect(scope.corpsList).toBeUndefined();
      });

    });

  });

  describe('When user submits the add form', function () {

    beforeEach(function () {
      $httpBackend
        .expect('GET', apiUrl + '/corps')
        .respond(200, corpsDataFromAPI);

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
        .respond(400, 'error message from scope.submit() ADD case');

      scope.rank = rankMock;
      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

  describe('When user submits the edit form', function () {

    beforeEach(function () {
      $httpBackend
        .expect('GET', apiUrl + '/corps')
        .respond(200, corpsDataFromAPI);

      corpsDataFromAPI[0].selected = true; // first corps of corpsDataFromAPI is the corps of rankMock
      corpsDataFromAPI[1].selected = false;

      createController(rankMock);
      $httpBackend.flush();
    });

    it('should update $scope.rank.corps when selecting new corps', function () {
      scope.rank.corps.id = scope.corpsList[1].id; // simulate select on the second Corps
      scope.updateRanksCorps(); // triggered when user selects another Corps
      expect(scope.rank.corps).toEqual(scope.corpsList[1]);
      expect(scope.corpsList[0].selected).toBe(false);
      expect(scope.corpsList[1].selected).toBe(true);
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
        .respond(400, 'error message scope.submit() EDIT case');

      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

});