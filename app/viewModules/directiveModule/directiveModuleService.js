define([
  'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
    	app.factory('directiveModuleService', ['$rootScope', '$http', 'G', function($rootScope, $http, G) {
            return {
				get: function(options) {
					return $http({
						url: '',
						method: 'post',
						data: options,
						test: '/view/compile.json'//假数据api
					});
				}
            };
        }]);
  }
});