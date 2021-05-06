'use strict';

/**
 * Master Controller
 */

app.controller('MasterCtrl', ['$scope', '$rootScope', '$sessionStorage', 'Auth', '$location', '$state', '$timeout', 'GetOpcionesUtil', MasterCtrl]);

function MasterCtrl($scope, $rootScope, $sessionStorage, Auth, $location, $state, $timeout, GetOpcionesUtil) {

    /**
    *  Auth Logic
    */
    $scope.user = Auth.user;
    $scope.userRoles = routingConfig.userRoles;
    $scope.accessLevels = routingConfig.accessLevels;

    /**
     * Common
     */

    var appTitle = 'Inicio';
    //$scope.title = "Inicio";

    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function () {
        return window.innerWidth;
    };

    $scope.evaluateWidth = function (newValue, ignoreCookie) {
        if (!Auth.isLoggedIn()) {
            return;
        }else{
            $rootScope.menuItems = Auth.setOptions($sessionStorage['views']);
            console.log('permisos: ', $sessionStorage['views']);
        }

        if (ignoreCookie == undefined) {
            ignoreCookie = false;
        }

    };

    var init = function () {
        $scope.changeViewTitle(appTitle);
    };



    $scope.$watch($scope.getWidth, function (newValue, oldValue) {
        $scope.evaluateWidth(newValue);
    });


    window.onresize = function () {
        $scope.$apply();
    };

    $scope.changeViewTitle = function (newValue) {
        $scope.appTitle = newValue;
    };

    $scope.changeViewSubTitle = function (newValue) {
        $scope.appSubTitle = newValue;
    };

    $scope.changeViewIcon = function (newValue) {
        $scope.appIcon = newValue;
    };

    $scope.logout = function () {
        Auth.callLogout();
        $scope.evaluateWidth($scope.getWidth());
        //$scope.toggle = false;
        Auth.changeUser({ username: '', role: $scope.userRoles.public });
        $location.path("/");
    };

    init();

}