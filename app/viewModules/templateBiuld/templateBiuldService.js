define([
  'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
    	app.factory('templateBiuldService', ['$rootScope', '$http', 'G', function($rootScope, $http, G) {
            return {
				get: function(options) {
					return $http({
						url: '',
						method: 'post',
						data: options,
						test: '/view/viewModules/directiveModule/directiveModule.json'//假数据api
					});
				}
            };
        }]);
  }
});