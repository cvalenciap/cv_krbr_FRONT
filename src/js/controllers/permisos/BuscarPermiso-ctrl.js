'use strict';

app.controller('BuscarPermisoCtrl', ['$scope', 'Auth', '$sessionStorage', 'FunctionUtil', 'BusquedaPermisosService', 'CreacionParametrosService', '$uibModal', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ModalService', BuscarPermisoCtrl]);

function BuscarPermisoCtrl($scope, Auth, $sessionStorage, FunctionUtil, BusquedaPermisosService, CreacionParametrosService, $uibModal, DTOptionsBuilder, DTColumnDefBuilder, ModalService) {

    var init = function () {
        $scope.existenSistemas = true;
        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        //Auth.obtenerNumeroParametro();
        $scope.dtOptions =
            DTOptionsBuilder.newOptions($sessionStorage['paginacion'])
                .withPaginationType('full_numbers')
                //.withDisplayLength($sessionStorage['paginacion'])
                .withOption("retrieve", true)
                .withOption('order', [4, 'asc'])
                .withOption("dom","<\"table-header\"fl>t<\"table-footer\"ip>")
                .withLanguageSource('js/dataTable_Spanish.json');
        $scope.dtColumnDefs =
            [DTColumnDefBuilder.newColumnDef(0).notVisible(),
                DTColumnDefBuilder.newColumnDef(1).notSortable(),
                DTColumnDefBuilder.newColumnDef(2).notSortable()];

        $scope.estadoBus = app.estados.ACTIVO+','+app.estados.BLOQUEADO;
        $scope.nombreBus = "";
        $scope.codigoBus = "";
        $scope.result = {};
        $scope.sistemas = {};
        $scope.ActionMultiple = $scope.verificarAccionesMultiples();
        $scope.muestraEliminar = Auth.hasPermission([app.opciones.PERMELI]);
        $scope.muestraActBloq = Auth.hasPermission([app.opciones.PERMACT]);
        $scope.muestraEditar = Auth.hasPermission([app.opciones.PERMCRE]);
        $scope.muestraCrear = Auth.hasPermission([app.opciones.PERMCRE]);

        $scope.busquedaResult = false;
        $scope.haveResult = false;
        $scope.loading = false;

        $scope.idCre = 0;
        $scope.codigoCre = "";
        $scope.nombreValorCre = "";
        $scope.paramPadreCre = 0;
        $scope.estadoCre = 0;
        //$scope.obtenerParametro([app.parametros.PAGINACION]);

        $scope.obtenerSistemas();
    };

    $('#dataTables').on( 'length.dt', function ( e, settings, len ) {
        $scope.nombreValorCre = len;
        //.editarParametro();
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

    $scope.obtenerSistemas = function () {
        $scope.limpiarAlertas();
        BusquedaPermisosService.getSistemasActivos()
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.sistemas = results;
                        $scope.idSistema = results[0].Id.toString();
                        $scope.existenSistemas = false;
                    } else {
                        $scope.addWarningAlert('No se encontraron sistemas activos', false);
                        $scope.existenSistemas = true;

                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.busquedaPermiso = function () {
        $scope.limpiarAlertas();

        $scope.dtOptions =
            DTOptionsBuilder.newOptions($sessionStorage['paginacion'])
                .withPaginationType('full_numbers')
                //.withDisplayLength($sessionStorage['paginacion'])
                .withOption("retrieve", true)
                .withOption('order', [4, 'asc'])
                .withOption("dom","<\"table-header\"fl>t<\"table-footer\"ip>")
                .withLanguageSource('js/dataTable_Spanish.json');
        $scope.loading = true;
        $scope.busquedaResult = false;
        $scope.haveResult = false;

        var idSelect = $scope.idSistema;
        BusquedaPermisosService.getSearchPermisos(idSelect, $scope.codigoBus, $scope.nombreBus, $scope.estadoBus)
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
                        $scope.addWarningAlert('No se encontraron resultados de la busqueda', false);
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

    $scope.openConsultaModal = function (id) {
        var modal = 'modalConsultaPermiso.html';
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaPermisosService', function ($scope, $uibModalInstance, ModalService, BusquedaPermisosService) {
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

                $scope.obtenerClassTD = function (estado){
                    var valor;
                    if (estado === 0) {
                        valor = "icon status-success";
                    } else {
                        if (estado === -1) {
                            valor = "icon status-error";
                        }
                    }
                    return valor;
                };

                $scope.obtenerClassI = function (estado){
                    var valor;
                    if (estado === 0) {
                        valor = "icon-ok";
                    } else {
                        if (estado === -1) {
                            valor = "icon-remove";
                        }
                    }
                    return valor;
                };

                $scope.resultPermiso = {};
                $scope.perfilesxPermiso = {};
                $scope.sistemaxPermiso = {};
                $scope.usuariosxPermiso = {};
                $scope.consultaResult = false;
                $scope.haveConsultaResult = false;

                ModalService.consultaPermiso(id).
                    then(function (response) {
                        var response = response.data;
                        if (response.Resultado == 1) {
                            $scope.consultaResult = true;
                            var results = response.data;
                            if (results.length != 0) {
                                $scope.resultPermiso = results;
                                $scope.perfilesxPermiso = $scope.resultPermiso.Perfiles;
                                $scope.sistemaxPermiso = $scope.resultPermiso.Sistema;
                                $scope.usuariosxPermiso = $scope.resultPermiso.Usuarios;
                                $scope.haveConsultaResult = true;
                            } else {
                                $scope.addWarningAlert('No se encontró el permiso con ID: ' + id, false);
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

    var s = $scope;
    $scope.openUniModal = function (id, action) {
        var modal = '';
        if (action == 'Activar') {
            modal = 'modalActivar.html';
        } else {
            if (action === 'Bloquear') {
                modal = 'modalBloquear.html';
            } else {
                modal = 'modalEliminar.html';
            }
        }
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaPermisosService', function ($scope, $uibModalInstance, ModalService, BusquedaPermisosService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cambiarEstado = function (estado) {
                    s.limpiarAlertas();
                    ModalService.cambiarUniRegistroPermiso(id, estado).
                        then(function (response) {
                            var response = response.data;
                            if (response.Resultado == 1) {
                                if (estado === '0') {
                                    Growl.success({
                                        title: ' Registro activado',
                                        text: 'Se activó el permiso satisfactoriamente'
                                    });
                                } else {
                                    if (estado === '-1') {
                                        Growl.warn({
                                            title: ' Registro bloqueado',
                                            text: 'Se bloqueó el permiso satisfactoriamente'
                                        });
                                    } else {
                                        Growl.error({
                                            title: ' Registro eliminado',
                                            text: 'Se eliminó el permiso satisfactoriamente'
                                        });
                                    }
                                }
                                s.busquedaPermiso();
                            } else {
                                s.addErrorAlert(response.Error, false);
                            }
                        })
                        .catch(function (error) {
                            s.addErrorAlert(error, false);
                        });
                    $uibModalInstance.close();
                }
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
        if(Id.length == 0){
            $scope.addWarningAlert('Debe seleccionar registros para ejecutar la operación', false);
        }else{
            $scope.openVarModal(Id, action);
        }
    };

    $scope.openVarModal = function (id, action) {
        var modal = '';
        if (action == 'Activar') {
            modal = 'modalActivar.html';
        } else {
            if (action === 'Bloquear') {
                modal = 'modalBloquear.html';
            } else {
                modal = 'modalEliminar.html';
            }
        }
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaPermisosService', function ($scope, $uibModalInstance, ModalService, BusquedaPermisosService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cambiarEstado = function (estado) {
                    s.limpiarAlertas();
                    ModalService.cambiarVarRegistroPermiso(id, estado).
                        then(function (response) {
                            var response = response.data;
                            if (response.Resultado == 1) {
                                if (estado === '0') {
                                    Growl.success({
                                        title: ' Registros activado',
                                        text: 'Se activaron los permisos satisfactoriamente'
                                    });
                                } else {
                                    if (estado === '-1') {
                                        Growl.warn({
                                            title: ' Registros bloqueado',
                                            text: 'Se bloquearon los permisos satisfactoriamente'
                                        });
                                    } else {
                                        Growl.error({
                                            title: ' Registros eliminado',
                                            text: 'Se eliminaron los permisos satisfactoriamente'
                                        });
                                    }
                                }
                                s.busquedaPermiso();
                            } else {
                                s.addErrorAlert(response.Error, false);
                            }
                        })
                        .catch(function (error) {
                            s.addErrorAlert(error, false);
                        });
                    $uibModalInstance.close();
                }
            }]
        })
    };

    $scope.getOption = function (estado) {
        var option = {};
        if (estado === 0) {
            option.reference = "#modal-bloquear";
            option.nombre = "Bloquear";
            option.icon = "icon-ban-circle";
        } else {
            option.reference = "#modal-activar";
            option.nombre = "Activar";
            option.icon = "icon-ok";
        }
        return option;
    };

    $scope.verificarAccionesMultiples = function(){
        if(Auth.hasPermission([app.opciones.PERMACT]) == false && Auth.hasPermission([app.opciones.PERMELI]) == false){
            return false;
        }else{
            return true;
        }
    };

    jQuery.fn.dataTable.moment('D/M/YYYY');

    init();

}