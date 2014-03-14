'use strict';

angular.module('golAngularApp.controllers')
    .controller('MainCtrl', function ($scope) {
        var MAX_ID = 100, MAX_X = 50, MAX_Y = 50, MAX_AGE = 100, MAX_INIT_CELLS = 10;
        $scope.cellList = [];
        $scope.generateRandomCell = function () {
            return {
                id: $scope.generateRandomNumber(0, MAX_ID),
                x: $scope.generateRandomNumber(0, MAX_X),
                y: $scope.generateRandomNumber(0, MAX_Y),
                age: $scope.generateRandomNumber(0, MAX_AGE)
            };

        };
        $scope.generateRandomNumber = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        $scope.generate = function () {
            var numberOfCells = $scope.generateRandomNumber(0, MAX_INIT_CELLS);
            for (var i = 0; i < numberOfCells; i++) {
                var cell = $scope.generateRandomCell();
                $scope.cellList.push(cell);
            }
        };
        $scope.cellAt = function(x,y){
            var found = false;
            angular.forEach($scope.cellList, function(cell){
                if(cell.x === x && cell.y === y){
                    found = true;
                }
            });
            return found;
        }
    });
