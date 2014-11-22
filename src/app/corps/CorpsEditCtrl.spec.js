describe('CorpsEditCtrl', function () {

  var Corps, createController, scope, state, $httpBackend;

  var corpsMock = {
    id: 1,
    label: 'Gendarmerie'
  };

  var emptyCorpsMock = {
    label: ''
  };

  var apiUrl = 'http://themisapi.herokuapp.com';

  beforeEach(module('themis.corps'));

  beforeEach(inject(function (_$rootScope_, _$controller_, _$state_, _$httpBackend_, _Corps_) {
    scope = _$rootScope_.$new();
    Corps = _Corps_;
    state = _$state_;
    $httpBackend = _$httpBackend_;

    spyOn(_$state_, 'go');

    scope.addAlert = function () {}; // mock the addAlert method inherited from AppCtrl scope

    createController = function (corps) {
      return _$controller_('CorpsEditCtrl', {
        $scope: scope,
        $state: state,
        Corps: Corps,
        corps: corps
      });
    };
  }));

  describe('Initialization', function () {

    it('should be defined', function () {
      var ctrl = createController(emptyCorpsMock);
      expect(ctrl).toBeDefined();
    });
	
	it('should have isEdit to false if plain corps is passed in as dependency', function () {
        createController(emptyCorpsMock);
        expect(scope.isEdit).toBe(false);
      });

      it('should have isEdit to true if empty corps is passed in as dependency', function () {
        createController(corpsMock);
        expect(scope.isEdit).toBe(true);
      });

      it('should not set $scope.corps if corps is empty', function () {
        createController(emptyCorpsMock);
        expect(scope.corps).toBeUndefined();
      });

      it('should set $scope.corps to corps if corps is not empty', function () {
        createController(corpsMock);
        expect(scope.corps).toEqual(corpsMock);
      });

  });

  describe('When user submits the add form', function () {

    beforeEach(function () {
      createController(emptyCorpsMock);
    });

    it('should redirect to corps/index when success', function () {
      $httpBackend
        .expect('POST', apiUrl + '/corps', corpsMock)
        .respond(201);

      scope.corps = corpsMock;
      scope.submit();
      $httpBackend.flush();
      expect(state.go).toHaveBeenCalledWith('corps.index');
    });

    it('should not redirect to corps/index when failure', function () {
      $httpBackend
        .expect('POST', apiUrl + '/corps', corpsMock)
        .respond(400, 'error message from scope.submit() ADD case');

      scope.corps = corpsMock;
      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

  describe('When user submits the edit form', function () {

    beforeEach(function () {
      createController(corpsMock);
    });

    it('should redirect to corps/index when success', function () {
      $httpBackend
        .expect('PUT', apiUrl + '/corps/' + corpsMock.id, corpsMock)
        .respond(200);

      scope.submit();
      $httpBackend.flush();
      expect(state.go).toHaveBeenCalledWith('corps.index');
    });

    it('should not redirect to corps/index when failure', function () {
      $httpBackend
        .expect('PUT', apiUrl + '/corps/' + corpsMock.id, corpsMock)
        .respond(400, 'error message scope.submit() EDIT case');

      scope.submit();
      $httpBackend.flush();
      expect(state.go).not.toHaveBeenCalled();
    });

  });

});