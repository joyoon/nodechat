'use strict';

var nodeApp = angular.module('nodeApp', [
	'ngRoute',
	'nodeApp.controllers'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', { templateUrl: 'about.html', controller: 'homeController' });
	$routeProvider.when('/nameentry', { templateUrl: 'pageone.html', controller: 'pageOneController' });
	$routeProvider.when('/chat', { templateUrl: 'chat.html', controller: 'chatController' });
}]);