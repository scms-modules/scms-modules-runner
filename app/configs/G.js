module.exports = function(app) { 
	
	app.factory('G', ['$cookies', '$location', '$rootScope', function($cookies, $location, $rootScope) {
		return {
			isDebug: true
		}
	}]);
}