'use strict';

var creacionUsuariosService = function ($http,TokenRestManager) {

    var creacionUsuariosService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    creacionUsuariosService.setUsuarioNew = function (usuario) {
        var param = TokenRestManager.paramNameCookieRest();
        usuario.User = TokenRestManager.getUsuarioAuditoria();
        var data_request = usuario;

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'usuario',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionUsuariosService.setUsuarioEdit = function (usuario, id) {
        var param = TokenRestManager.paramNameCookieRest();
        usuario.User = TokenRestManager.getUsuarioAuditoria();
        var data_request = usuario;
        console.log(usuario);

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'usuario/'+id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionUsuariosService.getUniUsuario = function (idUsuario) {
        var param = TokenRestManager.paramNameCookieRest();
        var data_request = {};
        data_request.idUsuario = idUsuario;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'usuario/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionUsuariosService.getPermisosActivos = function (idSistema) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idSistema = idSistema;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'permiso?sistema='+data_request.idSistema+'&codigo=&nombre=&estado=0',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionUsuariosService.getPerfilesActivos = function (idSistema) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idSistema = idSistema;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'perfil?sistema='+data_request.idSistema+'&codigo=&nombre=&estado=0',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionUsuariosService.getSistemasActivos = function () {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.nombre = '';
        data_request.estado = '0';

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'sistema?nombre='+ data_request.nombre+'&estado='+data_request.estado,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    creacionUsuariosService.getPermisosSistema = function (idPermiso) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idPermiso = idPermiso;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'permiso/'+data_request.idPermiso,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionUsuariosService.getPerfilesSistema = function (idPerfil) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idPerfil = idPerfil;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'perfil/'+data_request.idPerfil,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    return creacionUsuariosService ;


};

app.factory('CreacionUsuariosService', ['$http','TokenRestManager', creacionUsuariosService]);
