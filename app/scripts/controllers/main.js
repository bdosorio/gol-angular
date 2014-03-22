'use strict';

angular.module('golAngularApp.controllers')
    .controller('MainCtrl', function ($scope, $state) {
        var MAX_ID = 100, MAX_X = 500, MAX_Y = 500, MAX_AGE = 100, MAX_INIT_CELLS = 10, MAX_MUTATION = 10;
        $scope.cellList = [];
        $scope.keepRange = {
            start: 2,
            end: 3
        };
        $scope.lastId = 0;
        $scope.generateRandomCell = function () {
            return {
                id: $scope.generateRandomNumber(0, MAX_ID),
                x: $scope.generateRandomNumber(0, MAX_X),
                y: $scope.generateRandomNumber(0, MAX_Y),
                age: $scope.generateRandomNumber(0, MAX_AGE),
                value: {
                    parentId: $scope.generateRandomNumber(0, MAX_ID),
                    mutation: $scope.generateRandomNumber(0, MAX_MUTATION)
                }
            };

        };
        $scope.generateRandomNumber = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        $scope.generate = function () {
            var numberOfCells = $scope.generateRandomNumber(1, MAX_INIT_CELLS);
            for (var i = 0; i < numberOfCells; i++) {
                $scope.addCell($scope.generateRandomCell());
            }
            $state.go('main.game');
            console.debug($state.current.name);
        };
        $scope.cellAt = function (x, y) {
            var found = false;
            angular.forEach($scope.cellList, function (cell) {
                if (cell.x === x && cell.y === y) {
                    found = cell;
                }
            });
            return found;
        };
        $scope.addCell = function (cell) {
            cell.id = $scope.lastId + 1;
            $scope.lastId = cell.id;
            $scope.cellList.push(cell);
        };
        $scope.neighborCount = function (cell) {
            var count = 0;
            //top left
            if ($scope.cellAt(cell.x - 1, cell.y - 1)) {
                count++;
            }
            //top
            if ($scope.cellAt(cell.x, cell.y - 1)) {
                count++;
            }
            //top right
            if ($scope.cellAt(cell.x + 1, cell.y - 1)) {
                count++;
            }
            //left
            if ($scope.cellAt(cell.x - 1, cell.y)) {
                count++;
            }
            //right
            if ($scope.cellAt(cell.x + 1, cell.y)) {
                count++;
            }
            //bottom left
            if ($scope.cellAt(cell.x - 1, cell.y + 1)) {
                count++;
            }
            //bottom
            if ($scope.cellAt(cell.x, cell.y + 1)) {
                count++;
            }
            //bottom right
            if ($scope.cellAt(cell.x + 1, cell.y + 1)) {
                count++;
            }
            return count;
        };
        $scope.step = function () {
            var removeList = [];
            angular.forEach($scope.cellList, function (cell) {
                var neighborCount = $scope.neighborCount(cell);
                if (neighborCount < $scope.keepRange.start || neighborCount > $scope.keepRange.end) {
                    removeList.push(cell);
                }
            });

            angular.forEach(removeList, function (cell) {
                $scope.cellList.splice($scope.cellList.indexOf(cell), 1);
            });

        };
    });
