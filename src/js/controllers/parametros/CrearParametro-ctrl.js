'use strict';

app.controller('CrearParametroCtrl', ['$scope', '$location', '$state', '$stateParams', 'Auth', 'FunctionUtil', 'CreacionParametrosService', CrearParametroCtrl]);

function CrearParametroCtrl($scope, $location, $state, $stateParams, Auth, FunctionUtil, CreacionParametrosService) {

    var init = function () {

        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        var idParametro = $stateParams.idParametro;
        $scope.state = $state.current;
        $scope.params = $stateParams;

        if (idParametro == undefined){
            $scope.estadoCre = app.estados.ACTIVO;
            $scope.idCre = 0;
            $scope.codigoCre = "";
            $scope.nombreValorCre = "";
            $scope.paramPadreCre = 1;

            $scope.edicionParametro = false;
            $scope.creacionParametro = true;
            $("#cboEstado").attr('disabled', 'disabled');
        } else {
            $scope.edicionParametro = true;
            $scope.creacionParametro = false;
            $scope.obtenerParametro(idParametro);
        };

        $scope.result = {};
        $scope.parametros = {};

        $scope.obtenerParamPadres();
    };

    $scope.constructParametro = function(){
        var parametro = {};
        parametro.Id = $scope.idCre;
        parametro.Codigo = $scope.codigoCre;
        parametro.Valor = $scope.nombreValorCre;
        parametro.IdPadre = $scope.paramPadreCre;
        parametro.Estado = $scope.estadoCre;

        return parametro;
    };

    $scope.obtenerParametro = function(idParametro){
        $scope.limpiarAlertas();
        CreacionParametrosService.getUniParametro(idParametro)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.estadoCre = results.Estado.toString();
                        $scope.idCre = results.Id.toString();
                        $scope.codigoCre = results.Codigo;
                        $scope.nombreValorCre = results.Valor;
                        $scope.paramPadreCre = results.IdPadre;
                    } else {
                        $scope.addWarningAlert('No se pudo obtener el parámetro', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.crearParametro = function () {
        $scope.limpiarAlertas();
        CreacionParametrosService.setParametroNew($scope.constructParametro())
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: ' Registro creado',
                            text: 'Se creó el parámetro satisfactoriamente'
                        });
                        $state.go('common.parametros.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la creación del parámetro', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.editarParametro = function () {
        $scope.limpiarAlertas();
        CreacionParametrosService.setParametroEdit($scope.constructParametro(), $scope.idCre)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: ' Registro editado',
                            text: 'Se creó el parámetro satisfactoriamente'
                        });
                        $state.go('common.parametros.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la edición del parámetro', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.limpiarConsulta = function () {
        $scope.busquedaResult = false;
        $scope.haveResult = false;
        $scope.loading = false;

        //$scope.dni = "";
        $scope.result = {}

        $scope.limpiarAlertas();
    };

    $scope.getEstado = function (estado) {
        var valor;
        if (estado === 0) {
            valor = "ACTIVO";
        } else {
            if (estado === -1) {
                valor = "BLOQUEADO";
            } else {
                valor = "ELIMINADO";
            }
        }
        return valor;
    };

    $scope.getValue = function (action) {
        var Id = [];
        for (var i = 0; i < $scope.result.length; i++) {
            if ($scope.result[i].selected) {
                var idUni = $scope.result[i].Id;
                Id.push(idUni);
            }
        }
        $scope.openVarModal(Id, action);
    };

    $scope.obtenerParamPadres = function () {
        $scope.limpiarAlertas();
        CreacionParametrosService.getParametrosActivos()
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.parametros = results;
                    } else {
                        $scope.addWarningAlert('No se encontraron parámetros activos', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    init();

}