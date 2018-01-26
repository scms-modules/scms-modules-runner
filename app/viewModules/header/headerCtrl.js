define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('headerCtrl', ['$scope', '$state', '$location', function($scope, $state,$location) {
            $scope.currentState = '';

            if(!$state.current.name) {
                $location.path('/scmsUi/scmsUi')
            }
            
            //监听路由发生改变时，按钮选中切换
            $scope.$on('$stateChangeSuccess', function(e,toState,toParams,fromState,fromParams) {
                $scope.currentState = toState.name;
            });

        }])
    }
});