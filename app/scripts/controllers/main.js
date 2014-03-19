'use strict';

angular.module('golAngularApp.controllers')
    .controller('MainCtrl', function ($scope, $state) {
        var MAX_ID = 100, MAX_X = 500, MAX_Y = 500, MAX_AGE = 100, MAX_INIT_CELLS = 10, MAX_MUTATION = 10;
        $scope.cellList = [];
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
            var found;
            angular.forEach($scope.cellList, function (cell) {
                if (cell.x === x && cell.y === y) {
                    found = cell;
                }
            });
            //noinspection JSUnusedAssignment
            return found;
        };
        $scope.addCell = function (cell) {
            $scope.cellList.push(cell);
        };
    });
