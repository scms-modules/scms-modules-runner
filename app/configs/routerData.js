define(function(angular) {
	return function(app, elem, attrs, scope) {
		app.constant('allRouterData', [
			{
				'name': 'Base Css',
				'state': 'css.css',
				'moduleName': 'viewModules'
			},
			{
				'name': 'Base Csss',
				'state': 'cssbase.cssbase',
				'moduleName': 'viewModules'
			},
			{
				'name': '管理系统指令',
				'state': 'directiveModule.directiveModule',
				'moduleName': 'viewModules'
			},
			{
				'name': '管理系统指令',
				'state': 'compile.compile',
				'moduleName': 'viewModules'
			}
		]);
	};
});