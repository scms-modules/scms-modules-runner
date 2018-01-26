define(['angular', './cssBaseDirective.html'], function(
    angular,
    html
  ) {
    return function(app, elem, attrs, scope) {
        app.directive('cssBaseDirective', [function() {
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

                }
            }
        }])
    }
  })
    