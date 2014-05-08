'use strict';
angular.module('golAngularApp.util', []);
angular.module('golAngularApp.controllers', ['ui.router']);
angular.module('golAngularApp', [

        'golAngularApp.util',
        'golAngularApp.controllers',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, send to /route1
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('main', {
                url: '',
                controller: 'MainCtrl',
                templateUrl: 'views/main.html'
            })
            .state('main.game', {
                url: '/game',
                templateUrl: 'views/game.html'
            })
            .state('404', {
                url: '/404',
                template: '<h1>State Not Found</h1>'
            });

    });
