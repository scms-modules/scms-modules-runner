define(['angular'], function(angular) {
    return function(app, elem, attrs, scope) {

        app.controller('templateBiuldCtrl', ['$scope', '$cookies', '$location', '$state', 'templateBiuldService', 'G', '$timeout', '$window', '$sce','$compile', function($scope, $cookies, $location, $state, service, G, $timeout, $window, $sce, $compile) {
            $scope.data = [];

            service.get().then(function(data) {
                data = data.data;
                $scope.items = data;
                angular.forEach($scope.items, function(item) {
                    item.html = $sce.trustAsHtml(item.html);
                    item.view = '';
                    angular.forEach(item.scope, function(scope) {
                        item.view += '<tr><td><span style="white-space:nowrap">'+scope.key+'</span></td><td object-to-view-directive key-model="'+scope.key+'" data-type="'+scope.type+'" data-key="'+scope.key+'" data-example-value="'+scope.exampleValue+'" data-disabled="'+(scope.isDisabled || '')+'"></td></tr>';
                    });
                    item.view = $sce.trustAsHtml(item.view);
                });
                $scope.item = data[0];
            });

        	
            
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
                        if(item.exampleValue || item.hasOwnProperty('exampleValue')) {
                            if(item.type === 'callback') {
                                $scope[item.key] = function() {
                                    eval(item.exampleValue);
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

            $scope.changeItem = function(item) {
                $scope.item = item;
            }

            
        }])
    }
});