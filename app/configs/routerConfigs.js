define(function () {

	return function(app, routerDataName){
		app.config(['$stateProvider', '$urlRouterProvider', routerDataName, '$httpProvider', function($stateProvider, $urlRouterProvider, routerData, $httpProvider){
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Request-With'];

			var states = {};
			angular.forEach(routerData, function(item) {
				
		        // 处理多级state，自动添加各个父级state
		        item.href = '#/' + item.state.replace(/\./g, '/');
		        var paths = item.state.split(/\./g);
		        var defaultState = paths[paths.length - 1];
		        var defaultParams = item.params || '';
				var currState = '';
		        if(paths.length > 1){
					paths = paths.slice(0, paths.length - 1);
					angular.forEach(paths, function(path){
						currState += path;
						states[currState] = {
							abstract: true,
							url: '/' + currState.replace(/\./g, '/'),
							template: '<div ui-view></div>'
						}
						currState += '.';
			        });		        	
		        }else{
		        	currState = defaultState;
		        }
		        defaultState = currState + defaultState;
		        states[defaultState] = {
					url: '/' + defaultState.replace(/^.*?\./g, '')+(defaultParams? ('?' + defaultParams) : ''),
					template: '<div ng-component="'+item.moduleName+'/'+ defaultState.replace(/\./g, '/') +'"></div>'
				}

				//设置首页跳转
				if(item.isIndex) {
					$urlRouterProvider.when('', item.href.replace(/^#/, ''));
				}

		    });
			angular.forEach(states, function(item, key) {
				$stateProvider.state(key, {
					url: item.url,
					template: item.template,
				});	
		    });
		    
		}])
	}
});