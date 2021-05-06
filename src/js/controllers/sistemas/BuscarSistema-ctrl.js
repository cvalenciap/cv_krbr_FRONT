'use strict';

app.controller('BuscarSistemaCtrl', ['$scope', 'Auth', '$sessionStorage', 'FunctionUtil', 'BusquedaSistemasService', 'CreacionParametrosService', '$uibModal', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ModalService', BuscarSistemaCtrl]);

function BuscarSistemaCtrl($scope, Auth, $sessionStorage, FunctionUtil, BusquedaSistemasService, CreacionParametrosService, $uibModal, DTOptionsBuilder, DTColumnDefBuilder, ModalService) {

    var init = function () {

        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();
        //Auth.setParametro([app.parametros.PAGINACION]);
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
        $scope.result = {};
        $scope.ActionMultiple = $scope.verificarAccionesMultiples();
        $scope.muestraEliminar = Auth.hasPermission([app.opciones.SISTELI]);
        $scope.muestraActBloq = Auth.hasPermission([app.opciones.SISTACT]);
        $scope.muestraCrear = Auth.hasPermission([app.opciones.SISTCRE]);
        $scope.muestraEditar = Auth.hasPermission([app.opciones.SISTCRE]);
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
        //Auth.setParametro([app.parametros.PAGINACION]);
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

    $scope.busquedaSistema = function () {
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

        console.log("emntra");
        console.log($scope.nombreBus);
        BusquedaSistemasService.getSearchSistemas($scope.nombreBus, $scope.estadoBus)
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
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaSistemasService', function ($scope, $uibModalInstance, ModalService, BusquedaSistemasService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cambiarEstado = function (estado) {
                    s.limpiarAlertas();
                    ModalService.cambiarUniRegistroSistema(id, estado).
                        then(function (response) {
                            var response = response.data;
                            if (response.Resultado == 1) {
                                if (estado === '0') {
                                    Growl.success({
                                        title: ' Registro activado',
                                        text: 'Se activó el sistema satisfactoriamente'
                                    });
                                } else {
                                    if (estado === '-1') {
                                        Growl.warn({
                                            title: ' Registro bloqueado',
                                            text: 'Se bloqueó el sistema satisfactoriamente'
                                        });
                                    } else {
                                        Growl.error({
                                            title: ' Registro eliminado',
                                            text: 'Se eliminó el sistema satisfactoriamente'
                                        });
                                    }
                                }
                                s.busquedaSistema();
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

    $scope.openConsultaModal = function (id) {
        var modal = 'modalConsultaSistema.html';
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaSistemasService', function ($scope, $uibModalInstance, ModalService, BusquedaSistemasService) {
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

                $scope.obtenerTD = function(id, estado){
                    $("#" + id + "").empty();
                    if (estado === 0){
                        $("#" + id + "").addClass("icon status-success");
                        $("#" + id + "").append('<i class="icon-ok"></i>');
                    } else if (estado === -1){
                        $("#" + id + "").addClass("icon status-error");
                        $("#" + id + "").append('<i class="icon-remove"></i>');
                    }
                };

                $scope.resultSistema = {};
                $scope.versionesxSistema = {};
                $scope.perfilesxSistema = {};
                $scope.permisosxSistema = {};
                $scope.consultaResult = false;
                $scope.haveConsultaResult = false;

                ModalService.consultaSistema(id).
                    then(function (response) {
                        var response = response.data;
                        if (response.Resultado == 1) {
                            $scope.consultaResult = true;
                            var results = response.data;
                            if (results.length != 0) {
                                $scope.resultSistema = results;
                                var aux = [];
                                if($scope.resultSistema.Versiones.length > 3){
                                    for (i = 0; i < 3; i++){
                                        aux.push($scope.resultSistema.Versiones[i]);
                                    }
                                }else{
                                    aux = $scope.resultSistema.Versiones;
                                }
                                $scope.versionesxSistema = aux;
                                $scope.perfilesxSistema = $scope.resultSistema.Perfiles;
                                $scope.permisosxSistema = $scope.resultSistema.Permisos;
                                $scope.haveConsultaResult = true;
                                var horariosSistema = $scope.resultSistema.HorarioAcceso;
                                var diasSem = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
                                for (var i = 0; i < 24; i++) {
                                    var indice = "00";
                                    if (i.toString().length == 1){
                                        indice = '0' + i;
                                    } else {
                                        indice = i;
                                    }
                                    $("#horarios").append('<tr class="status-info">');
                                    $("#horarios").append('<td>' + indice + ':00 - ' + indice + ':59</td>');
                                    for (var j = 0; j < diasSem.length; j++) {
                                        $('#horarios').append('<td id="td_' + diasSem[j] + i + '" class="icon status-error"><i id="i_' + diasSem[j] + i + '" class="icon-remove"></i></td>');
                                    }
                                    $("#horarios").append('</tr>');
                                }
                                horariosSistema = horariosSistema.split("|");
                                for (var k = 0; k < horariosSistema.length; k++) {
                                    $("#td_" + horariosSistema[k] + "").removeClass("icon status-error");
                                    $("#td_" + horariosSistema[k] + "").addClass("icon status-success");
                                    $("#i_" + horariosSistema[k] + "").removeClass("icon-remove");
                                    $("#i_" + horariosSistema[k] + "").addClass("icon-ok");
                                }
                            } else {
                                $scope.addWarningAlert('No se encontró el sistema con ID: ' + id, false);
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
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaSistemasService', function ($scope, $uibModalInstance, ModalService, BusquedaSistemasService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cambiarEstado = function (estado) {
                    s.limpiarAlertas();
                    ModalService.cambiarVarRegistroSistema(id, estado).
                        then(function (response) {
                            var response = response.data;
                            if (response.Resultado == 1) {
                                if (estado === '0') {
                                    Growl.success({
                                        title: ' Registros activado',
                                        text: 'Se activaron los sistemas satisfactoriamente'
                                    });
                                } else {
                                    if (estado === '-1') {
                                        Growl.warn({
                                            title: ' Registros bloqueado',
                                            text: 'Se bloquearon los sistemas satisfactoriamente'
                                        });
                                    } else {
                                        Growl.error({
                                            title: ' Registros eliminado',
                                            text: 'Se eliminaron los sistemas satisfactoriamente'
                                        });
                                    }
                                }
                                s.busquedaSistema();
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
        if(Auth.hasPermission([app.opciones.SISTACT]) == false && Auth.hasPermission([app.opciones.SISTELI]) == false){
            return false;
        }else{
            return true;
        }
    };

    $scope.formatearFecha = function (fecha) {
        var fech = new Date(fecha);
        var date = moment(fecha, 'D/M/YYYY', true).format("DD/MM/YYYY");
        return date;
    };

    jQuery.fn.dataTable.moment('D/M/YYYY');

    $("#text").bind('keyup', function (e) {
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            // I have tried setting those
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#textbox").val(($("#textbox").val()).toUpperCase());
    });

    init();

}
  