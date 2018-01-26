define([
	'angular'
], function(
	angular) {
	return function(app, elem, attrs, scope) {
		app.directive('objectToViewDirective', ['$compile', '$timeout', function($compile, $timeout) {
			return {
                    template: '<span></span>',
                    restrict: 'EA',
                    scope: {
                        keyModel: '='
                    },
                    controller: function($scope, $element, $attrs) {
                        var newKey = $attrs.key+'_vlaue';
                        var html = '';
                        var type = $attrs.type;
                        var isObject = type.indexOf('object') >= 0;
                        var scopeType = $attrs.scopeType;
                        var disabled;
                        if($attrs.disabled || scopeType === '@') {
                            disabled = 'disabled="disabled"';
                        }
                        if(isObject) {
                            if(type.indexOf('out-') >= 0) {
                                html = '<textarea class="form-control" ng-model="'+newKey+'" disabled="disabled"></textarea>'
                            }
                            else {
                                html = '<textarea class="form-control" ng-model="'+newKey+'" '+disabled+'></textarea>'
                            } 
                        }
                        else if(type.indexOf('string') >= 0 || type.indexOf('number') >= 0) {
                            if(type.indexOf('out-') >= 0) {
                                html = '<input class="form-control" ng-model="keyModel" disabled="disabled">';
                            }
                            else {
                                html = '<input class="form-control" ng-model="keyModel" '+disabled+'>';
                            }                            
                        }
                        else if(type === 'callback') {
                            html = '<span>'+$attrs.exampleValue+'</span>';
                        }
                        else if(type === 'function') {
                            if($attrs.exampleValue) {
                                html = '<span>'+$attrs.exampleValue+'</span>';
                            }
                            else {
                                html = '<button class="btn btn-info" ng-click="keyModel()">'+$attrs.key+'</button>';
                            }                            
                        }
                        else if(type === 'boolean') {
                            $scope.keyModel = $scope.keyModel ? true : false;
                            html = '<label class="checkbox-inline" ng-click="keyModel = !keyModel" ng-class=\'{"checkbox-inline-checked": keyModel}\'>{{keyModel}}</label>';
                        }

                        $element.html(html);
                        $timeout(function() {
                            $compile($element.contents())($scope);
                        })
                        
                        $scope.$watch('keyModel', function(newValue, old) {
                            if(isObject) {
                                try{
                                    $scope[newKey] = JSON.stringify(newValue);
                                }
                                catch(er) {
                                    
                                }
                                
                            }                            
                        });
                        $scope.$watch(newKey, function(newValue, old) {
                            if(isObject) {
                                try{
                                    $scope.keyModel = JSON.parse(newValue);
                                }
                                catch(er) {
                                    
                                }
                            } 
                        });
                        
                    },
                    link: function($scope, $element, $attrs, ngModel) {
                       
                    }
                }
            }])
        }
})
