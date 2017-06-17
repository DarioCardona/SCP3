var app = angular.module('AngularScaffold', ['ui.router','ngDragDrop','ngStorage','AngularScaffold.Services', 'AngularScaffold.Controllers']);

angular.module('AngularScaffold.Controllers', []);
angular.module('AngularScaffold.Services', []);

app.config(['$stateProvider', '$urlRouterProvider','$provide', function($stateProvider, $urlRouterProvider,$provide) {
    $urlRouterProvider.otherwise('home');
	$stateProvider
		.state('home', {
            url: '/home',
            params: {content:undefined},
            templateUrl: '/views/manageUsers.html',
            authenticate: true
        })
        .state('login', {
            url: '/login',
            params: {content:undefined},
            templateUrl: '/views/login.html'
        })

        .state('history', {
            url: '/history',
            params: {content:undefined},
            templateUrl: '/views/history.html'
        })
        .state('managehistory', {
            url: '/managehistory',
            params: {content:undefined},
            templateUrl: '/views/manageHistory.html'
        })
        .state('class', {
            url: '/class',
            params: {content:undefined},
            templateUrl: '/views/manageClass.html',
            authenticate: true
        });


}])
