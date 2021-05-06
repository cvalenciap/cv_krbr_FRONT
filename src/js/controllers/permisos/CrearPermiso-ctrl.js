'use strict';

app.controller('CrearPermisoCtrl', ['$scope', '$location', '$state', '$stateParams', 'Auth', 'FunctionUtil', 'CreacionPermisosService', CrearPermisoCtrl]);

function CrearPermisoCtrl($scope, $location, $state, $stateParams, Auth, FunctionUtil, CreacionPermisosService) {

    var init = function () {

        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        var idPermiso = $stateParams.idPermiso;
        $scope.state = $state.current;
        $scope.params = $stateParams;

        if (idPermiso == undefined){
            $scope.estadoCre = app.estados.ACTIVO;
            $scope.idCre = 0;
            $scope.codigoCre = "";
            $scope.nombreCre = "";
            $scope.descripcionCre = "";
            $scope.idSistema = "0";

            $scope.edicionPermiso = false;
            $scope.creacionPermiso = true;
            $("#cboEstado").attr('disabled', 'disabled');
        } else {
            $scope.edicionPermiso = true;
            $scope.creacionPermiso = false;
            $scope.obtenerPermiso(idPermiso);
        };

        $scope.result = {};
        $scope.usuario = [];
        $scope.perfil = [];

        $scope.obtenerSistemas();
        $scope.obtenerUsuarios();
    };

    $scope.obtenerSistemas = function () {
        $scope.limpiarAlertas();
        CreacionPermisosService.getSistemasActivos()
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

    $scope.obtenerPerfiles = function () {
        $scope.limpiarAlertas();
        CreacionPermisosService.getPerfilesActivos($scope.idSistema)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.perfiles = results;
                    } else {
                        $scope.perfiles = [];
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

    $scope.obtenerUsuarios = function () {
        $scope.limpiarAlertas();
        CreacionPermisosService.getUsuariosActivos()
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

    $scope.constructPermiso = function(){
        var permiso = {};
        permiso.Id = $scope.idCre;
        var sistema = {};
        sistema.Id = $scope.idSistema;
        permiso.Sistema = sistema;
        permiso.Codigo = $scope.codigoCre;
        permiso.Nombre = $scope.nombreCre;
        permiso.Descripcion = $scope.descripcionCre;
        permiso.Estado = $scope.estadoCre;

        return permiso;
    };

    $scope.obtenerPermiso = function(idPermiso){
        $scope.limpiarAlertas();
        CreacionPermisosService.getUniPermiso(idPermiso)
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
                        $scope.perfil = [];
                        $scope.usuario = [];
                        for (var i = 0; i < results.Perfiles.length; i++) {
                            $scope.perfil.push(results.Perfiles[i].Id);
                        }
                        for (var i = 0; i < results.Usuarios.length; i++) {
                            $scope.usuario.push(results.Usuarios[i].Id);
                        }
                        $scope.perfilActual = $scope.perfil;
                        $scope.usuarioActual = $scope.usuario;
                    } else {
                        $scope.addWarningAlert('No se pudo obtener el permiso', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.crearPermiso = function () {
        $scope.limpiarAlertas();
        var listaUsuarios = [];
        for(var i = 0; i < $scope.usuario.length; i++){
            var usuarioAux = {};
            usuarioAux.Id = $scope.usuario[i];
            usuarioAux.Estado = 0;
            listaUsuarios.push(usuarioAux);
        }
        var listaPerfiles = [];
        for(var i = 0; i < $scope.perfil.length; i++){
            var perfilAux = {};
            perfilAux.Id = $scope.perfil[i];
            perfilAux.Estado = 0;
            listaPerfiles.push(perfilAux);
        }
        var permiso = $scope.constructPermiso();
        permiso.Usuarios = listaUsuarios;
        permiso.Perfiles = listaPerfiles;
        CreacionPermisosService.setPermisoNew(permiso)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: ' Registro creado',
                            text: 'Se creó el permiso satisfactoriamente'
                        });
                        $state.go('common.permisos.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la creación del permiso', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.editarPermiso = function () {
        $scope.limpiarAlertas();
        var permiso  = $scope.constructPermiso();
        permiso.Perfiles = $scope.obtenerPerfilesCambiados();
        permiso.Usuarios = $scope.obtenerUsuariosCambiados();
        CreacionPermisosService.setPermisoEdit(permiso, $scope.idCre)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        Growl.success({
                            title: 'Registro editado',
                            text: 'Se editó el permiso satisfactoriamente'
                        });
                        $state.go('common.permisos.buscar');
                    } else {
                        $scope.addWarningAlert('No se pudo efectuar la edicion del permiso', false);
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
        CreacionPermisosService.getNombreSistema(nombre)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.nombreSistema = results.Nombre;
                    } else {
                        $scope.addWarningAlert('No se encontro el nombre del sistema', false);
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

