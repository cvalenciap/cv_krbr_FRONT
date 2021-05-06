'use strict';

app.controller('BuscarUsuarioCtrl', ['$compile', '$q', '$scope', 'Auth', '$sessionStorage', 'FunctionUtil', 'BusquedaUsuariosService', 'CreacionParametrosService', '$uibModal', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'ModalService', BuscarUsuarioCtrl]);

function BuscarUsuarioCtrl($compile, $q, $scope, Auth, $sessionStorage, FunctionUtil, BusquedaUsuariosService, CreacionParametrosService, $uibModal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, ModalService) {

    var init = function () {

        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        //Auth.obtenerNumeroParametro();

        $scope.dtOptions =
            DTOptionsBuilder
                .fromFnPromise(function () {
                    var defer = $q.defer();
                    defer.resolve('');
                    return defer.promise;
                })
                .withPaginationType('full_numbers')
                .withOption('createdRow', function (row, data, dataIndex) {
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('headerCallback', function (header) {
                    if (!$scope.headerCompiled) {
                        $scope.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }

                })
                .withOption('fnDrawCallback', function () {
                    $scope.loading = false;
                    if ($scope.result === null) {
                        $scope.busquedaResult = false;
                    } else if($scope.result && $scope.result.length == 0){
                        $scope.busquedaResult = false;
                    } else {
                        $scope.busquedaResult = true;
                    }
                })
                //.withDisplayLength($sessionStorage['paginacion'])
                .withOption("retrieve", true)
                .withOption('order', [3, 'asc'])
                .withOption('autoWidth', false)
                .withOption("dom", "<\"table-header\"fl>t<\"table-footer\"ip>")
                .withLanguageSource('js/dataTable_Spanish.json');

        $scope.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle('<div class="btn-group">' +
                '<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown"><i class="icon-check"></i></button>' +
                '<ul class="dropdown-menu">' +
                '<li ng-show="muestraActBloq"><a data-toggle="modal" data-ng-click="getValue(' + '\'' + 'Activar' + '\'' + ')" value="Get"><i class="icon-ok"></i> Activar</a></li>' +
                '<li ng-show="muestraActBloq"><a data-toggle="modal" data-ng-click="getValue(' + '\'' + 'Bloquear' + '\'' + ')" value="Get"><i class="icon-ban-circle"></i> Bloquear</a></li>' +
                '<li class="divider"></li>' +
                '<li ng-show="muestraEliminar"><a data-toggle="modal" data-ng-click="getValue(' + '\'' + 'Eliminar' + '\'' + ')" value="Get"><i class="icon-trash"></i> Eliminar</a></li>' +
                '</ul>' +
                '</div>').notSortable().renderWith($scope.checkboxHtml).withOption('sWidth', '3%'),
            DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith($scope.multipleButtonHtml).withOption('width', '3%'),
            DTColumnBuilder.newColumn('Id').withTitle('<div>ID</div>').withOption('width', '4%').withClass('center'),
            DTColumnBuilder.newColumn(null).withTitle('<div>Login</div>').renderWith($scope.enlaceLogin).withOption('width', '15%'),
            DTColumnBuilder.newColumn('NombreCompleto').withTitle('<div>Nombre Completo</div>').withOption('width', '29%'),
            DTColumnBuilder.newColumn('FechaCaducidad').withTitle('<div>Fecha de Caducidad</div>').withOption('width', '13%').withClass('center'),
            DTColumnBuilder.newColumn('Estado').withTitle('<div>Estado</div>').renderWith($scope.getEstado).withOption('width', '10%').withClass('center'),
            DTColumnBuilder.newColumn('FechaRegistro').withTitle('<div>Fecha de Registro</div>').withOption('width', '13%').withClass('center')
        ];

        $scope.dtInstance = {};

        $scope.estadoBus = app.estados.ACTIVO + ',' + app.estados.BLOQUEADO + ',' + app.estados.ELIMINADO;
        $scope.nombreBus = "";
        $scope.apPaterno = "";
        $scope.apMaterno = "";
        $scope.loginBus = "";
        $scope.result = null;
        $scope.ActionMultiple = $scope.verificarAccionesMultiples();
        $scope.muestraEliminar = Auth.hasPermission([app.opciones.USERELI]);
        $scope.muestraActBloq = Auth.hasPermission([app.opciones.USERACT]);
        $scope.muestraCrear = Auth.hasPermission([app.opciones.USERCRE]);
        $scope.muestraEditar = Auth.hasPermission([app.opciones.USERCRE]);
        $scope.busquedaResult = false;
        $scope.loading = false;

        $scope.idCre = 0;
        $scope.codigoCre = "";
        $scope.nombreValorCre = "";
        $scope.paramPadreCre = 0;
        $scope.estadoCre = 0;
        //$scope.obtenerParametro([app.parametros.PAGINACION]);
    };

    $('#dataTables').on('length.dt', function (e, settings, len) {
        $scope.nombreValorCre = len;
        //$scope.editarParametro();
        //Auth.obtenerNumeroParametro();
    });

    /*$scope.constructParametro = function () {
        var parametro = {};
        parametro.Id = $scope.idCre;
        parametro.Codigo = $scope.codigoCre;
        parametro.Valor = $scope.nombreValorCre;
        parametro.IdPadre = $scope.paramPadreCre;
        parametro.Estado = $scope.estadoCre;
        return parametro;
    };

    $scope.obtenerParametro = function (idParametro) {
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

    $scope.busquedaUsuario = function () {
        if ($scope.nombreBus == "" && $scope.apPaterno == "" && $scope.apMaterno == "" && $scope.loginBus == ""){
            $scope.addErrorAlert("Debe ingresar al menos un filtro para realizar la búsqueda", false);
        } else{
            $scope.limpiarAlertas();
            $scope.loading = true;
            $scope.busquedaResult = false;

            $scope.dtOptions =
                DTOptionsBuilder
                    .fromFnPromise(function () {
                        var defer = $q.defer();
                        defer.resolve('');
                        return defer.promise;
                    })
                    .withPaginationType('full_numbers')
                    .withOption('createdRow', function (row, data, dataIndex) {
                        $compile(angular.element(row).contents())($scope);
                        console.log('entra compile');
                    })
                    .withOption('headerCallback', function (header) {
                        if (!$scope.headerCompiled) {
                            $scope.headerCompiled = true;
                            $compile(angular.element(header).contents())($scope);
                        }
                        console.log('entra header');
                    })
                    //.withDisplayLength($sessionStorage['paginacion'])
                    .withOption("retrieve", true)
                    .withOption('order', [3, 'asc'])
                    .withOption('autoWidth', false)
                    .withOption("dom", "<\"table-header\"fl>t<\"table-footer\"ip>")
                    .withLanguageSource('js/dataTable_Spanish.json');

            $scope.dtInstance.changeData(function () {
                var defer = $q.defer();
                BusquedaUsuariosService.getSearchUsuarios($scope.apPaterno, $scope.apMaterno, $scope.nombreBus, $scope.loginBus, $scope.estadoBus)
                    .then(function (result) {
                        var response = result.data;
                        if (response.Resultado == 1) {
                            var results = response.data;
                            if (results.length != 0) {
                                $scope.result = results;
                                defer.resolve(result.data.data);
                            } else {
                                $scope.result = [];
                                $scope.addWarningAlert('No se encontraron resultados de la busqueda', false);
                                defer.resolve('');
                            }
                        } else {
                            $scope.result = null;
                            $scope.addErrorAlert(response.Error, false);
                            defer.resolve('');
                        }
                    })
                    .catch(function (error) {
                        $scope.result = null;
                        $scope.addErrorAlert(error);
                        defer.resolve('');
                    });
                return defer.promise;
            });
        }
    };

    $scope.openConsultaModal = function (id) {


        var modal = 'modalConsultaUsuario.html';
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaUsuariosService', function ($scope, $uibModalInstance, ModalService, BusquedaUsuariosService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.obtenerEstado = function (estado) {
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

                $scope.obtenerTD = function (id, estado) {
                    $("#" + id + "").empty();
                    if (estado === 0) {
                        $("#" + id + "").addClass("icon status-success");
                        $("#" + id + "").append('<i class="icon-ok"></i>');
                    } else if (estado === -1) {
                        $("#" + id + "").addClass("icon status-error");
                        $("#" + id + "").append('<i class="icon-remove"></i>');
                    }
                };

                $scope.resultUsuario = {};
                $scope.perfilesxUsuario = {};
                $scope.permisosxUsuario = {};
                $scope.consultaResult = false;
                $scope.haveConsultaResult = false;

                ModalService.consultaUsuario(id).
                    then(function (response) {
                        var response = response.data;
                        if (response.Resultado == 1) {
                            $scope.consultaResult = true;
                            var results = response.data;
                            if (results.length != 0) {
                                $scope.resultUsuario = results;
                                $scope.perfilesxUsuario = $scope.resultUsuario.Perfiles;
                                $scope.permisosxUsuario = $scope.resultUsuario.Permisos;
                                $scope.haveConsultaResult = true;
                                var horariosUsuario = $scope.resultUsuario.HorarioAcceso;
                                var diasSem = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
                                for (var i = 0; i < 24; i++) {
                                    var indice = "00";
                                    if (i.toString().length == 1) {
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
                                horariosUsuario = horariosUsuario.split("|");
                                for (var k = 0; k < horariosUsuario.length; k++) {
                                    $("#td_" + horariosUsuario[k] + "").removeClass("icon status-error");
                                    $("#td_" + horariosUsuario[k] + "").addClass("icon status-success");
                                    $("#i_" + horariosUsuario[k] + "").removeClass("icon-remove");
                                    $("#i_" + horariosUsuario[k] + "").addClass("icon-ok");
                                }
                            } else {
                                $scope.addWarningAlert('No se encontró el usuario con ID: ' + id, false);
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

        console.log(modal);
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaUsuariosService', function ($scope, $uibModalInstance, ModalService, BusquedaUsuariosService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cambiarEstado = function (estado) {
                    s.limpiarAlertas();

                    ModalService.cambiarUniRegistroUsuario(id, estado).
                        then(function (response) {
                            var response = response.data;
                            console.log(response);
                            if (response.Resultado == 1) {
                                if (estado === '0') {
                                    console.log("ya estamos");
                                    Growl.success({
                                        title: ' Registro activado',
                                        text: 'Se activó el usuario satisfactoriamente'
                                    });
                                    console.log('mensaje');
                                } else {
                                    if (estado === '-1') {
                                        Growl.warn({
                                            title: ' Registro bloqueado',
                                            text: 'Se bloqueó el usuario satisfactoriamente'
                                        });
                                    } else {
                                        Growl.error({
                                            title: ' Registro eliminado',
                                            text: 'Se eliminó el usuario satisfactoriamente'
                                        });
                                    }
                                }
                                s.busquedaUsuario();
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

    $scope.getEstado = function (data, type, full, meta) {
        $scope.result[data.id] = data;
        //console.log(data);
        var valor;
        if (data === 0) {
            valor = "ACTIVO";
        } else {
            if (data === -1) {
                valor = "BLOQUEADO";
            } else {
                valor = "ELIMINADO";
            }
        }
        return valor;
    };

    $scope.getValue = function (action) {
        var result = []
        $(document).ready(function () {
            var tableControl = document.getElementById('dataTables');

            $('input:checkbox:checked', tableControl).each(function () {
                result.push($(this).val());
            });

        });
        console.log('array', result);
        if(result.length == 0){
            $scope.addWarningAlert('Debe seleccionar registros para ejecutar la operación', false);
        }else{
            $scope.openVarModal(result, action);
        }
    };

    $scope.openVarModal = function (id, action) {
        console.log('action de varios modales', action);
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
        console.log('modal' + modal);
        var modalInstance = $uibModal.open({
            templateUrl: modal,
            controller: ['$scope', '$uibModalInstance', 'ModalService', 'BusquedaUsuariosService', function ($scope, $uibModalInstance, ModalService, BusquedaUsuariosService) {
                $scope.identificador = id;
                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.cambiarEstado = function (estado) {
                    s.limpiarAlertas();
                    ModalService.cambiarVarRegistroUsuario(id, estado).
                        then(function (response) {
                            var response = response.data;
                            console.log(response);
                            if (response.Resultado == 1) {
                                if (estado === '0') {
                                    Growl.success({
                                        title: ' Registros activados',
                                        text: 'Se activaron los usuarios satisfactoriamente'
                                    });
                                    console.log('mensaje');
                                } else {
                                    if (estado === '-1') {
                                        Growl.warn({
                                            title: ' Registros bloqueados',
                                            text: 'Se bloquearon los usuarios satisfactoriamente'
                                        });
                                    } else {
                                        Growl.error({
                                            title: ' Registros eliminados',
                                            text: 'Se eliminaron los usuarios satisfactoriamente'
                                        });
                                    }
                                }
                                s.busquedaUsuario();
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

    $scope.verificarAccionesMultiples = function () {
        if (Auth.hasPermission([app.opciones.USERACT]) == false && Auth.hasPermission([app.opciones.USERELI]) == false) {
            return false;
        } else {
            return true;
        }
    };

    $scope.checkboxHtml = function (data, type, full, meta) {
        $scope.result[data.id] = data;
        return '<input type="checkbox" class="icheck" id="chkPermiso_' + data.Id + '" value="' + data.Id + '">'; //ng-model="'+data.selected+'"
    }

    $scope.multipleButtonHtml = function (data, type, full, meta) {
        $scope.result[data.id] = data;
        return '<div class="btn-group">' +
            '<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">' +
            '<i class="icon-cogs">' + '</i>' + '</button>' +
            '<ul class="dropdown-menu">' +
            '<li>' + '<a data-toggle="modal" data-ng-click="openConsultaModal(' + data.Id + ')">' +
            '<i class="icon-eye-open">' + '</i>' + ' Ver Detalle</a>' + '</li>' +
            '<li ng-show="muestraActBloq">' + '<a data-toggle="modal" ng-click="openUniModal(' + data.Id + ', \'' + $scope.getOption(data.Estado).nombre + '\')" >' +
            '<i class="' + $scope.getOption(data.Estado).icon + '">' +
            '</i>' + $scope.getOption(data.Estado).nombre + '</a>' + '</li>' +
            '<li ng-show="muestraEditar">' + '<a ui-sref="common.usuarios.editar({idUsuario: ' + data.Id + '})">' +
            '<i class="icon-edit">' + '</i>' + ' Editar</a>' + '</li>' +
            '<li ng-show="muestraEliminar" class="divider">' + '</li>' +
            '<li ng-show="muestraEliminar">' + '<a data-toggle="modal" ng-click="openUniModal(' + data.Id + ', \'' + 'Eliminar' + '\')">' +
            '<i ng-click="" class="icon-trash">' + '</i> Eliminar</a>' + '</li>' +
            '</ul>' +
            '</div>'
            ;
    }

    $scope.enlaceLogin = function (data, type, full, meta) {
        $scope.result[data.id] = data;
        return '<a data-toggle="modal" data-ng-click="openConsultaModal(' + data.Id + ')">' + data.Login + '</a>';
    }

    jQuery.fn.dataTable.moment('D/M/YYYY');

    //$('#dataTables').dataTable( {
    //    "initComplete": function( settings, json ) {
    //        $scope.busquedaResult = true;
    //        $scope.haveResult = true;
    //        $scope.loading = false;
    //    }
    //} );

    init();

}
  