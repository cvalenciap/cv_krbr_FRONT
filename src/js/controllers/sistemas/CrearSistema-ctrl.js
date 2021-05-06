'use strict';

app.controller('CrearSistemaCtrl', ['$scope', '$location', '$state', '$stateParams', 'Auth', 'FunctionUtil', 'CreacionSistemasService', CrearSistemaCtrl]);

function CrearSistemaCtrl($scope, $location, $state , $stateParams, Auth, FunctionUtil, CreacionSistemasService) {

    var init = function () {
        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        var idSistema = $stateParams.idSistema;
        $scope.state = $state.current;
        $scope.params = $stateParams;
        $scope.setSubtitulo("Sistema");
        if (idSistema == undefined){
            $scope.versionEstado = "Ingresar Versión (*):"
            $scope.estadoCre = app.estados.ACTIVO;
            $scope.idCre = 0;
            $scope.codigoCre = "";
            $scope.nombreCre = "";
            $scope.descripcionCre = "";
            $scope.newVersionCre = "";
            $scope.setCadena("LU0|MA0|MI0|JU0|VI0|SA0|DO0|LU1|MA1|MI1|JU1|VI1|SA1|DO1|LU2|MA2|MI2|JU2|VI2|SA2|DO2|LU3|MA3|MI3|JU3|VI3|SA3|DO3|LU4|MA4|MI4|JU4|VI4|SA4|DO4|LU5|MA5|MI5|JU5|VI5|SA5|DO5|LU6|MA6|MI6|JU6|VI6|SA6|DO6|LU7|MA7|MI7|JU7|VI7|SA7|DO7|LU8|MA8|MI8|JU8|VI8|SA8|DO8|LU9|MA9|MI9|JU9|VI9|SA9|DO9|LU10|MA10|MI10|JU10|VI10|SA10|DO10|LU11|MA11|MI11|JU11|VI11|SA11|DO11|LU12|MA12|MI12|JU12|VI12|SA12|DO12|LU13|MA13|MI13|JU13|VI13|SA13|DO13|LU14|MA14|MI14|JU14|VI14|SA14|DO14|LU15|MA15|MI15|JU15|VI15|SA15|DO15|LU16|MA16|MI16|JU16|VI16|SA16|DO16|LU17|MA17|MI17|JU17|VI17|SA17|DO17|LU18|MA18|MI18|JU18|VI18|SA18|DO18|LU19|MA19|MI19|JU19|VI19|SA19|DO19|LU20|MA20|MI20|JU20|VI20|SA20|DO20|LU21|MA21|MI21|JU21|VI21|SA21|DO21|LU22|MA22|MI22|JU22|VI22|SA22|DO22|LU23|MA23|MI23|JU23|VI23|SA23|DO23|");
            $scope.edicionSistema = false;
            $scope.creacionSistema = true;
            $("#cboEstado").attr('disabled', 'disabled');
        } else {
            $scope.versionEstado = "Nueva Versión :"
            $scope.edicionSistema = true;
            $scope.creacionSistema = false;
            $scope.obtenerSistema(idSistema);
            $scope.obtenerPerfiles(idSistema);
            $scope.obtenerPermisos(idSistema);
        };

        $scope.result = {};
    };

    $scope.obtenerPermisosCambiados = function(){
        var desactivados = [];
        var activados = [];
        var listaPermisos = [];
        var permisos = $scope.permisoActual;
        var permisosModificados = $scope.permiso;
        for (var i = 0; i < permisos.length; i++) {
            var flag = false;
            for (var j = 0; j < permisosModificados.length; j++) {
                if (permisos[i] == permisosModificados[j]) {
                    flag = true;
                }
            }
            if(flag == false){
                desactivados.push(permisos[i]);
                var listaDesactivados = {};
                listaDesactivados.Id = permisos[i];
                listaDesactivados.Estado = -1;
                listaPermisos.push(listaDesactivados);
            }
        }
        for(var i = 0; i < permisosModificados.length; i++){
            var flag = false;
            for(var j = 0; j < permisos.length; j++){
                if(permisos[j] == permisosModificados[i]){
                    flag = true;
                }
            }
            if(flag == false){
                activados.push(permisosModificados[i]);
                var listaActivados = {};
                listaActivados.Id = permisosModificados[i];
                listaActivados.Estado = 0;
                listaPermisos.push(listaActivados);
            }
        }

        return(listaPermisos);
    };

    $scope.obtenerPerfilesCambiados = function(){
        var desactivados = [];
        var activados = [];
        var listaPerfiles = [];
        var perfiles = $scope.perfilActual;
        var perfilesModificados = $scope.perfil;
        for (var i = 0; i < perfiles.length; i++) {
            var flag = false;
            for (var j = 0; j < perfilesModificados.length; j++) {
                if (perfiles[i] == perfilesModificados[j]) {
                    flag = true;
                }
            }
            if(flag == false){
                desactivados.push(perfiles[i]);
                var listaDesactivados = {};
                listaDesactivados.Id = perfiles[i];
                listaDesactivados.Estado = -1;
                listaPerfiles.push(listaDesactivados);
            }
        }
        for(var i = 0; i < perfilesModificados.length; i++){
            var flag = false;
            for(var j = 0; j < perfiles.length; j++){
                if(perfiles[j] == perfilesModificados[i]){
                    flag = true;
                }
            }
            if(flag == false){
                activados.push(perfilesModificados[i]);
                var listaActivados = {};
                listaActivados.Id = perfilesModificados[i];
                listaActivados.Estado = 0;
                listaPerfiles.push(listaActivados);
            }
        }

        return(listaPerfiles);
    };

    $scope.obtenerPermisos = function (idSistema) {
        $scope.limpiarAlertas();
        CreacionSistemasService.getPermisosActivos(idSistema)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.permisos = results;
                    } else {
                        $scope.addWarningAlert('No se encontraron permisos activos', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.obtenerPerfiles = function (idSistema) {
        $scope.limpiarAlertas();
        CreacionSistemasService.getPerfilesActivos(idSistema)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.perfiles = results;
                    } else {
                        $scope.addWarningAlert('No se encontraron perfiles activos', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.constructSistema = function(){
        var sistema = {};
        sistema.Id = $scope.idCre;
        sistema.Codigo = $scope.codigoCre;
        sistema.Nombre = $scope.nombreCre;
        sistema.Descripcion = $scope.descripcionCre;
        sistema.Version = $scope.newVersionCre;
        sistema.Estado = $scope.estadoCre;
        sistema.HorarioAcceso = $scope.getCadena();
        return sistema;
    };

    $scope.obtenerSistema = function(idSistema){
        $scope.limpiarAlertas();
        CreacionSistemasService.getUniSistema(idSistema)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.estadoCre = results.Estado.toString();
                        $scope.idCre = results.Id.toString();
                        $scope.codigoCre = results.Codigo;
                        $scope.nombreCre = results.Nombre;
                        $scope.descripcionCre = results.Descripcion;
                        $scope.versionCre = results.Version;
                        $scope.setCadena(results.HorarioAcceso);
                        $scope.newVersionCre = "";
                        $scope.permiso = [];
                        $scope.perfil = [];
                        for (var i = 0; i < results.Permisos.length; i++) {
                            if(results.Permisos[i].Estado == 0){
                                $scope.permiso.push(results.Permisos[i].Id);
                            }
                        }
                        for (var i = 0; i < results.Perfiles.length; i++) {
                            if(results.Perfiles[i].Estado == 0){
                                $scope.perfil.push(results.Perfiles[i].Id);
                            }
                        }
                        $scope.permisoActual = $scope.permiso;
                        $scope.perfilActual = $scope.perfil;
                    } else {
                        $scope.addWarningAlert('No se pudo obtener el sistema', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.crearSistema = function () {
        $scope.limpiarAlertas();
        CreacionSistemasService.setSistemaNew($scope.constructSistema())
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: ' Registro creado',
                            text: 'Se creó el sistema satisfactoriamente'
                        });
                        $state.go('common.sistemas.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la creacion del sistema', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.editarSistema = function () {
        $scope.limpiarAlertas();
        var sistema  = $scope.constructSistema();
        sistema.Permisos = $scope.obtenerPermisosCambiados();
        sistema.Perfiles = $scope.obtenerPerfilesCambiados();

        CreacionSistemasService.setSistemaEdit(sistema, $scope.idCre)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: ' Registro editado',
                            text: 'Se editó el sistema satisfactoriamente'
                        });
                        $state.go('common.sistemas.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la edición del sistema', false);
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

    init();

}
  