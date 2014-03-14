'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('golAngularApp.controllers'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should have a list of cells', function () {
        expect(scope.cellList).toBeDefined();
        expect(scope.cellList.length).toBe(0);
    });

    it("should have a method to generate a game", function () {
        expect(scope.cellList.length).toBe(0);
        expect(scope.generate).toBeDefined();

        scope.generate();

        expect(scope.cellList.length).not.toBe(0);
        expect(scope.cellList[0].id).toBeTruthy();
        expect(scope.cellList[0].x).toBeTruthy();
        expect(scope.cellList[0].y).toBeTruthy();
    });
});
