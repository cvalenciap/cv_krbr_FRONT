'use strict';

var loginKerberoService = function ($http, $rootScope, $state, $q, $window, $timeout, $location, TokenRestManager) {


    var loginFactory = {};
    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = TokenRestManager.cookieUser() || { username: 'Invitado', role: userRoles.public };


    loginFactory.getMenuItems = function() {
        var menuItems = {}, states = $state.get();

        for (var i in states) {
            var name = states[i].name;

            if (states[i].data && states[i].data.menu && loginFactory.hasPermission(states[i].data.permissions)) {
                var parent = name.substring(0, name.lastIndexOf("."));
                if (menuItems[parent]) {
                    if (!menuItems[parent].items) menuItems[parent].items = {};
                    menuItems[parent].items[name] = states[i];
                } else {
                    menuItems[name] = states[i];
                }
            }
        }
        return menuItems;
    };

    loginFactory.hasPermission = function(opciones){
        var allowed = false;
        angular.forEach($rootScope.permissions, function (value, key) {
            angular.forEach(opciones, function (value1, key) {
                if(value1 == value){
                    allowed = true;
                }
            });
        });
        return allowed;
    };

    loginFactory.getParametro = function(idParametro){
        var data_request = {};
        data_request.idParametro = idParametro;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'parametro/'+data_request.idParametro,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    /*loginFactory.obtenerNumeroParametro = function(){
        console.log('entro0');
        loginFactory.getNumParametro()
            .then(function (response) {
                var response = response.data;
                if (response.Resultado == 1) {
                    var results = response.data;
                    if (results.length != 0) {
                        app.parametros.PAGINACION = results[0].Id;
                        loginFactory.setParametro([app.parametros.PAGINACION]);
                        console.log('entro1');
                    } else {
                    }
                } else {
                }
            })
            .catch(function (error) {
            });
    };

    loginFactory.setParametro = function(id){
        loginFactory.getParametro(id)
            .then(function(response){
                TokenRestManager.setCookiePaginacion(parseInt(response.data.data.Valor));
                console.log('id', id);
                console.log('response',response);
                console.log('ingresado en auth',$sessionStorage['paginacion']);
            })
            .catch(function(error){
            });
    };*/

    loginFactory.setOptions = function(permisos){
        $rootScope.permissions = permisos;
        return loginFactory.getMenuItems();

    };

    function changeUser(user) {
        TokenRestManager.setCookieUser(user);
        angular.copy(user, currentUser);
    };

    function reinituser() {
        currentUser = { username: 'Invitado', role: userRoles.public };
    }

    loginFactory.accessLevels = accessLevels;
    loginFactory.userRoles = userRoles;
    loginFactory.user = currentUser;

    var standardSuccessFunction = function (result) {
        return result;
    };

    loginFactory.changeUser = function (user) {
        changeUser(user);
    };

    loginFactory.authorize = function (accessLevel, role) {
        if (role === undefined)
            role = currentUser.role;

        return accessLevel.bitMask & role.bitMask;
    };

    loginFactory.isLoggedIn = function(user) {
        var valido = false,keepGoing=true;

        if(user === undefined)
            user = currentUser;

        angular.forEach(userRoles, function(value){
            if(keepGoing){
                if(user.role.title == value.title && value.title!='public'){
                    valido = true;
                    keepGoing = false;
                }
            }
        } );

        return valido;
    };

    loginFactory.callLogin = function (username,password,captcha) {
        var auth = {};
        auth.user = username;
        auth.pass = password;
        auth.captcha = captcha;
        //auth.type = isAdmin ? 1 : 0;
        $rootScope.usuario = username;

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'login',
            headers : { 'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'}  ,
            data: auth
        })
            .then(standardSuccessFunction);
    };

    /*loginFactory.getNumParametro = function () {
        var auth = {};

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'parametro?paramPadre=PAGINACION KERBERO&estado=0',
            headers : { 'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'}  ,
            data: auth
        })
            .then(standardSuccessFunction);
    };*/

    loginFactory.callLogout = function () {
        TokenRestManager.cleanStorage();
    };

    loginFactory.generateRoleFromTipo = function(code){
        if( code == 'ADM'  ){
            return userRoles.admin;
        }else{
            return userRoles.personal;
        }
    };

    loginFactory.deleteLocalCredentials = function () {
        TokenRestManager.cleanStorage();
    };

    return loginFactory;
};

app.factory('Auth', ['$http', '$rootScope', '$state', '$q', '$window', '$timeout', '$location', 'TokenRestManager', loginKerberoService]);

