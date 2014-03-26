'use strict';

angular.module('golAngularApp.controllers')
    .controller('MainCtrl', function ($scope, $state) {
        var MAX_ID = 100, MAX_X = 100, MAX_Y = 100, MAX_AGE = 100, MAX_INIT_CELLS = 10, MAX_MUTATION = 10, POSSIBLE_NEIGHBORS = 8;
        $scope.cellList = [];
        $scope.settings = {
            fillColor: '#b007b0',
            strokeWidth: '.1',
            strokeColor: '#000',
            radius: 2,
            drawRadius: 3,
            opacity: 0.6,
            keepRange: {
                start: 2,
                end: 3
            },
            parentsForBirth : 3
        };
        $scope.lastId = 0;
        $scope.generateRandomCell = function () {
            return {
                id: $scope.generateRandomNumber(0, MAX_ID),
                x: $scope.generateRandomNumber(0, MAX_X),
                y: $scope.generateRandomNumber(0, MAX_Y),
                age: $scope.generateRandomNumber(0, MAX_AGE),
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
            cell.drawX = (cell.x * $scope.settings.radius * 2) + $scope.settings.radius;
            cell.drawY = (cell.y * $scope.settings.radius * 2) + $scope.settings.radius;
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
            _.forEach(possibleBirthList,function(cell){
                if($scope.findNeighborCount(cell) === $scope.settings.parentsForBirth){
                    $scope.addCell(cell);
                }
            } );

        };
        $scope.clear= function(){
            $scope.cellList = [];
        };
    });
