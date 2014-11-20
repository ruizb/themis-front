describe('StatusIndexCtrl', function () {

  var Status, ctrl, scope, $httpBackend;

  var statusDataFromAPI = [
    {
      id: 1,
      name: 'Juriste'
    }
  ];

  var apiUrl = 'http://themisapi.herokuapp.com';

  beforeEach(module('themis.status'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$httpBackend_, _Status_) {
    scope = _$rootScope_.$new();
    Status = _Status_;
    $httpBackend = _$httpBackend_;

    var windowMock = {
      confirm: function (msg) {
        return true;
      }
    };

    // expect is placed here because the API is contacted at controller initialization
    $httpBackend
      .expect('GET', apiUrl + '/status')
      .respond(statusDataFromAPI);

    ctrl = _$controller_('StatusIndexCtrl', {
      $scope: scope,
      $window: windowMock,
      Status: Status
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

  describe('When status data are received', function () {

    it('should set $scope.status to data', function () {
      expect(scope.statusList).toBeUndefined();
      $httpBackend.flush(); // send data back to client
      expect(scope.statusList).toEqual(statusDataFromAPI);
    });

    it('should set $scope.loading to false', function () {
      expect(scope.loading).toBe(true);
      $httpBackend.flush(); // send data back to client
      expect(scope.loading).toBe(false);
    });

  });

  describe('When user removes a status', function () {

    var statusToRemove = {
      id: 1,
      name: 'Juriste'
    };

    // get data from api before each assert
    beforeEach(function () {
      $httpBackend.flush();
    });

    it('should send DELETE api/status', function () {
      $httpBackend
        .expect('DELETE', apiUrl + '/status/' + statusToRemove.id)
        .respond(200);

      scope.remove(statusToRemove);
      $httpBackend.flush();
    });

    it('should update $scope.status array', function () {
      $httpBackend
        .when('DELETE', apiUrl + '/status/' + statusToRemove.id)
        .respond(200);

      scope.remove(statusToRemove);
      $httpBackend.flush(); // send HTTP 200 to client
      expect(scope.statusList.length).toBe(0);
    });

    it('should not update $scope.status if error from API', function () {
      $httpBackend
        .expect('DELETE', apiUrl + '/status/' + statusToRemove.id)
        .respond(400, 'error message scope.remove()');

      scope.remove(statusToRemove);
      $httpBackend.flush();
      expect(scope.statusList.length).toBe(1);
    });

  });

});