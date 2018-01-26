define([
  'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
    	app.factory('cssService', ['$rootScope', '$http', 'G', function($rootScope, $http, G) {
            return {
							get: function(options) {
								return $http({
									url: '/cssData/css.json',
									method: 'get',
									data: options,
									test: '/cssData/css.json'//假数据api
								});
							}
            };
        }]);
  }
});