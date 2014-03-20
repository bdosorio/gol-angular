'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('golAngularApp.controllers'));

    // set up the state
    beforeEach(module(function ($stateProvider) {
        $stateProvider
            .state('main', {})
            .state('main.game', {});
    }));

    var MainCtrl,
        scope, state;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
        scope = $rootScope.$new();
        state = $injector.get('$state');
        state.current.name = 'main';
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            $state: state
        });
    }));


    it('should have a list of cells', function () {
        expect(scope.cellList).toBeDefined();
        expect(scope.cellList.length).toBe(0);
    });

    it("should have a method to generate a game", function () {
        expect(scope.cellList.length).toBe(0);
        expect(scope.generate).toBeDefined();
        expect(state.current.name).toBe('main');
        scope.generate();
        scope.$digest();

        expect(scope.cellList.length).not.toBe(0);
        expect(state.current.name).toBe('main.game');
    });

    it("should have a method to generate a cell", function () {
        expect(scope.generateRandomCell).toBeDefined();

        var cell = scope.generateRandomCell();

        expect(cell.x).toBeDefined();
        expect(cell.y).toBeDefined();
        expect(cell.id).toBeDefined();
        expect(cell.age).toBeDefined();
        expect(cell.value).toBeDefined();
    });

    it("should have a method to add a cell to the list", function () {
        expect(scope.addCell).toBeDefined();

        var cell = scope.generateRandomCell();
        scope.addCell(cell);

        expect(scope.cellList[0]).toBe(cell);

    });

    it("should have a method to determine if a cell exists at a grid position", function () {
        expect(scope.cellAt).toBeDefined();

        scope.addCell({
            x: 1,
            y: 1
        });
        var isCellAt = scope.cellAt(scope.cellList[0].x, scope.cellList[0].y);

        expect(isCellAt).toBeTruthy();
    });

    describe('will have a step method that', function () {
        it('should do nothing with an empty list', function () {
            expect(scope.step).toBeDefined();

            scope.cellList = [];
            scope.step();
            expect(scope.cellList.length).toBe(0);
        });
    });

});
