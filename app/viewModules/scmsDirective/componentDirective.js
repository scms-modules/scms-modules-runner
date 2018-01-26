define(['angular','scmsmodules', './componentDirective.html', './componentDirective.css'], function(
    angular,
    scmsmodules,
    html,
    css
  ) {
    return function(app, elem, attrs, scope) {
        var directiveObj = scmsmodules.default || scmsmodules;
        var objKey;
        for(objKey in directiveObj) {
            directiveObj[objKey](app, elem, attrs, scope);
        }
        app.directive('componentViewDirective', [function() {
            return {
                template: html,
                restrict: 'EA',
                replace: true,
                scope: {
                    currItem: '=' //@scope currentItme
                },
                link: function($scope, $element, $attrs) {
                },
      
                controller: function($scope, $element, $attrs, $cookies, $timeout, $sce, $compile) {
                    ///////
                    $scope.data = [];
                    var preScope;         
                    

                    var parseData = function() {
                        var item = Object.assign({}, $scope.currItem);
                        item.icon = '';
                        item.htmlCode = item.html;
                        item.html = $sce.trustAsHtml(item.html);
                        item.view = '';
                        angular.forEach(item.scope, function(scope) {
                            item.view += '<tr><td><span style="white-space:nowrap">'+scope.key+'</span></td><td object-to-view-directive key-model="'+scope.key+'" data-scope-type="'+scope.scopeType+'" data-type="'+scope.type+'" data-key="'+scope.key+'" data-example-value="'+(scope.exampleValue || scope.parentScopeValue || '')+'" data-disabled="'+(scope.isDisabled || '')+'"></td></tr>';
                        });
                        item.view = $sce.trustAsHtml(item.view);
                        $scope.item = item;
                
                            
                            
                        $scope.$watch('item', function(newValue, oldValue) {
                            if(newValue) {
                                if(oldValue) {                                    
                                    angular.forEach(oldValue.scope, function(item) {
                                        if($scope[item.key]) {
                                            delete $scope[item.key];
                                        }
                                    });
                                }
                                preScope = newValue.scope;
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

                                $compile($('.tbodyContent').contents())($scope);
                                $compile($('.contentHtml').contents())($scope);
                            }
                        });

                    };

                    $scope.$watch('currItem', function(newValue, oldValue) {
                        if(newValue) {
                            angular.forEach(preScope, function(item) {
                                delete $scope[item.key];
                            });
                            $('.contentHtml').html('');
                            $compile($('.contentHtml').contents())($scope);
                            parseData();                            
                        }
                    })

                }
            }
        }])
    }
  })