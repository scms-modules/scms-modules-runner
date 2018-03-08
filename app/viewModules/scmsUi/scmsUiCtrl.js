export default (app, elem, attrs, scope, demoJson) => {
        app.controller('scmsUiCtrl', ['$scope', '$cookies', '$location', '$state', 'G', '$timeout', '$rootScope', '$sce', '$http','$compile', function($scope, $cookies, $location, $state, G, $timeout, $rootScope, $sce, $http,$compile) {
            

            //get navs
            $scope.navs = [];
            var parentNav = {};
            angular.forEach(demoJson, function(item, index) {
                
                $scope.currItem = $scope.currItem || item;
                if(item.parentTitle) {
                    parentNav[item.parentTitle] = parentNav[item.parentTitle] || {};
                    parentNav[item.parentTitle].children = parentNav[item.parentTitle].children || [];
                    parentNav[item.parentTitle].children.push({
                        name: item.title,
                        item: item,
                        href: 'javascript:void(0);'
                    });

                    parentNav[item.parentTitle].data = {
                        icon: item.type === 'directive' ? 'fa fa-cog': 'fa fa-cog',
                        name: item.parentTitle,
                        item: '',
                        href: '',
                        children: parentNav[item.parentTitle].children
                    };
                    parentNav[item.parentTitle].index = parentNav[item.parentTitle].index || index;
                }
                else {
                    $scope.navs.push({
                        icon: item.type === 'directive' ? 'fa fa-cog': 'fa fa-cog',
                        name: item.title,
                        item: item,
                        href: 'javascript:void(0);'
                    });
                }
                
            });
           
            var key;
            for(key in parentNav) {
                var index = parentNav[key].index;
                $scope.navs.splice(index, 0, parentNav[key].data);
            }
            $rootScope.navs = [{
                name: 'Scms Modules',
                children: $scope.navs
            }];

            $rootScope.$watch('currNavItem', function(newValue) {
                if(newValue) {
                    if(newValue.type === 'directive') {
                        $scope.currItem = {

                        }
                        $timeout(function() {
                            $scope.currItem = newValue;
                        })
                    }
                    else {
                        $scope.currItem = newValue;
                    }
                    
                }                    
            })
           
        }])
    }