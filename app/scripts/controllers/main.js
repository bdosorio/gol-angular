'use strict';

angular.module('golAngularApp.controllers')
    .controller('MainCtrl', function ($scope, $state) {
        var MAX_ID = 100, MAX_INIT_AGE = 100, MAX_INIT_CELLS = 100, MAX_MUTATION = 250, POSSIBLE_NEIGHBORS = 8;
        $scope.cellList = [];
        $scope.settings = {
            drawRadius: 2,
            fillColor: '#b007b0',
            strokeWidth: '.1',
            strokeColor: '#000',
            boardWidth: 100,
            boardHeight: 100,
            opacity: 0.6,
            keepRange: {
                start: 2,
                end: 3
            },
            parentsForBirth: 3
        };
        $scope.lastId = 0;
        $scope.generateRandomCell = function () {
            return {
                id: $scope.generateRandomNumber(0, MAX_ID),
                x: $scope.generateRandomNumber(0, $scope.settings.boardWidth),
                y: $scope.generateRandomNumber(0, $scope.settings.boardHeight),
                age: $scope.generateRandomNumber(0, MAX_INIT_AGE),
                value: {
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
            cell.age = cell.age || 0;
            cell.drawX = cell.x * 2 * $scope.settings.drawRadius;
            cell.drawY = cell.y * 2 * $scope.settings.drawRadius;
            $scope.cellList.push(cell);
        };
        $scope.findNeighborCount = function (cell, deadNeighborLength) {
            var deadCount = deadNeighborLength || $scope.findDeadNeighbors(cell).length;
            return POSSIBLE_NEIGHBORS - deadCount;
        };
        $scope.findDeadNeighbors = function (cell) {
            var deadNeighbors = [];
            //top left
            if (!$scope.cellAt(cell.x - 1, cell.y - 1)) {
                deadNeighbors.push({x: cell.x - 1, y: cell.y - 1});
            }
            //top
            if (!$scope.cellAt(cell.x, cell.y - 1)) {
                deadNeighbors.push({x: cell.x, y: cell.y - 1});
            }
            //top right
            if (!$scope.cellAt(cell.x + 1, cell.y - 1)) {
                deadNeighbors.push({x: cell.x + 1, y: cell.y - 1});
            }
            //left
            if (!$scope.cellAt(cell.x - 1, cell.y)) {
                deadNeighbors.push({x: cell.x - 1, y: cell.y});
            }
            //right
            if (!$scope.cellAt(cell.x + 1, cell.y)) {
                deadNeighbors.push({x: cell.x + 1, y: cell.y});
            }
            //bottom left
            if (!$scope.cellAt(cell.x - 1, cell.y + 1)) {
                deadNeighbors.push({x: cell.x - 1, y: cell.y + 1});
            }
            //bottom
            if (!$scope.cellAt(cell.x, cell.y + 1)) {
                deadNeighbors.push({x: cell.x, y: cell.y + 1});
            }
            //bottom right
            if (!$scope.cellAt(cell.x + 1, cell.y + 1)) {
                deadNeighbors.push({x: cell.x + 1, y: cell.y + 1});
            }
            return deadNeighbors;
        };
        $scope.step = function () {
            var removeList = [];
            var possibleBirthList = [];
            for (var i = 0; i < $scope.cellList.length; i++) {
                var deadNeighborsList = $scope.findDeadNeighbors($scope.cellList[i]);
                var neighborCount = $scope.findNeighborCount($scope.cellList[i], deadNeighborsList.length);
                if (neighborCount < $scope.settings.keepRange.start || neighborCount > $scope.settings.keepRange.end) {
                    removeList.push($scope.cellList[i]);
                }
                else {
                    //update cell
                    $scope.cellList[i].age++;
                    possibleBirthList = _.union(possibleBirthList, deadNeighborsList);
                }
            }

            //remove dead cells
            $scope.cellList = _.difference($scope.cellList, removeList);

            //check possibleBirth to see if any need to be born
            _.forEach(possibleBirthList, function (cell) {
                if ($scope.findNeighborCount(cell) === $scope.settings.parentsForBirth) {
                    $scope.addCell(cell);
                }
            });

        };
        $scope.clear = function () {
            $scope.cellList = [];
        };
        $scope.svgClickHandler = function (clickEvent) {
//            $scope.clickCell = _.pairs(clickEvent);
            console.log(clickEvent);
            var cell = {
                x: Math.floor(clickEvent.offsetX / (2 * $scope.settings.drawRadius )),
                y: Math.floor(clickEvent.offsetY / (2 * $scope.settings.drawRadius)),
                value: {
                    mutation: $scope.generateRandomNumber(0, MAX_MUTATION),
                }
            };
            console.log("Adding:");
            console.log(cell);
            $scope.addCell(cell);
        };
    });
