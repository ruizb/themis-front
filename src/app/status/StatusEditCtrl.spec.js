describe('StatusEditCtrl', function () {

  var Status, createController, scope, state, $httpBackend;

  var statusMock = {
    id: 1,
    name: 'Juriste'
  };

  var emptyStatusMock = {
    name: ''
  };

  var apiUrl = 'http://themisapi.herokuapp.com';

  beforeEach(module('themis.status'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$state_, _$httpBackend_, _Status_) {
    scope = _$rootScope_.$new();
    Status = _Status_;
    state = _$state_;
    $httpBackend = _$httpBackend_;

    spyOn(_$state_, 'go');

    scope.addAlert = function () {}; // mock the addAlert method inherited from AppCtrl scope

    createController = function (status) {
      return _$controller_('StatusEditCtrl', {
        $scope: scope,
        $state: state,
        Status: Status,
        status: status
      });
    };
  }));

  describe('Initialization', function () {

    it('should be defined', function () {
      var ctrl = createController(emptyStatusMock);
      expect(ctrl).toBeDefined();
    });
	
	it('should have isEdit to false if plain status is passed in as dependency', function () {
		createController(emptyStatusMock);
		expect(scope.isEdit).toBe(false);
    });

      it('should have isEdit to true if empty status is passed in as dependency', function () {
        createController(statusMock);
        expect(scope.isEdit).toBe(true);
      });

      it('should set $scope.status to status if status is not empty', function () {
        createController(statusMock);
        expect(scope.status).toEqual(statusMock);
      });


  });

  describe('When user submits the add form', function () {

    beforeEach(function () {
	createController(emptyStatusMock);
    });

    it('should redirect to status/index when success', function () {
      $httpBackend
        .expect('POST', apiUrl + '/status', statusMock)
        .respond(201);

      scope.status = statusMock;
      scope.submit();
      $httpBackend.flush();
      expect(state.go).toHaveBeenCalledWith('status.index');
    });

	it('should not redirect to status/index when failure', function () {
     $httpBackend
        .expect('POST', apiUrl + '/status', statusMock)
        .respond(400, 'error message from scope.submit() ADD case');

      scope.status = statusMock;
      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

  describe('When user submits the edit form', function () {

    beforeEach(function () {
	createController(statusMock);
    });

    it('should redirect to status/index when success', function () {
      $httpBackend
        .expect('PUT', apiUrl + '/status/' + statusMock.id, statusMock)
        .respond(200);

      scope.submit();
      $httpBackend.flush();
      expect(state.go).toHaveBeenCalledWith('status.index');
    });

    it('should not redirect to status/index when failure', function () {
      $httpBackend
        .expect('PUT', apiUrl + '/status/' + statusMock.id, statusMock)
        .respond(400, 'error message scope.submit() EDIT case');

      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

});