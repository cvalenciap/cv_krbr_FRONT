'use strict';

var env = {};

// Import variables if present (from env.js)
if(window){
    Object.assign(env, window.__env);
}

var app = angular.module('KerberoWeb', ['ui.bootstrap', 'ui.router', 'ui.router.state.events','ngStorage','ngTable','ui.validate','angular-spinkit','ui.utils', 'localytics.directives', 'datatables', 'vcRecaptcha']);

app.constants = {
    backend_path : env.backend_path
};

app.help_messages = env.help_messages;

/**
 * Route configuration for the RDash module.
 */
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$qProvider',
    function($stateProvider, $urlRouterProvider,$httpProvider,$qProvider) {

        var access = routingConfig.accessLevels;
        var estados = {
            "ACTIVO": "0",
            "BLOQUEADO": "-1",
            "ELIMINADO": "-2"
        };
        /*var parametros = {
            "PAGINACION": 0
        };*/
        var opciones = {
            "SISTBUS": "SISTBUS",
            "SISTCRE": "SISTCRE",
            "PERFBUS": "PERFBUS",
            "PERFCRE": "PERFCRE",
            "PERMBUS": "PERMBUS",
            "PERMCRE": "PERMCRE",
            "USERBUS": "USERBUS",
            "USERCRE": "USERCRE",
            "PARABUS": "PARABUS",
            "PARACRE": "PARACRE",
            "AUDTBUS": "AUDTBUS",
            "SISTACT": "SISTACT",
            "SISTELI": "SISTELI",
            "PERFACT": "PERFACT",
            "PERFELI": "PERFELI",
            "PERMACT": "PERMACT",
            "PERMELI": "PERMELI",
            "USERACT": "USERACT",
            "USERELI": "USERELI"
        };
        app.opciones = opciones;
        app.estados = estados;
        //app.parametros = parametros;

        //this.opciones = opciones;
        // Anonymous routes
        $stateProvider
            .state('anon', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.anon
                }
            })
            .state('anon.login', {
                url: '/',
                templateUrl: 'templates/login.html'
            });

        // Common user routes
        $stateProvider
            .state('common', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    menu: false,
                    access: access.common
                }
            })
            .state('common.dashboard', {
                url: '/home',
                templateUrl: 'templates/dashboard.html',
                data: {
                    menu: true,
                    title: "Inicio",
                    icon: "home"
                }
            })
            .state('common.sistemas', {
                url: '/sistemas',
                abstract: true,
                data: {
                    menu: true,
                    title: "Sistemas",
                    icon: "laptop",
                    permissions: [opciones.SISTBUS, opciones.SISTCRE]
                }
            })
            .state('common.sistemas.buscar', {
                url: '/busqueda',
                templateUrl: 'templates/sistemas/BuscarSistema.html',
                data: {
                    menu: true,
                    title: "Buscar",
                    icon: "search",
                    subtitle: "Buscar Sistemas",
                    permissions: [opciones.SISTBUS]
                }
            })
            .state('common.sistemas.crear', {
                url: '/creacion',
                templateUrl: 'templates/sistemas/CrearSistema.html',
                data: {
                    menu: true,
                    title: "Crear",
                    icon: "edit",
                    subtitle: "Crear Sistema",
                    permissions: [opciones.SISTCRE]
                }
            })
            .state('common.sistemas.editar', {
                url: '/edicion/:idSistema',
                templateUrl: 'templates/sistemas/CrearSistema.html',
                data: {
                    menu: false,
                    icon: "edit",
                    subtitle: "Editar Sistema"
                }
            })
            .state('common.perfiles', {
                url: '/perfiles',
                abstract: true,
                data: {
                    menu: true,
                    title: "Perfiles",
                    icon: "group",
                    permissions: [opciones.PERFBUS, opciones.PERFCRE]
                }
            })
            .state('common.perfiles.buscar', {
                url: '/busqueda',
                templateUrl: 'templates/perfiles/BuscarPerfil.html',
                data: {
                    menu: true,
                    title: "Buscar",
                    icon: "search",
                    subtitle: "Buscar Perfiles",
                    permissions: [opciones.PERFBUS]
                }
            })
            .state('common.perfiles.crear', {
                url: '/creacion',
                templateUrl: 'templates/perfiles/CrearPerfil.html',
                data: {
                    menu: true,
                    title: "Crear",
                    icon: "edit",
                    subtitle: "Crear Perfil",
                    permissions: [opciones.PERFCRE]
                }
            })
            .state('common.perfiles.editar', {
                url: '/edicion/:idPerfil',
                templateUrl: 'templates/perfiles/CrearPerfil.html',
                data: {
                    menu: false,
                    icon: "edit",
                    subtitle: "Editar Perfil"
                }
            })
            .state('common.permisos', {
                url: '/permisos',
                abstract: true,
                data: {
                    menu: true,
                    title: "Permisos",
                    icon: "key",
                    permissions: [opciones.PERMBUS, opciones.PERMCRE]
                }
            })
            .state('common.permisos.buscar', {
                url: '/busqueda',
                templateUrl: 'templates/permisos/BuscarPermiso.html',
                data: {
                    menu: true,
                    title: "Buscar",
                    icon: "search",
                    subtitle: "Buscar Permisos",
                    permissions: [opciones.PERMBUS]
                }
            })
            .state('common.permisos.crear', {
                url: '/creacion',
                templateUrl: 'templates/permisos/CrearPermiso.html',
                data: {
                    menu: true,
                    title: "Crear",
                    icon: "edit",
                    subtitle: "Crear Permiso",
                    permissions: [opciones.PERMCRE]
                }
            })
            .state('common.permisos.editar', {
                url: '/edicion/:idPermiso',
                templateUrl: 'templates/permisos/CrearPermiso.html',
                data: {
                    menu: false,
                    icon: "edit",
                    subtitle: "Editar Permiso"
                }
            })
            .state('common.usuarios', {
                url: '/usuarios',
                abstract: true,
                data: {
                    menu: true,
                    title: "Usuarios",
                    icon: "user",
                    permissions: [opciones.USERBUS, opciones.USERCRE]
                }
            })
            .state('common.usuarios.buscar', {
                url: '/busqueda',
                templateUrl: 'templates/usuarios/BuscarUsuario.html',
                data: {
                    menu: true,
                    title: "Buscar",
                    icon: "search",
                    subtitle: "Buscar Usuarios",
                    permissions: [opciones.USERBUS]
                }
            })
            .state('common.usuarios.crear', {
                url: '/creacion',
                templateUrl: 'templates/usuarios/CrearUsuario.html',
                data: {
                    menu: true,
                    title: "Crear",
                    icon: "edit",
                    subtitle: "Crear Usuario",
                    permissions: [opciones.USERCRE]
                }
            })
            .state('common.usuarios.editar', {
                url: '/edicion/:idUsuario',
                templateUrl: 'templates/usuarios/CrearUsuario.html',
                data: {
                    menu: false,
                    icon: "edit",
                    subtitle: "Editar Usuario"
                }
            })
            .state('common.parametros', {
                url: '/parametros',
                abstract: true,
                data: {
                    menu: true,
                    title: "Parámetros",
                    icon: "list",
                    permissions: [opciones.PARABUS, opciones.PARACRE]
                }
            })
            .state('common.parametros.buscar', {
                url: '/busqueda',
                templateUrl: 'templates/parametros/BuscarParametro.html',
                data: {
                    menu: true,
                    title: "Buscar",
                    icon: "search",
                    subtitle: "Buscar Parámetros",
                    permissions: [opciones.PARABUS]
                }
            })
            .state('common.parametros.crear', {
                url: '/creacion',
                templateUrl: 'templates/parametros/CrearParametro.html',
                data: {
                    menu: true,
                    title: "Crear",
                    icon: "edit",
                    subtitle: "Crear Parámetro",
                    permissions: [opciones.PARACRE]
                }
            })
            .state('common.parametros.editar', {
                url: '/edicion/:idParametro',
                templateUrl: 'templates/parametros/CrearParametro.html',
                data: {
                    menu: false,
                    icon: "edit",
                    subtitle: "Editar Parámetro"
                }
            })
            .state('common.auditoria', {
                url: '/auditoria',
                templateUrl: 'templates/auditoria/ConsultaLog.html',
                data: {
                    menu: true,
                    title: "Auditoría",
                    icon: "eye-open",
                    subtitle: "Logs de Auditoría",
                    permissions: [opciones.AUDTBUS]
                }
            })
        ;

        $urlRouterProvider.otherwise(function ($injector, $location) {
            $injector.get('$state').transitionTo('common.dashboard', null, {
                location: false
            });
        });

        $httpProvider.interceptors.push(['$q','$location',function($q,$location) {
            return {
                responseError: function(response) {
                    var path = $location.path();
                    if( (response.status === 401 || response.status === 403
                        || response.status === 302 )&& (path!=="/") ) {
                        alert("Session expirada!")
                        sessionStorage.clear();
                        window.location.href="/";
                        //$location.path('/');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            }
        }]);

        $qProvider.errorOnUnhandledRejections(false);
    }
]).config(['vcRecaptchaServiceProvider', function(vcRecaptchaServiceProvider){
    vcRecaptchaServiceProvider.setDefaults({
        key: window.__env.recaptcha_site_key
    });
}]);

//Only needed for Breeze. Maps Q (used by default in Breeze) to Angular's $q to avoid having to call scope.$apply() 
app.run(['$q', '$rootScope', '$timeout', '$state', 'Auth',
    function ($q, $rootScope, $timeout, $state, Auth) {

        //$rootScope.$state = $state;
        $rootScope.permissions = [];
        $rootScope.help_messages = app.help_messages;//$state.go('common.dashboard');

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (!Auth.authorize(toState.data.access)) {

                $rootScope.error = "No tienes los permisos suficientes para esta opción.";
                $timeout(function() {
                    $rootScope.error = null;
                }, 4000);
                event.preventDefault();

                if(Auth.isLoggedIn()) {
                    $state.go('common.dashboard');
                }
                else {
                    $state.go('anon.login');
                }
            }
        });
    }]);