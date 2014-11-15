describe('RanksIndexCtrl', function () {

  var Rank, ctrl, scope, $httpBackend;

  var ranksDataFromAPI = [
    {
      id: 1,
      label: 'General',
      corps: {
        id: 1,
        label: 'Gendarmerie'
      }
    }
  ];

  var apiUrl = 'http://themisapi.herokuapp.com';

  beforeEach(module('themis.ranks'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$httpBackend_, _Rank_) {
    scope = _$rootScope_.$new();
    Rank = _Rank_;
    $httpBackend = _$httpBackend_;

    var windowMock = {
      confirm: function (msg) {
        return true;
      }
    };

    // expect is placed here because the API is contacted at controller initialization
    $httpBackend
      .expect('GET', apiUrl + '/ranks')
      .respond(ranksDataFromAPI);

    ctrl = _$controller_('RanksIndexCtrl', {
      $scope: scope,
      $window: windowMock,
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

  });

  describe('When rank data are received', function () {

    it('should set $scope.ranks to data', function () {
      expect(scope.ranks).toBeUndefined();
      $httpBackend.flush(); // send data back to client
      expect(scope.ranks).toEqual(ranksDataFromAPI);
    });

    it('should set $scope.loading to false', function () {
      expect(scope.loading).toBe(true);
      $httpBackend.flush(); // send data back to client
      expect(scope.loading).toBe(false);
    });

  });

  describe('When user removes a rank', function () {

    var rankToRemove = {
      id: 1,
      label: 'General',
      corps: {
        id: 1,
        label: 'Gendarmerie'
      }
    };

    // get data from api before each assert
    beforeEach(function () {
      $httpBackend.flush();
    });

    it('should send DELETE api/ranks', function () {
      $httpBackend
        .expect('DELETE', apiUrl + '/ranks/' + rankToRemove.id)
        .respond(200);

      scope.remove(rankToRemove);
      $httpBackend.flush();
    });

    it('should update $scope.ranks array', function () {
      $httpBackend
        .when('DELETE', apiUrl + '/ranks/' + rankToRemove.id)
        .respond(200);

      scope.remove(rankToRemove);
      $httpBackend.flush(); // send HTTP 200 to client
      expect(scope.ranks.length).toBe(0);
    });

    it('should not update $scope.ranks if error from API', function () {
      $httpBackend
        .expect('DELETE', apiUrl + '/ranks/' + rankToRemove.id)
        .respond(400, 'error message scope.remove()');

      scope.remove(rankToRemove);
      $httpBackend.flush();
      expect(scope.ranks.length).toBe(1);
    });

  });

});