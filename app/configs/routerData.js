define(function(angular) {
	return function(app, elem, attrs, scope) {
		app.constant('allRouterData', [
			{
				'name': 'Scms UI',
				'state': 'scmsUi.scmsUi',
				'moduleName': 'viewModules'
			},
			{
				'name': 'Directive',
				'state': 'scmsDirective.scmsDirective',
				'moduleName': 'viewModules'
			},
			{
				'name': 'Scms Page',
				'state': 'scmsPage.scmsPage',
				'moduleName': 'viewModules'
			},
			{
				'name': 'Design Standard',
				'state': 'standard.standard',
				'moduleName': 'viewModules'
			}
		]);
	};
});