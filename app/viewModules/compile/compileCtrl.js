define(['angular'], function(angular) {
    return function(app, elem, attrs, scope) {

        app.controller('compileCtrl', ['$scope', '$cookies', '$location', '$state', 'compileService', 'G', '$timeout', '$window', '$sce','$compile', '$rootScope', '$interval', function($scope, $cookies, $location, $state, service, G, $timeout, $window, $sce, $compile, $rootScope, $interval) {
            $scope.data = [];

            
            $interval(function() {
                getData();                
            }, 2000)
            var preData = '';
            var getData = function() {
                service.get().then(function(data) {
                    data = data.data;
                    $scope.viewItems = data;
                    if(JSON.stringify($scope.viewItems) === preData) {
                        return;
                    }
                    preData = JSON.stringify($scope.viewItems);
                    angular.forEach($scope.viewItems, function(item) {
                        item.icon = '';
                        item.htmlCode = item.html;

                        if(item.htmlUrl && item.htmlUrl[0]) {
                            require(['text!'+item.htmlUrl], function(html){
                                item.html = $sce.trustAsHtml(html);
                                $timeout(function() {
                                    item.htmlCode = $sce.trustAsHtml(html);
                                }, 0);
                            });
                        }
                        else {
                            item.html = $sce.trustAsHtml(item.html);
                        }

                        item.view = '';
                        angular.forEach(item.scope, function(scope) {
                            item.view += '<tr><td><span style="white-space:nowrap">'+scope.key+'</span></td><td object-to-view-directive key-model="'+scope.key+'" data-scope-type="'+scope.scopeType+'" data-type="'+scope.type+'" data-key="'+scope.key+'" data-example-value="'+(scope.exampleValue || scope.parentScopeValue || '')+'" data-disabled="'+(scope.isDisabled || '')+'"></td></tr>';
                        });
                        item.view = $sce.trustAsHtml(item.view);

                    });
                    $scope.item = data[0];

                    var navs = [];
                    angular.forEach($scope.viewItems, function(item) {
                        navs.push({
                            icon: 'fa fa-caret-right',
                            name: item.name,
                            item: item,
                            href: 'javascript:void(0);'
                        });
                    });
                    $rootScope.navs = [{
                        name: 'AngularJs Directive',
                        children: navs
                    }];
                });
            }
            getData();

            $rootScope.$watch('currNavItem', function(newValue) {
                if(newValue) {
                    $scope.item = newValue;
                }
            })

        	
            
            $scope.$watch('item', function(newValue, oldValue) {
                if(newValue) {
                    if(oldValue) {
                        angular.forEach(oldValue.scope, function(item) {
                            if($scope[item.key]) {
                                delete $scope[item.key];
                            }
                        });
                    }
                    angular.forEach(newValue.scope, function(item) {
                        item.exampleValue = item.exampleValue || item.parentScopeValue || '';
                        if(item.exampleValue || item.hasOwnProperty('exampleValue')) {
                            if(item.type === 'callback') {
                                $scope[item.key] = function() {
                                    eval(item.exampleValue);
                                };
                            }
                            if(item.type === 'function' && item.parentScopeValue) {
                                $scope[item.key] = function() {
                                    
                                    var value = item.exampleValue.replace(/^\s*function\(\)\s*{/, '')
                                    value = value.replace(/\}\s*\;*$/, '')
                                    eval(value);
                                };
                            }
                            else {
                                $scope[item.key] = item.exampleValue;
                            }                            
                        }
                    });

                    require($scope.item.deps, function() {
                        angular.forEach(arguments, function(derective) {
                            derective(app, elem, attrs, scope);
                            $compile($('.tbodyContent').contents())($scope);
                            $compile($('.contentHtml').contents())($scope);
                        });

                        
                    });
                }
            });
        }])
    }
});