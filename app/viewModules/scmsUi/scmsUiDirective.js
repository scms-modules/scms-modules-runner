define(['angular', './scmsUiDirective.html'], function(
    angular,
    html
  ) {
    return function(app, elem, attrs, scope) {
        app.directive('scmsUiDirective', [function() {
            return {
                template: html,
                restrict: 'EA',
                replace: true,
                scope: {
                    currItem: '=' //@scope currentItme
                },
                link: function postLink($scope, $element, $attrs) {

                },
      
                controller: function($scope, $element, $attrs, $cookies, $timeout) {
                    $scope.eval = function(callback) {
                        try{
                            eval(callback);
                        }
                        catch(e) {
                            
                        }
                    }
                }
            }
        }])
    }
  })
    