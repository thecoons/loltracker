'use strict';

describe('Controller: PlayerSelectCtrl', function () {

  // load the controller's module
  beforeEach(module('lolTrackerApp'));

  var PlayerSelectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayerSelectCtrl = $controller('PlayerSelectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
