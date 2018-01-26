define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('cssCtrl', ['$scope', '$cookies', '$location', '$state', 'cssService', 'G', '$timeout', '$rootScope', '$sce', '$http', function($scope, $cookies, $location, $state, service, G, $timeout, $rootScope, $sce, $http) {
            $scope.data = [];
            var scrollTops = {};
        	service.get().then(function(data) {
                data = data.data.data;
                angular.forEach(data, function(item) {
                    var htmlH = [];
                    if(item.htmlUrl) {
                        item.html = [];
                        $http({
                            url: item.htmlUrl,
                            method: 'get'
                        }).then(function(data) {
                            var html = data.data;
                            $timeout(function() {
                                item.html.push($sce.trustAsHtml(html));
                                $timeout(function() {
                                    $('.box[name]').each(function() {
                                        scrollTops[$(this).attr('name')] = $(this).offset().top - 70;
                                    });
                                }, 0);
                            }, 0);
                        });
                    }
                    else {
                        if(typeof item.html === 'object' && item.html.length) {
                            angular.forEach(item.html, function(html) {
                                htmlH.push($sce.trustAsHtml(html));
                            });
                            item.html = htmlH;
                        }
                        else {
                            item.html = $sce.trustAsHtml(item.html);
                        }
                    }
                });

                $scope.data = data;
                $scope.navs = [];
                angular.forEach(data, function(item) {
                    $scope.navs.push({
                        icon: 'fa fa-caret-right',
                        name: item.title,
                        item: item,
                        href: ''
                    });
                });
                $rootScope.navs = [{
                    name: 'ELayout',
                    children: $scope.navs
                }];

                $rootScope.$watch('currNavItem', function(newValue) {
                    if(newValue) {
                        $('#container').scrollTop(scrollTops[newValue.title]);
                    }                    
                })

                $scope.eval = function(callback) {
                    eval(callback);
                }
                
            });
           
        }])
    }
});