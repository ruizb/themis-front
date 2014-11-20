describe('StatusIndexCtrl', function () {

  var state, editState, Status, q, $httpBackend, $rootScope;

  var apiUrl = 'http://themisapi.herokuapp.com';

  var statusMock = {
    id: 1,
    name: 'Juriste'
  };

  var emptyStatusMock = {
    name: ''
  };

  var params = {
    id: 1
  };

  beforeEach(module('themis.status'));

  beforeEach(inject(function (_$state_, _$rootScope_, _$httpBackend_, _Status_, _$q_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    state = _$state_;
    editState = _$state_.get('status.edit');
    Status = _Status_;
    q = _$q_;
  }));

  describe('status.edit state configuration', function () {

    it('should have resolve.status defined', function () {
      expect(editState.resolve.status).toBeDefined();
    });

    it('should have resolve.status to return a promise with id empty', function () {
      expect(typeof editState.resolve.status({}, q, Status).then).toBe('function');
    });

    it('should have resolve.status to return a promise with id not empty', function () {
      expect(typeof editState.resolve.status(params, q, Status).then).toBe('function');
    });

    it('should resolve to status if GET api/status/1 with no error', function () {
      $httpBackend
        .expect('GET', apiUrl + '/status/' + params.id)
        .respond(200, statusMock);

      var promise = editState.resolve.status(params, q, Status);
      $httpBackend.flush();

      var resolvedValue;
      promise.then(function (data) {
        resolvedValue = data;
      });
      $rootScope.$digest();

      expect(resolvedValue).toEqual(statusMock);
    });

    it('should reject if GET api/status/1 with error', function () {
      var errorMessage = 'error message when Status.get(' + params.id + ')';

      $httpBackend
        .expect('GET', apiUrl + '/status/' + params.id)
        .respond(400, errorMessage);

      var promise = editState.resolve.status(params, q, Status);
      $httpBackend.flush();

      var rejectedMessage;
      promise.then(undefined, function (err) {
        rejectedMessage = err;
      });
      $rootScope.$digest();

      expect(rejectedMessage).toEqual(errorMessage);
    });

    it('should resolve to "empty status" when id is empty', function () {
      var promise = editState.resolve.status({}, q, Status);

      var resolvedValue;
      promise.then(function (data) {
        resolvedValue = data;
      });
      $rootScope.$digest();

      expect(resolvedValue).toEqual(emptyStatusMock);
    });

  });

});