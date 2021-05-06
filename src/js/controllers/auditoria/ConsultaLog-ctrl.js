'use strict';

app.controller('ConsultaLogCtrl', ['$compile', '$q', '$scope', 'Auth', '$sessionStorage', 'FunctionUtil', 'ConsultaLogService', 'CreacionParametrosService', 'DTOptionsBuilder', 'DTColumnBuilder', ConsultaLogCtrl]);

function ConsultaLogCtrl($compile, $q, $scope, Auth, $sessionStorage, FunctionUtil, ConsultaLogService, CreacionParametrosService, DTOptionsBuilder, DTColumnBuilder) {


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
                .withDisplayLength($sessionStorage['paginacion'])
                .withOption("retrieve", true)
                .withOption('order', [1, 'desc'])
                .withOption('autoWidth', false)
                .withOption("dom", "<\"table-header\"fl>t<\"table-footer\"ip>")
                .withLanguageSource('js/dataTable_Spanish.json');

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('FechaCreacion').withTitle('<div>Fecha de Registro</div>').renderWith($scope.formatearFecha).withOption('width', '20%'),
            DTColumnBuilder.newColumn('Sistema').withTitle('<div>Sistema</div>').withOption('width', '14%'),
            DTColumnBuilder.newColumn('Usuario').withTitle('<div>Usuario</div>').renderWith($scope.enlaceLogin).withOption('width', '14%'),
            DTColumnBuilder.newColumn('Descripcion').withTitle('<div>Descripción</div>').withOption('width', '32%'),
            DTColumnBuilder.newColumn('Origen').withTitle('<div>Origen</div>').withOption('width', '20%')
        ];

        $scope.dtInstance = {};

        $scope.codSistema = 0;
        $scope.usuario = 0;
        $scope.result = null;
        $scope.excel = {};
        $scope.sistemas = {};
        $scope.usuarios = {};
        $scope.busquedaResult = false;
        $scope.loading = false;

        $scope.idCre = 0;
        $scope.codigoCre = "";
        $scope.nombreValorCre = "";
        $scope.paramPadreCre = 0;
        $scope.estadoCre = 0;
        //$scope.obtenerParametro([app.parametros.PAGINACION]);

        $scope.obtenerSistemas();
        $scope.obtenerUsuarios();
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

    $scope.today1 = function () {
        $scope.fechaInicioBus = new Date();
    };
    $scope.today2 = function () {
        var fechaAux = new Date();
        var ano = fechaAux.getFullYear();
        $scope.fechaFinalBus = new Date(ano, 11, 31);
        $scope.fechaBloq = $scope.fechaFinalBus;
    };
    $scope.today1();
    $scope.today2();

    $scope.clear1 = function () {
        $scope.fechaInicioBus = null;
    };
    $scope.clear2 = function () {
        $scope.fechaFinalBus = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: $scope.fechaBloq,
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate1 = function (year, month, day) {
        $scope.fechaInicioBus = new Date(day, month, year);
    };

    $scope.setDate2 = function (year, month, day) {
        $scope.fechaFinalBus = new Date(day, month, year);
    };

    $scope.format = 'dd/MM/yyyy';
    $scope.altInputFormats = ['d!/M!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.formatearFecha = function (data, type, full, meta) {
        var date = moment(data).format("DD/MM/YYYY h:mm:ss A");
        return date;
    };

    $scope.obtenerSistemas = function () {
        $scope.limpiarAlertas();
        ConsultaLogService.getSistemasActivos()
            .then(function (response) {
                //$scope.loading = false;
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.sistemas = results;
                    } else {
                        $scope.addWarningAlert('No se encontraron sistemas activos', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.obtenerUsuarios = function () {
        $scope.limpiarAlertas();
        ConsultaLogService.getUsuariosActivos()
            .then(function (response) {
                //$scope.loading = false;
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.usuarios = results;
                    } else {
                        $scope.addWarningAlert('No se encontraron usuarios activos', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.consultaLog = function () {
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
                })
                .withOption('headerCallback', function (header) {
                    if (!$scope.headerCompiled) {
                        $scope.headerCompiled = true;
                        $compile(angular.element(header).contents())($scope);
                    }
                })
                .withDisplayLength($sessionStorage['paginacion'])
                .withOption("retrieve", true)
                .withOption('order', [1, 'desc'])
                .withOption('autoWidth', false)
                .withOption("dom", "<\"table-header\"fl>t<\"table-footer\"ip>")
                .withLanguageSource('js/dataTable_Spanish.json');

        var idSelectSistema = $scope.codSistema;
        var idSelectUsuario = $scope.usuario;
        var fechaInicio = $scope.fechaInicioBus.toLocaleDateString();
        var fechaFinal = $scope.fechaFinalBus.toLocaleDateString();

        $scope.dtInstance.changeData(function () {
            var defer = $q.defer();
            ConsultaLogService.getSearchAuditoria(idSelectSistema, idSelectUsuario, fechaInicio, fechaFinal)
                .then(function (result) {
                    var response = result.data;
                    if (response.Resultado == 1) {
                        var results = response.data;
                        if (results.length != 0) {
                            $scope.result = results;
                            defer.resolve(result.data.data);
                        } else {
                            $scope.result = [];
                            $scope.addWarningAlert('No se encontraron resultados de la búsqueda', false);
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
    };

    $scope.exportarExcel = function () {
        $scope.limpiarAlertas();

        $scope.loading = true;
        $scope.exportExcel = false;
        $scope.busquedaResult = false;

        var idSelectSistema = $scope.codSistema;
        var idSelectUsuario = $scope.usuario;
        var fechaInicio = $scope.fechaInicioBus.toLocaleDateString();
        var fechaFinal = $scope.fechaFinalBus.toLocaleDateString();
        ConsultaLogService.getExcelAuditoria(idSelectSistema, idSelectUsuario, fechaInicio, fechaFinal)
            .then(function (response) {
                $scope.loading = false;
                var response = response.data;
                if (response.Resultado == 1) {
                    $scope.exportExcel = true;
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.excel = results;
                        $scope.busquedaResult = true;

                        var byteArray = new Uint8Array(results);
                        var a = window.document.createElement('a');
                        a.href = window.URL.createObjectURL(new Blob([byteArray], {type: 'application/octet-stream'}));
                        a.download = "LogAuditoria.xlsx";
                        document.body.appendChild(a)
                        a.click();
                        document.body.removeChild(a)

                    } else {
                        $scope.addWarningAlert('No se encontraron resultados de la búsqueda', false);
                        $scope.busquedaResult = false;
                    }
                } else {
                    $scope.exportExcel = false;
                    $scope.busquedaResult = false;
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.loading = false;
                $scope.exportExcel = false;
                $scope.busquedaResult = false;
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

    jQuery.fn.dataTable.moment('D/M/YYYY h:mm:ss A');

    init();

}
  