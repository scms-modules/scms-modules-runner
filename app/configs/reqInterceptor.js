module.exports = function(app){
	app.config([
		'$compileProvider', 
		'$controllerProvider', 
		'$provide', 
		'$httpProvider', function($compileProvider, $controllerProvider, $provide, $httpProvider) {
		$httpProvider.interceptors.push('apiIntercepter');
	}])
	.factory('apiIntercepter', ['$q', 'G', '$cookies', function($q, G, $cookies){
		var apiIntercepter = {
			request: function(config){
				var url = config.url;
				if(G.isDebug && config.test) {
					config.method = 'get';
					url = config.test + '?v=' + G.version;						
				}

				if(angular.isString(config.method) && config.method.toLocaleLowerCase() != 'post' && angular.isObject(config.data)){
					url += url.indexOf('?') == -1 ? '?' : '&';
					url += $.param(config.data);
				}
				config.responseType = 'json';
				config.withCredentials = true;
				config.url = url;
				config.data = config.data || {};

				if(config.data.datestart) {
					config.data.datestart = config.data.datestart + ' 00:00:00';
				}
				if(config.data.dateend) {
					config.data.dateend = config.data.dateend + ' 23:59:59';
				}
				if(angular.isString(config.method) && config.method.toLocaleLowerCase() === 'post'){
					config.data = $.param(config.data);
					config.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
				}
				return config;
			},
			response: function(res){
				var config = res.config.data || {};
				var data = res.data;
				if(data && data.result === 'error' && data.msg === 'authorityFailure'){
					//G.doLogin();
					return {};
				}
				else if(config.pageSize && data && data.data && data.data.length > config.pageSize) {
					config.skipCount = config.skipCount || 0;
					res.data.data = data.data.slice(config.skipCount, config.skipCount + config.pageSize);
				}
				return res;
			},
			requestError: function(rejection){
				//hideLoadingBtn(rejection.config);					
				// console.error('请求前出错')
				//return $q.reject(rejection);
			},
			responseError: function(rejection){
				rejection = rejection || {};
				if(!$cookies.jobcard) {
					//G.doLogin();
					return;
				}
				if(!rejection.config) {
					return;
				}
				G.console('error: apiUrl=' + rejection.config.url + '; ' + (rejection.statusText || ''));
				return $q.reject(rejection);
			}
		};

		return apiIntercepter;
	}])	
	
}

