'use strict';

app.controller('IndexKerberoCtrl', ['$scope', 'Auth','FunctionUtil', IndexKerberoCtrl]);

function IndexKerberoCtrl($scope, Auth, FunctionUtil) {
    /**
     * Common
     */
    var appTitle = 'Inicio';
    var appSubTitle = 'CERBERO';
    var appIcon = 'icon-home';

    var init = function () {
        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        $scope.changeViewTitle(appTitle);

        $scope.changeViewSubTitle(appSubTitle);

        $scope.changeViewIcon(appIcon);

        //Auth.setParametro([app.parametros.PAGINACION]);
    };

    init();

}