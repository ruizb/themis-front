describe('CorpsIndexCtrl', function () {

  var state, editState, Corps, q, $httpBackend, $rootScope;

  var apiUrl = 'http://themisapi.herokuapp.com';

  var corpsMock = {
    id: 1,
    label: 'Gendarmerie'
  };

  var emptyCorpsMock = {
    label: ''
  };

  var params = {
    id: 1
  };

  beforeEach(module('themis.corps'));

  beforeEach(inject(function (_$state_, _$rootScope_, _$httpBackend_, _Corps_, _$q_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    state = _$state_;
    editState = _$state_.get('corps.edit');
    Corps = _Corps_;
    q = _$q_;
  }));

  describe('corps.edit state configuration', function () {

    it('should have resolve.corps defined', function () {
      expect(editState.resolve.corps).toBeDefined();
    });

    it('should have resolve.corps to return a promise with id empty', function () {
      expect(typeof editState.resolve.corps({}, q, Corps).then).toBe('function');
    });

    it('should have resolve.corps to return a promise with id not empty', function () {
      expect(typeof editState.resolve.corps(params, q, Corps).then).toBe('function');
    });

    it('should resolve to corps if GET api/corps/1 with no error', function () {
      $httpBackend
        .expect('GET', apiUrl + '/corps/' + params.id)
        .respond(200, corpsMock);

      var promise = editState.resolve.corps(params, q, Corps);
      $httpBackend.flush();

      var resolvedValue;
      promise.then(function (data) {
        resolvedValue = data;
      });
      $rootScope.$digest();

      expect(resolvedValue).toEqual(corpsMock);
    });

    it('should reject if GET api/corps/1 with error', function () {
      var errorMessage = 'error message when Corps.get(' + params.id + ')';

      $httpBackend
        .expect('GET', apiUrl + '/corps/' + params.id)
        .respond(400, errorMessage);

      var promise = editState.resolve.corps(params, q, Corps);
      $httpBackend.flush();

      var rejectedMessage;
      promise.then(undefined, function (err) {
        rejectedMessage = err;
      });
      $rootScope.$digest();

      expect(rejectedMessage).toEqual(errorMessage);
    });

    it('should resolve to "empty corps" when id is empty', function () {
      var promise = editState.resolve.corps({}, q, Corps);

      var resolvedValue;
      promise.then(function (data) {
        resolvedValue = data;
      });
      $rootScope.$digest();

      expect(resolvedValue).toEqual(emptyCorpsMock);
    });

  });

});