define([
	'angular'
], function(
	angular) {
	return function(app, elem, attrs, scope) {
		app.directive('loadingDirective', ['G', function(G) {
			return {
                    template: '<div></div>',
                    restrict: 'EA',
                    replace: true,
                    scope: {
                        listData: '=',
                        currentPage: '=',
                        isLoading: '='
                    },
                    controller: function($scope, $element, $attrs) {
                        var $parent = $element.parent();
                        $parent.css({
                            position: 'relative'
                        });
                        $element.css({
                            background:'url(scmsModules/loading/img/loading.gif) center center no-repeat',
                            position: 'absolute',
                            left: '0',
                            top: '0',
                            width: '100%',
                            'z-index': '1'
                        });

                        var show = function() {
                            var height = parseInt($attrs.height, 10) || $parent.height();
                            if(!height || height < 200) {
                                height = 200;
                            }
                            $element.css({
                                height: height + 'px'
                            });
                            $element.show();
                        };

                        $scope.$watch("isLoading", function(newValue, oldValue) {
                            if(newValue) {
                                show();
                            }
                            else if(!newValue && !oldValue && newValue !== false){
                                show();
                            }
                            else{
                                $element.hide();
                            }
                        });

                        $scope.$watch("currentPage", function(newValue, oldValue) {
                            if(newValue && oldValue) {
                                show();
                            }
                        });
   
                        $scope.$watch("listData", function(newValue, oldValue) {
                            if(newValue) {
                                $element.hide();
                            }
                            else if(!newValue && !oldValue) {
                                show()
                            }
                        });
                    },
                    link: function($scope, $element, $attrs, ngModel) {
                       
                    }
                }
            }])
        }
})
