
var coreTitleDirective = function($rootScope, $state) {
    return {
        restrict: 'E',
        templateUrl: 'templates/Shared/_Title.html',
        link: function() {
            $rootScope.$watch(function(){
                return $state.$current.data
            }, function(newVal, oldVal){
                if (newVal)  {
                    if ($state.$current.parent &&
                        $state.$current.parent.self &&
                        $state.$current.parent.self.data &&
                        $state.$current.parent.self.data.title) {
                        $rootScope.title = $state.$current.parent.self.data.title;
                        $rootScope.icon = $state.$current.parent.self.data.icon;
                        $rootScope.subtitle = (newVal.subtitle) ? newVal.subtitle : "";
                    } else {
                        $rootScope.title = (newVal.title) ? newVal.title : "";
                        $rootScope.icon = (newVal.icon) ? newVal.icon : "";
                        $rootScope.subtitle = (newVal.subtitle) ? newVal.subtitle : "";
                    }
                }
            })
        }
    };
};

app.directive('coreTitle', ['$rootScope', '$state', coreTitleDirective]);