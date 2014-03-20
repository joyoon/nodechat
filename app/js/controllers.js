'use strict';

var nodeApp = angular.module('nodeApp.controllers', ['ngCookies']);

nodeApp.controller('homeController', ['$scope', '$http', '$q', '$route', '$location', '$cookies', function($scope, $http, $q, $route, $location, $cookies) {
		this.$route = $route;
		this.$location = $location;
		$scope.model = {};
		$scope.model.curMessage = '';
		$scope.model.messages = [];
		$scope.model.curPage = null;

		$scope.createMessage = function(message) {

			var newMessage = { message: message, user : { id: 2, name: 'ted' } };

			$scope.model.messages.push(newMessage);

			$http.post('/api/messages', newMessage)
				.success(function(data) {
					console.log('in success');
					console.log(data);
				})
				.error(function(data) {
					console.log('error: ' + data);
				});
		};

		$scope.getMessages = function() {

			var deferred = $q.defer();

			$http.get('/api/messages')
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function(data) {
					console.log('error: ' + data);
				});

			return deferred.promise;
		};

		$scope.init = function() {

			//fetch the messages
			// $scope.getMessages().then(function(result) {
			// 	$scope.model.messages = result;
			// });

			$cookies.nodeChat = null;
			$scope.model.curPage = 1;
		};
	}]);

	nodeApp.controller('pageOneController', ['$scope', '$cookies', 'nodeService', function($scope, $cookies, nodeService){
		$scope.model.name = '';

		$scope.onEnterKeyPress = function(name) {

			var nodeChat = {};
			nodeChat.userName = name;

			$cookies.nodeChat = JSON.stringify(nodeChat);

			nodeService.setUserName(name);

			nodeService.setCurrentPage(2);

			console.log(nodeService.getCurrentUser());
		};
	}]);

	nodeApp.controller('chatController', [function($scope){

		/*$scope.message = 'contact message';*/

	}]);