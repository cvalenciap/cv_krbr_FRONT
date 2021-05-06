/**
 * Login Controller:
 * 
 * Logica de la vista de ingreso al sistema 
 */

app.controller('LoginKerberoCtrl', ['$scope', '$rootScope', '$uibModal', 'Auth', '$sessionStorage', '$state', 'TokenRestManager', 'vcRecaptchaService', LoginKerberoCtrl]);

function LoginKerberoCtrl($scope, $rootScope, $uibModal, Auth, $sessionStorage, $state, TokenRestManager, vcRecaptchaService) {

    var appTitle = 'Home';

    var captchaWidgetId;
    $scope.user = "";
    $scope.password = "";

    $scope.appTitle = appTitle;

    $scope.loading = false;

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;

    $scope.alerts = [];

    $scope.onWidgetCreate = function(_widgetId){
        captchaWidgetId = _widgetId;
    };

    $scope.login = function () {
        $scope.limpiarAlertas();

        $scope.loading = true;
        Auth.callLogin($scope.user, $scope.password, $scope.myRecaptchaResponse)
        .then(function (response) {
                $scope.loading = false;
                var response = response.data;
            if (response.Resultado == 1) {
                TokenRestManager.setCookieRest(response.data.response.tokenString);
                var rol_generado = Auth.generateRoleFromTipo("");
                var permisos = response.data.response.opciones;

                $scope.user = { username: response.data.response.usuario, role: rol_generado, opciones: permisos, perfil: response.data.response.perfil };
                TokenRestManager.setUsuarioAuditoria(response.data.response.idUsuario);
                Auth.changeUser($scope.user);
                //Auth.obtenerNumeroParametro();
                TokenRestManager.setCookieViews(permisos);
                $scope.evaluateWidth($scope.getWidth(), true);
                $state.go('common.dashboard');
            }else {
                $scope.loading = false;
                $scope.password = '';
                vcRecaptchaService.reload(captchaWidgetId);
                $scope.addErrorAlert(response.Error);
            }
        })
        .catch(function (error) {
            $scope.loading = false;
            $scope.password = '';
            vcRecaptchaService.reload(captchaWidgetId);
            if (error.data != null) {
                $scope.addErrorAlert(error.data.Message);
            } else {
                $scope.addErrorAlert('No tiene conexion al servidor');
            }
        })
    };

    $scope.addErrorAlert = function (text) {
        $scope.alerts = [];
        $scope.alerts.push({ type: 'danger', msg: text });
    };

    $scope.closeErrorAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.limpiarAlertas = function () {
        $scope.alerts = [];
    };

}

