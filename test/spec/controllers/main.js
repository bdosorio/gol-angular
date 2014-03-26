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
        scope, state,
        cell = {x: 1, y: 1},
        topLeft = {x: 0, y: 0},
        top = {x: 1, y: 0},
        topRight = {x: 2, y: 0},
        left = {x: 0, y: 1},
        right = {x: 2, y: 1},
        bottomLeft = {x: 0, y: 2},
        bottom = {x: 1, y: 2},
        bottomRight = {x: 2, y: 2};

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

        var random = scope.generateRandomCell();

        expect(random.x).toBeDefined();
        expect(random.y).toBeDefined();
        expect(random.id).toBeDefined();
        expect(random.age).toBeDefined();
        expect(random.value).toBeDefined();
    });

    it("should have a method to add a cell to the list", function () {
        expect(scope.addCell).toBeDefined();

        scope.addCell(cell);

        expect(scope.cellList[0]).toBe(cell);

    });

    it("should have a method to determine if a cell exists at a grid position", function () {
        expect(scope.cellAt).toBeDefined();

        scope.addCell(cell);

        var isCellAt = scope.cellAt(scope.cellList[0].x, scope.cellList[0].y);

        expect(isCellAt).toBeTruthy();
    });

    it('should have a method to gather a list of dead cells surrounding a cell', function () {
        expect(scope.findDeadNeighbors).toBeDefined();
        expect(_).toBeDefined();

        scope.addCell(topLeft);
        scope.addCell(topRight);
        scope.addCell(bottomRight);
        scope.addCell(bottomLeft);

        var deadNeighbors = scope.findDeadNeighbors(cell);
        expect(deadNeighbors.length).toBe(4);
        expect(_.where(deadNeighbors, {x: top.x, y: top.y}).length).toBe(1);
    });
    it('should have a method to determine the neighbor count of a cell', function () {
        expect(scope.findNeighborCount).toBeDefined();


        scope.addCell(cell);
        expect(scope.findNeighborCount(cell)).toBe(0);

        scope.addCell(topLeft);
        expect(scope.findNeighborCount(cell)).toBe(1);

        scope.addCell(top);
        expect(scope.findNeighborCount(cell)).toBe(2);

        scope.addCell(topRight);
        expect(scope.findNeighborCount(cell)).toBe(3);

        scope.addCell(left);
        expect(scope.findNeighborCount(cell)).toBe(4);

        scope.addCell(right);
        expect(scope.findNeighborCount(cell)).toBe(5);

        scope.addCell(bottomLeft);
        expect(scope.findNeighborCount(cell)).toBe(6);

        scope.addCell(bottom);
        expect(scope.findNeighborCount(cell)).toBe(7);

        scope.addCell(bottomRight);
        expect(scope.findNeighborCount(cell)).toBe(8);
    });

    it('should have findNeighborCount that takes only uses count of deadCells if sent as a parameter', function () {
        expect(scope.findNeighborCount({}, 2)).toBe(6);
    });

    describe('will have a step method that', function () {
        it('should do nothing with an empty list', function () {
            expect(scope.step).toBeDefined();

            scope.cellList = [];
            scope.step();

            expect(scope.cellList.length).toBe(0);
        });

        it('should kill a cell if it has a neighbor count below keep range', function () {
            scope.addCell(cell);

            scope.step();

            expect(scope.cellAt(cell.x, cell.y)).toBeFalsy();
        });

        it('should keep cells alive if in keep range and increase their age', function () {
            scope.addCell(topRight);
            scope.addCell(top);
            scope.addCell(cell);


            scope.step();
            var cellAt = scope.cellAt(cell.x, cell.y);
            expect(cellAt).toBeTruthy();
            expect(cellAt.age).toBe(1);

        });

        it('should keep cells alive if over keep range', function () {
            scope.addCell(topRight);
            scope.addCell(bottomRight);
            scope.addCell(topLeft);
            scope.addCell(bottomLeft);
            scope.addCell(cell);

            scope.step();

            expect(scope.cellAt(cell.x, cell.y)).toBeFalsy();
        });

        it('should add a new cell if a dead cell borders parentsForBirth live cells', function () {
            expect(scope.settings.parentsForBirth).toBeDefined();
            scope.addCell(topRight);
            scope.addCell(top);
            scope.addCell(cell);


            scope.step();

            expect(scope.cellAt(right.x, right.y)).toBeTruthy();
        });
    });

    it('should have a method to clear the game', function () {
        expect(scope.clear).toBeDefined();

        scope.clear();

        expect(scope.cellList.length).toBe(0);
    });

})
;
