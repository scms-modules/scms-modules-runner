define([
  'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
    	app.factory('headerService', ['$rootScope', '$http', 'G', function($rootScope, $http, G) {
            return {
				get: function(options) {
					return $http({
						url: '/ehuodiCrmApi/myportalcs/selectSysUserByJobcard',
						method: 'post',
						data: options
					});
				},

				loginOut: function() {
					return $http({
						url: '/ehuodiCrmApi/logincs/logout',
						method: 'get'
					});
				}
            };
        }]);
  }
});