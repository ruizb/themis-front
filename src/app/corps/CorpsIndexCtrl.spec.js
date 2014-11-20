describe('CorpsIndexCtrl', function () {

  var Corps, ctrl, scope, $httpBackend;

  var corpsDataFromAPI = [
    {
      id: 1,
      label: 'Gendarmerie'
    }
  ];

  var apiUrl = 'http://themisapi.herokuapp.com';

  beforeEach(module('themis.corps'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$httpBackend_, _Corps_) {
    scope = _$rootScope_.$new();
    Corps = _Corps_;
    $httpBackend = _$httpBackend_;

    var windowMock = {
      confirm: function (msg) {
        return true;
      }
    };

    // expect is placed here because the API is contacted at controller initialization
    $httpBackend
      .expect('GET', apiUrl + '/corps')
      .respond(corpsDataFromAPI);

    ctrl = _$controller_('CorpsIndexCtrl', {
      $scope: scope,
      $window: windowMock,
      Corps: Corps
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

  describe('When corps data are received', function () {

    it('should set $scope.corps to data', function () {
      expect(scope.corps).toBeUndefined();
      $httpBackend.flush(); // send data back to client
      expect(scope.corps).toEqual(corpsDataFromAPI);
    });

    it('should set $scope.loading to false', function () {
      expect(scope.loading).toBe(true);
      $httpBackend.flush(); // send data back to client
      expect(scope.loading).toBe(false);
    });

  });

  describe('When user removes a corps', function () {

    var corpsToRemove = {
      id: 1,
      label: 'Gendarmerie'
    };

    // get data from api before each assert
    beforeEach(function () {
      $httpBackend.flush();
    });

    it('should send DELETE api/corps', function () {
      $httpBackend
        .expect('DELETE', apiUrl + '/corps/' + corpsToRemove.id)
        .respond(200);

      scope.remove(corpsToRemove);
      $httpBackend.flush();
    });

    it('should update $scope.corps array', function () {
      $httpBackend
        .when('DELETE', apiUrl + '/corps/' + corpsToRemove.id)
        .respond(200);

      scope.remove(corpsToRemove);
      $httpBackend.flush(); // send HTTP 200 to client
      expect(scope.corps.length).toBe(0);
    });

    it('should not update $scope.corps if error from API', function () {
      $httpBackend
        .expect('DELETE', apiUrl + '/corps/' + corpsToRemove.id)
        .respond(400, 'error message scope.remove()');

      scope.remove(corpsToRemove);
      $httpBackend.flush();
      expect(scope.corps.length).toBe(1);
    });

  });

});