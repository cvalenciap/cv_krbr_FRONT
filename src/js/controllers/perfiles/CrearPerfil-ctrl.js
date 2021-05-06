'use strict';

app.controller('CrearPerfilCtrl', ['$scope', '$location', '$state', '$stateParams', 'Auth', 'FunctionUtil', 'CreacionPerfilesService', CrearPerfilCtrl]);

function CrearPerfilCtrl($scope, $location, $state, $stateParams, Auth, FunctionUtil, CreacionPerfilesService) {

    var init = function () {

        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        var idPerfil = $stateParams.idPerfil;
        $scope.state = $state.current;
        $scope.params = $stateParams;

        $scope.setSubtitulo("Perfil");
        if (idPerfil == undefined){
            $scope.estadoCre = app.estados.ACTIVO;
            $scope.idCre = 0;
            $scope.codigoCre = "";
            $scope.nombreCre = "";
            $scope.descripcionCre = "";
            $scope.idSistema = "0";
            $scope.setCadena("LU0|MA0|MI0|JU0|VI0|SA0|DO0|LU1|MA1|MI1|JU1|VI1|SA1|DO1|LU2|MA2|MI2|JU2|VI2|SA2|DO2|LU3|MA3|MI3|JU3|VI3|SA3|DO3|LU4|MA4|MI4|JU4|VI4|SA4|DO4|LU5|MA5|MI5|JU5|VI5|SA5|DO5|LU6|MA6|MI6|JU6|VI6|SA6|DO6|LU7|MA7|MI7|JU7|VI7|SA7|DO7|LU8|MA8|MI8|JU8|VI8|SA8|DO8|LU9|MA9|MI9|JU9|VI9|SA9|DO9|LU10|MA10|MI10|JU10|VI10|SA10|DO10|LU11|MA11|MI11|JU11|VI11|SA11|DO11|LU12|MA12|MI12|JU12|VI12|SA12|DO12|LU13|MA13|MI13|JU13|VI13|SA13|DO13|LU14|MA14|MI14|JU14|VI14|SA14|DO14|LU15|MA15|MI15|JU15|VI15|SA15|DO15|LU16|MA16|MI16|JU16|VI16|SA16|DO16|LU17|MA17|MI17|JU17|VI17|SA17|DO17|LU18|MA18|MI18|JU18|VI18|SA18|DO18|LU19|MA19|MI19|JU19|VI19|SA19|DO19|LU20|MA20|MI20|JU20|VI20|SA20|DO20|LU21|MA21|MI21|JU21|VI21|SA21|DO21|LU22|MA22|MI22|JU22|VI22|SA22|DO22|LU23|MA23|MI23|JU23|VI23|SA23|DO23|");

            $scope.edicionPerfil = false;
            $scope.creacionPerfil = true;
            $("#cboEstado").attr('disabled', 'disabled');
        } else {
            $scope.edicionPerfil = true;
            $scope.creacionPerfil = false;
            $scope.obtenerPerfil(idPerfil);
        };

        $scope.result = {};
        $scope.usuario = [];
        $scope.permiso = [];

        $scope.obtenerSistemas();
        $scope.obtenerUsuarios();
    };

    $scope.obtenerSistemas = function () {
        $scope.limpiarAlertas();
        CreacionPerfilesService.getSistemasActivos()
            .then(function (response) {
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

    $scope.obtenerUsuariosCambiados = function(){
        var desactivados = [];
        var activados = [];
        var listaUsuarios = [];
        var usuarios = $scope.usuarioActual;
        var usuariosModificados = $scope.usuario;
        for (var i = 0; i < usuarios.length; i++) {
            var flag = false;
            for (var j = 0; j < usuariosModificados.length; j++) {
                if (usuarios[i] == usuariosModificados[j]) {
                    flag = true;
                }
            }
            if(flag == false){
                desactivados.push(usuarios[i]);
                var listaDesactivados = {};
                listaDesactivados.Id = usuarios[i];
                listaDesactivados.Estado = -1;
                listaUsuarios.push(listaDesactivados);
            }
        }
        for(var i = 0; i < usuariosModificados.length; i++){
            var flag = false;
            for(var j = 0; j < usuarios.length; j++){
                if(usuarios[j] == usuariosModificados[i]){
                    flag = true;
                }
            }
            if(flag == false){
                activados.push(usuariosModificados[i]);
                var listaActivados = {};
                listaActivados.Id = usuariosModificados[i];
                listaActivados.Estado = 0;
                listaUsuarios.push(listaActivados);
            }
        }

        return(listaUsuarios);
    };

    $scope.obtenerPermisos = function () {
        $scope.limpiarAlertas();
        CreacionPerfilesService.getPermisosActivos($scope.idSistema)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.permisos = results;
                    } else {
                        $scope.permisos = [];
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

    $scope.obtenerUsuarios = function () {
        $scope.limpiarAlertas();
        CreacionPerfilesService.getUsuariosActivos()
            .then(function (response) {
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

    $scope.constructPerfil = function(){
        var perfil = {};
        perfil.Id = $scope.idCre;
        var sistema = {};
        sistema.Id = $scope.idSistema;
        perfil.Sistema = sistema;
        perfil.Codigo = $scope.codigoCre;
        perfil.Nombre = $scope.nombreCre;
        perfil.Descripcion = $scope.descripcionCre;
        perfil.Estado = $scope.estadoCre;
        perfil.HorarioAcceso = $scope.getCadena();

        return perfil;
    };

    $scope.obtenerPerfil = function(idPerfil){
        $scope.limpiarAlertas();
        CreacionPerfilesService.getUniPerfil(idPerfil)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.idSistema = results.Sistema.Id.toString();
                        $scope.obtenerNombreSistema($scope.idSistema);
                        $scope.estadoCre = results.Estado.toString();
                        $scope.idCre = results.Id.toString();
                        $scope.codigoCre = results.Codigo;
                        $scope.nombreCre = results.Nombre;
                        $scope.descripcionCre = results.Descripcion;
                        $scope.setCadena(results.HorarioAcceso);
                        $scope.permiso = [];
                        $scope.usuario = [];
                        for (var i = 0; i < results.Permisos.length; i++) {
                            $scope.permiso.push(results.Permisos[i].Id);
                        }
                        for (var i = 0; i < results.Usuarios.length; i++) {
                            $scope.usuario.push(results.Usuarios[i].Id);
                        }
                        $scope.permisoActual = $scope.permiso;
                        $scope.usuarioActual = $scope.usuario;
                    } else {
                        $scope.addWarningAlert('No se pudo obtener el perfil', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.crearPerfil = function () {
        $scope.limpiarAlertas();
        var listaUsuarios = [];
        for(var i = 0; i < $scope.usuario.length; i++){
            var usuarioAux = {};
            usuarioAux.Id = $scope.usuario[i];
            usuarioAux.Estado = 0;
            listaUsuarios.push(usuarioAux);
        }
        var listaPermisos = [];
        for(var i = 0; i < $scope.permiso.length; i++){
            var permisoAux = {};
            permisoAux.Id = $scope.permiso[i];
            permisoAux.Estado = 0;
            listaPermisos.push(permisoAux);
        }
        var perfil = $scope.constructPerfil();
        perfil.Usuarios = listaUsuarios;
        perfil.Permisos = listaPermisos;
        CreacionPerfilesService.setPerfilNew(perfil)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: ' Registro creado',
                            text: 'Se creó el perfil satisfactoriamente'
                        });
                        $state.go('common.perfiles.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la creación del perfil', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.editarPerfil = function () {
        $scope.limpiarAlertas();
        var perfil  = $scope.constructPerfil();
        perfil.Permisos = $scope.obtenerPermisosCambiados();
        perfil.Usuarios = $scope.obtenerUsuariosCambiados();
        CreacionPerfilesService.setPerfilEdit(perfil, $scope.idCre)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: ' Registro editado',
                            text: 'Se editó el perfil satisfactoriamente'
                        });
                        $state.go('common.perfiles.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la edición del perfil', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.obtenerNombreSistema = function(nombre){
        $scope.limpiarAlertas();
        CreacionPerfilesService.getNombreSistema(nombre)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.nombreSistema = results.Nombre;
                    } else {
                        $scope.addWarningAlert('No se encontró el nombre del sistema', false);
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

    init();

}

