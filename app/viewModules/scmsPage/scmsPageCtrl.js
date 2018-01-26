define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope, demoJson) {
        app.controller('scmsPageCtrl', ['$scope', '$cookies', '$location', '$state', 'G', '$timeout', '$rootScope', '$sce', '$http','$compile', function($scope, $cookies, $location, $state, G, $timeout, $rootScope, $sce, $http,$compile) {
            $rootScope.navs = [{
                name: 'Scms Pages',
                children: []
            }];
           
        }])
    }
});