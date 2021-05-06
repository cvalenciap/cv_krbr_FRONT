'use strict';

app.controller('BuscarParametroCtrl', ['$scope', 'Auth', '$sessionStorage', 'FunctionUtil', 'BusquedaParametrosService', 'CreacionParametrosService', '$uibModal', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ModalService', BuscarParametroCtrl]);

function BuscarParametroCtrl($scope, Auth, $sessionStorage, FunctionUtil, BusquedaParametrosService, CreacionParametrosService, $uibModal, DTOptionsBuilder, DTColumnDefBuilder, ModalService) {

    var init = function () {

        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        //Auth.obtenerNumeroParametro();
        $scope.dtOptions =
            DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                //.withDisplayLength($sessionStorage['paginacion'])
                .withOption("retrieve", true)
                .withOption('order', [3, 'asc'])
                .withOption("dom","<\"table-header\"fl>t<\"table-footer\"ip>")
                .withLanguageSource('js/dataTable_Spanish.json');
        $scope.dtColumnDefs =
            [DTColumnDefBuilder.newColumnDef(0).notVisible(),
                DTColumnDefBuilder.newColumnDef(1).notSortable()];

        $scope.estadoBus = app.estados.ACTIVO+','+app.estados.BLOQUEADO;
        $scope.paramPadreBus = "";
        $scope.result = {};
        $scope.muestraCrear = Auth.hasPermission([app.opciones.PARACRE]);
        $scope.muestraEditar = Auth.hasPermission([app.opciones.PARACRE]);
        $scope.busquedaResult = false;
        $scope.haveResult = false;
        $scope.loading = false;

        $scope.idCre = 0;
        $scope.codigoCre = "";
        $scope.nombreValorCre = "";
        $scope.paramPadreCre = 0;
        $scope.estadoCre = 0;
        //$scope.obtenerParametro([app.parametros.PAGINACION]);

    };

    $('#dataTables').on( 'length.dt', function ( e, settings, len ) {
        $scope.nombreValorCre = len;
        //$scope.editarParametro();
        //Auth.obtenerNumeroParametro();
    });

    /*$scope.constructParametro = function(){
        var parametro = {};
        parametro.Id = $scope.idCre;
        parametro.Codigo = $scope.codigoCre;
        parametro.Valor = $scope.nombreValorCre;
        parametro.IdPadre = $scope.paramPadreCre;
        parametro.Estado = $scope.estadoCre;
        return parametro;
    };

    $scope.obtenerParametro = function(idParametro){
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
                    }
                } else {
                }
            })
            .catch(function (error) {
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
                    } else {
                    }
                } else {
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };*/

    $scope.busquedaParametro = function () {
        $scope.limpiarAlertas();

        $scope.dtOptions =
            DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                //.withDisplayLength($sessionStorage['paginacion'])
                .withOption("retrieve", true)
                .withOption('order', [3, 'asc'])
                .withOption("dom","<\"table-header\"fl>t<\"table-footer\"ip>")
                .withLanguageSource('js/dataTable_Spanish.json');
        $scope.loading = true;
        $scope.busquedaResult = false;
        $scope.haveResult = false;

        BusquedaParametrosService.getSearchParametros($scope.paramPadreBus, $scope.estadoBus)
            .then(function (response) {
                $scope.loading = false;
                var response = response.data;
                if (response.Resultado == 1) {
                    $scope.busquedaResult = true;
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.result = results;
                        $scope.haveResult = true;
                    } else {
                        $scope.addWarningAlert('No se encontraron resultados de la búsqueda', false);
                        $scope.haveResult = false;
                    }
                } else {
                    $scope.busquedaResult = false;
                    $scope.haveResult = false;
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.loading = false;
                $scope.busquedaResult = false;
                $scope.haveResult = false;
                $scope.addErrorAlert(error);
            });
    };

    var s = $scope;
    $scope.openConsultaModal = function (id) {
        var modal = 'modalConsultaParametro.html';
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaParametrosService', function ($scope, $uibModalInstance, ModalService, BusquedaParametrosService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.obtenerEstado = function (estado){
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

                $scope.resultParametro = {};
                $scope.consultaResult = false;
                $scope.haveConsultaResult = false;

                ModalService.consultaParametro(id).
                    then(function (response) {
                        var response = response.data;
                        if (response.Resultado == 1) {
                            $scope.consultaResult = true;
                            var results = response.data;
                            if (results.length != 0) {
                                $scope.resultParametro = results;
                                $scope.haveConsultaResult = true;
                            } else {
                                $scope.addWarningAlert('No se encontró el parámetro con ID: ' + id, false);
                                $scope.haveConsultaResult = false;
                            }
                        } else {
                            $scope.consultaResult = false;
                            $scope.haveConsultaResult = false;
                            $scope.addErrorAlert(response.Error, false);
                        }
                    })
                    .catch(function (error) {
                        $scope.loading = false;
                        $scope.consultaResult = false;
                        $scope.haveConsultaResult = false;
                        $scope.addErrorAlert(error);
                    });
            }]
        })
    };

    $scope.limpiarConsulta = function () {
        $scope.busquedaResult = false;
        $scope.haveResult = false;
        $scope.loading = false;

        //$scope.dni = "";
        $scope.result = {}

        $scope.limpiarAlertas();
    };

    $scope.bloquearPadre = function(nombrePadre) {
        if (nombrePadre === ""){
            $scope.muestraEditar = false;
        } else {
            $scope.muestraEditar = Auth.hasPermission([app.opciones.PARACRE]);
        }
    }

    jQuery.fn.dataTable.moment('D/M/YYYY');

    init();

}
