define([
  'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
    	app.factory('compileService', ['$rootScope', '$http', 'G', function($rootScope, $http, G) {
            return {
				get: function(options) {
					return $http({
						url: '',
						method: 'post',
						data: options,
						test: '/getCompileJson'//假数据api
					});
				}
            };
        }]);
  }
});