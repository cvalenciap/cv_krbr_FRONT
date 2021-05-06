
var coreMenuDirective = function($rootScope, $state, Auth) {
    return {
        restrict: 'E',
        templateUrl: 'templates/Shared/_Navigation.html',
        link: function() {

        }
    };
};

app.directive('coreMenu', ['$rootScope', '$state', 'Auth', coreMenuDirective]);