'use strict';

app.controller('CrearUsuarioCtrl', ['$scope', '$location', '$state', '$stateParams', 'Auth', 'FunctionUtil', 'CreacionUsuariosService', CrearUsuarioCtrl]);

function CrearUsuarioCtrl($scope, $location, $state , $stateParams, Auth, FunctionUtil, CreacionUsuariosService) {

    var init = function () {

        FunctionUtil.registrarFuncionesManejoAlertas($scope);

        $scope.limpiarAlertas();

        var idUsuario = $stateParams.idUsuario;
        $scope.state = $state.current;
        $scope.params = $stateParams;

        $scope.setSubtitulo("Usuario");
        if (idUsuario == undefined){
            $scope.estadoCre = app.estados.ACTIVO;
            $scope.idCre = 0;
            $scope.apPaCre = "";
            $scope.apMaCre = "";
            $scope.loginCre = "";
            $scope.nombreCre = "";
            $scope.correoCre = "";
            $scope.password = "";
            $scope.passwordCon = "";
            $scope.setCadena("LU0|MA0|MI0|JU0|VI0|SA0|DO0|LU1|MA1|MI1|JU1|VI1|SA1|DO1|LU2|MA2|MI2|JU2|VI2|SA2|DO2|LU3|MA3|MI3|JU3|VI3|SA3|DO3|LU4|MA4|MI4|JU4|VI4|SA4|DO4|LU5|MA5|MI5|JU5|VI5|SA5|DO5|LU6|MA6|MI6|JU6|VI6|SA6|DO6|LU7|MA7|MI7|JU7|VI7|SA7|DO7|LU8|MA8|MI8|JU8|VI8|SA8|DO8|LU9|MA9|MI9|JU9|VI9|SA9|DO9|LU10|MA10|MI10|JU10|VI10|SA10|DO10|LU11|MA11|MI11|JU11|VI11|SA11|DO11|LU12|MA12|MI12|JU12|VI12|SA12|DO12|LU13|MA13|MI13|JU13|VI13|SA13|DO13|LU14|MA14|MI14|JU14|VI14|SA14|DO14|LU15|MA15|MI15|JU15|VI15|SA15|DO15|LU16|MA16|MI16|JU16|VI16|SA16|DO16|LU17|MA17|MI17|JU17|VI17|SA17|DO17|LU18|MA18|MI18|JU18|VI18|SA18|DO18|LU19|MA19|MI19|JU19|VI19|SA19|DO19|LU20|MA20|MI20|JU20|VI20|SA20|DO20|LU21|MA21|MI21|JU21|VI21|SA21|DO21|LU22|MA22|MI22|JU22|VI22|SA22|DO22|LU23|MA23|MI23|JU23|VI23|SA23|DO23|");
            $scope.idSistemaPerf = "0";
            $scope.idSistemaPerm = "0";
            $scope.fechCadCre = new Date(2099, 11, 31);

            $scope.edicionUsuario = false;
            $scope.creacionUsuario = true;
            $("#cboEstado").attr('disabled', 'disabled');
        } else {
            $scope.passwordNew = "";
            $scope.passwordConfNew = "";
            $scope.edicionUsuario = true;
            $scope.creacionUsuario = false;
            $scope.obtenerUsuario(idUsuario);
        };

        $scope.result = {};
        $scope.perfil = [];
        $scope.permiso = [];
        $scope.permisosElegidos = [];
        $scope.perfilesElegidos = [];

        $scope.obtenerSistemas();
    };

    $scope.obtenerSistemas = function () {
        $scope.limpiarAlertas();
        CreacionUsuariosService.getSistemasActivos()
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.sistemasPerm = results;
                        $scope.sistemasPerf = results;
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
        var listaPermisos = [];
        var listaPermisosCambiados = [];
        angular.forEach($scope.permisosElegidos, function (value, key) {
            angular.forEach(value.permisosEl, function (value1, key) {
                listaPermisosCambiados.push(value1);

            });
        });
        angular.forEach(listaPermisosCambiados, function(value, key){
            var exists = false;
            angular.forEach($scope.permisoAux, function (value2, key) {
                if (angular.equals(value, value2)) {
                    exists = true
                }
            });
            if(exists == false){
                var listaActivados = {};
                listaActivados.Id = value;
                listaActivados.Estado = 0;
                listaPermisos.push(listaActivados);
            }
        });

        angular.forEach($scope.permisoAux, function(value, key){
            var exists = false;
            angular.forEach(listaPermisosCambiados, function (value2, key) {
                if (angular.equals(value, value2)) {
                    exists = true
                }
            });
            if (exists == false) {
                var listaDesactivados = {};
                listaDesactivados.Id = value;
                listaDesactivados.Estado = -1;
                listaPermisos.push(listaDesactivados);
            }
        });
        return(listaPermisos);
    };

    $scope.obtenerPerfilesCambiados = function(){
        var listaPerfiles = [];
        var listaPerfilesCambiados = [];
        var permisosInicio = $scope.perfilAux;
        angular.forEach($scope.perfilesElegidos, function (value, key) {
            angular.forEach(value.perfilesEl, function (value1, key) {
                listaPerfilesCambiados.push(value1);
            });
        });
        angular.forEach(listaPerfilesCambiados, function(value, key){
            var exists = false;
            angular.forEach($scope.perfilAux, function (value2, key) {
                if (angular.equals(value, value2)) {
                    exists = true
                }
            });
            if(exists == false){
                var listaActivados = {};
                listaActivados.Id = value;
                listaActivados.Estado = 0;
                listaPerfiles.push(listaActivados);
            }
        });

        angular.forEach($scope.perfilAux, function(value, key){
            var exists = false;
            angular.forEach(listaPerfilesCambiados, function (value2, key) {
                if (angular.equals(value, value2)) {
                    exists = true
                }
            });
            if (exists == false) {
                var listaDesactivados = {};
                listaDesactivados.Id = value;
                listaDesactivados.Estado = -1;
                listaPerfiles.push(listaDesactivados);
            }
        });

        return(listaPerfiles);
    };

    $scope.permisosTotalElegidos = function(){
        if(typeof $scope.permisosElegidos !== 'undefined' && $scope.permisosElegidos.length > 0){
            var exists = false;
            angular.forEach($scope.permisosElegidos, function(value, key){
                if(value.sistema == $scope.idSistemaPerm){
                    exists = true;
                };
            });
            if(exists == false) { $scope.permisosElegidos.push({"sistema": $scope.idSistemaPerm, "permisosEl": []}); }
        } else{
            $scope.permisosElegidos.push({"sistema": $scope.idSistemaPerm, "permisosEl": []});
        }

    };

    $scope.setearPermisos = function(){
        angular.forEach($scope.permisosElegidos, function(value, key){
            if(value.sistema == $scope.idSistemaPerm){
                if(typeof value.permisosEl !== 'undefined' && value.permisosEl.length > 0){
                    angular.forEach($scope.permiso, function(value1, key){
                        var exists = false;
                        angular.forEach(value.permisosEl, function(value2, key){
                            if(angular.equals(value2,value1)){
                                exists = true;
                            }
                        });
                        if(exists == false ){value.permisosEl.push(value1);}
                    });
                    angular.forEach(value.permisosEl, function(value1, key){
                        var exists = false;
                        angular.forEach($scope.permiso, function(value2, key){
                            if(angular.equals(value2,value1)){
                                exists = true;
                            }
                        });
                        if(exists == false ){
                            var idx = value.permisosEl.indexOf(value1)
                            value.permisosEl.splice(idx,1);
                        }
                    });
                }else{
                    angular.forEach($scope.permiso, function(value3, key){
                        value.permisosEl.push(value3);
                    });
                }
            }
        });
    };

    $scope.perfilesTotalElegidos = function(){
        if(typeof $scope.perfilesElegidos !== 'undefined' && $scope.perfilesElegidos.length > 0){
            var exists = false;
            angular.forEach($scope.perfilesElegidos, function(value, key){
                if(value.sistema == $scope.idSistemaPerf){
                    exists = true;
                };
            });
            if(exists == false) { $scope.perfilesElegidos.push({"sistema": $scope.idSistemaPerf, "perfilesEl": []}); }
        } else{
            $scope.perfilesElegidos.push({"sistema": $scope.idSistemaPerf, "perfilesEl": []});
        }
    };

    $scope.setearPerfiles = function(){
        angular.forEach($scope.perfilesElegidos, function(value, key){
            if(value.sistema == $scope.idSistemaPerf){
                if(typeof value.perfilesEl !== 'undefined' && value.perfilesEl.length > 0){
                    angular.forEach($scope.perfil, function(value1, key){
                        var exists = false;
                        angular.forEach(value.perfilesEl, function(value2, key){
                            if(angular.equals(value2,value1)){
                                exists = true;
                            }
                        });
                        if(exists == false ){value.perfilesEl.push(value1);}
                    });
                    angular.forEach(value.perfilesEl, function(value1, key){
                        var exists = false;
                        angular.forEach($scope.perfil, function(value2, key){
                            if(angular.equals(value2,value1)){
                                exists = true;
                            }
                        });
                        if(exists == false ){
                            var idx = value.perfilesEl.indexOf(value1)
                            value.perfilesEl.splice(idx,1);
                        }
                    });
                }else{
                    angular.forEach($scope.perfil, function(value3, key){
                        value.perfilesEl.push(value3);
                    });
                }
            }
        });
    };

    $scope.obtenerPermisos = function () {
        $scope.limpiarAlertas();
        $scope.permisosTotalElegidos();
        CreacionUsuariosService.getPermisosActivos($scope.idSistemaPerm)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.permisos = results;
                        angular.forEach($scope.permisosElegidos, function(value, key){
                            if(value.sistema == $scope.idSistemaPerm){
                                $scope.permiso = value.permisosEl;
                            };
                        });
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

    $scope.obtenerPerfiles = function () {
        $scope.limpiarAlertas();
        $scope.perfilesTotalElegidos();
        CreacionUsuariosService.getPerfilesActivos($scope.idSistemaPerf)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.perfiles = results;
                        angular.forEach($scope.perfilesElegidos, function(value, key){
                            if(value.sistema == $scope.idSistemaPerf){
                                $scope.perfil = value.perfilesEl;
                            };
                        });
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

    $scope.constructUsuario = function(){
        var usuario = {};
        usuario.Id = $scope.idCre;
        usuario.Login = $scope.loginCre;
        usuario.Nombre = $scope.nombreCre;
        usuario.Estado = $scope.estadoCre;
        usuario.ApePaterno = $scope.apPaCre;
        usuario.ApeMaterno = $scope.apMaCre;
        usuario.Email = $scope.correoCre;
        usuario.HorarioAcceso = $scope.getCadena();

        return usuario;
    };

    $scope.obtenerUsuario = function(idUsuario){
        $scope.limpiarAlertas();
        CreacionUsuariosService.getUniUsuario(idUsuario)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        $scope.estadoCre = results.Estado.toString();
                        $scope.idCre = results.Id.toString();
                        $scope.loginCre = results.Login;
                        $scope.apPaCre = results.ApePaterno;
                        $scope.apMaCre = results.ApeMaterno;
                        $scope.nombreCre = results.Nombre;
			            $scope.setCadena(results.HorarioAcceso);
                        $scope.auxFecha = results.FechaCaducidad;
                        $scope.correoCre = results.Email;
                        var array = $scope.auxFecha.split('/');
                        $scope.fechCadCre = new Date(array[2], array[1]-1, array[0]);
                        $scope.permisoAux = [];
                        $scope.perfilAux = [];
                        for (var i = 0; i < results.Permisos.length; i++) {
                            $scope.permisoAux.push(results.Permisos[i].Id);
                        }
                        for (var i = 0; i < results.Perfiles.length; i++) {
                            $scope.perfilAux.push(results.Perfiles[i].Id);
                        }
                        $scope.setearValoresInicio();
                    } else {
                        $scope.addWarningAlert('No se pudo obtener el usuario', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.setearValoresInicio = function(){
        angular.forEach($scope.permisoAux, function(value, key){
           $scope.obtenerPermisoSis(value);
        });
        angular.forEach($scope.perfilAux, function(value, key){
            $scope.obtenerPerfilSis(value);
        });
    };

    $scope.obtenerPermisoSis = function(id){
        $scope.limpiarAlertas();
        CreacionUsuariosService.getPermisosSistema(id)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        if(typeof $scope.permisosElegidos !== 'undefined' && $scope.permisosElegidos.length > 0){
                            var exists = false;
                            angular.forEach($scope.permisosElegidos, function(value, key){
                                if(value.sistema == results.Sistema.Id){
                                    exists = true;
                                };
                            });
                            if(exists == false) { $scope.permisosElegidos.push({"sistema": results.Sistema.Id, "permisosEl": []}); }
                        } else{
                            $scope.permisosElegidos.push({"sistema": results.Sistema.Id, "permisosEl": []});
                        }
                        angular.forEach($scope.permisosElegidos, function(value, key){
                            if(value.sistema == results.Sistema.Id){
                                if(typeof value.permisosEl !== 'undefined' && value.permisosEl.length > 0){
                                    var exists = false;
                                    angular.forEach(value.permisosEl, function(value1, key){
                                        if(value1 == results.Id){
                                            exists = true;
                                        }
                                    });
                                    if (exists == false){ value.permisosEl.push(results.Id); }
                                }else{
                                    value.permisosEl.push(results.Id);
                                }
                            }
                        });
                    } else {
                        $scope.addWarningAlert('No se encontro el permiso', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.obtenerPerfilSis = function(id){
        $scope.limpiarAlertas();
        CreacionUsuariosService.getPerfilesSistema(id)
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        if(typeof $scope.perfilesElegidos !== 'undefined' && $scope.perfilesElegidos.length > 0){
                            var exists = false;
                            angular.forEach($scope.perfilesElegidos, function(value, key){
                                if(value.sistema == results.Sistema.Id){
                                    exists = true;
                                };
                            });
                            if(exists == false) { $scope.perfilesElegidos.push({"sistema": results.Sistema.Id, "perfilesEl": []}); }
                        } else{
                            $scope.perfilesElegidos.push({"sistema": results.Sistema.Id, "perfilesEl": []});
                        }
                        angular.forEach($scope.perfilesElegidos, function(value, key){
                            if(value.sistema == results.Sistema.Id){
                                if(typeof value.perfilesEl !== 'undefined' && value.perfilesEl.length > 0){
                                    var exists = false;
                                    angular.forEach(value.perfilesEl, function(value1, key){
                                        if(value1 == results.Id){
                                            exists = true;
                                        }
                                    });
                                    if (exists == false){ value.perfilesEl.push(results.Id); }
                                }else{
                                    value.perfilesEl.push(results.Id);
                                }
                            }
                        });
                    } else {
                        $scope.addWarningAlert('No se encontro el perfil', false);
                    }
                } else {
                    $scope.addErrorAlert(response.Error, false);
                }
            })
            .catch(function (error) {
                $scope.addErrorAlert(error);
            });
    };

    $scope.crearUsuario = function () {
        $scope.limpiarAlertas();
        if($scope.password == $scope.passwordConf){
            var listaPerfiles = [];
            angular.forEach($scope.perfilesElegidos, function (value, key){
                angular.forEach(value.perfilesEl, function(value1, key){
                    var perfilAux = {};
                    perfilAux.Id = value1;
                    perfilAux.Estado = 0;
                    listaPerfiles.push(perfilAux);
                });
            });
            var listaPermisos = [];
            angular.forEach($scope.permisosElegidos, function (value, key){
                angular.forEach(value.permisosEl, function(value1, key){
                    var permisoAux = {};
                    permisoAux.Id = value1;
                    permisoAux.Estado = 0;
                    listaPermisos.push(permisoAux);
                });
            });
            var usuario = $scope.constructUsuario();
            usuario.Perfiles = listaPerfiles;
            usuario.Permisos = listaPermisos;
            usuario.Contrasena = $scope.password;
            usuario.FechaCaducidad = $scope.fechCadCre.toLocaleDateString();
            CreacionUsuariosService.setUsuarioNew(usuario)
                .then(function (response) {
                    var response = response.data;
                    if (response.Resultado == 1) {
                        var results = response.data;
                        if (results.length != 0) {
                            Growl.success({
                                title: ' Registro creado',
                                text: 'Se creó el usuario satisfactoriamente'
                            });
                            $state.go('common.usuarios.buscar');
                        } else {
                            $scope.addWarningAlert('No se pudo efectuar la creación del usuario', false);
                        }
                    } else {
                        $scope.addErrorAlert(response.Error, false);
                    }
                })
                .catch(function (error) {
                    $scope.addErrorAlert(error);
                });
        }else{
            $scope.password = "";
            $scope.passwordConf = "";
            $scope.addErrorAlert('El ingreso del password no coincide con la confirmación', false);
        }

    };

    $scope.editarUsuario = function () {
        $scope.limpiarAlertas();
        if($scope.passwordNew === $scope.passwordConfNew){
            var usuario  = $scope.constructUsuario();
            usuario.Permisos = $scope.obtenerPermisosCambiados();
            usuario.Perfiles = $scope.obtenerPerfilesCambiados();
            usuario.Contrasena = $scope.passwordNew;
            usuario.FechaCaducidad = $scope.fechCadCre.toLocaleDateString();
            CreacionUsuariosService.setUsuarioEdit(usuario, $scope.idCre)
                .then(function (response) {
                    var response = response.data;
                    if (response.Resultado == 1) {
                        var results = response.data;
                        if (results.length != 0) {
                            Growl.success({
                                title: ' Registro editado',
                                text: 'Se editó el usuario satisfactoriamente'
                            });
                            $state.go('common.usuarios.buscar');
                        } else {
                            $scope.addWarningAlert('No se pudo efectuar la edición del usuario', false);
                        }
                    } else {
                        $scope.addErrorAlert(response.Error, false);
                    }
                })
                .catch(function (error) {
                    $scope.addErrorAlert(error);
                });
        }else{
            $scope.passwordNew = "";
            $scope.passwordConfNew = "";
            $scope.addErrorAlert('El ingreso del nuevo password no coincide con la confirmación', false);
        }
    };

    $scope.limpiarConsulta = function () {
        $scope.busquedaResult = false;
        $scope.haveResult = false;
        $scope.loading = false;

        //$scope.dni = "";
        $scope.result = {}

        $scope.limpiarAlertas();
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        //maxDate: new Date(),
        minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.setDate1 = function(year, month, day) {
        $scope.fechCadCre = new Date(day, month, year);
    };

    $scope.format = 'dd/MM/yyyy';
    $scope.altInputFormats = ['d!/M!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    init();

}

