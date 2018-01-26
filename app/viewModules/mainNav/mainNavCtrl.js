define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('mainNavCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
            var preCheckedNav = '';
            $scope.callback = function(currNav) {
                $rootScope.currNavItem = currNav.item;
                if(preCheckedNav) {
                    //preCheckedNav.isChecked = false;
                }
                //currNav.isChecked = true;
                preCheckedNav = currNav;
            }
        	//切换路由时，更新菜单
        	$scope.navs = [];
            $rootScope.$watchCollection('navs', function(newValue) {
                $scope.navs = newValue || [];
            });
       		
        }]);
    }
});