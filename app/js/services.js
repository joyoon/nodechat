nodeApp.service('nodeService', ['$cookies', function($cookies) {
	var userName = '';
	var currentPage = '';

	this.getUserName = function() {
		return userName;
	}

	this.getCurrentPage = function() {
		return currentPage;
	}

	this.getCurrentUser = function() {
		return JSON.parse($cookies.nodeChat).userName;
	}

	this.setUserName = function(name) {
		userName = name;
	}

	this.setCurrentPage = function(page) {
		currentPage = page;
	}
}]);