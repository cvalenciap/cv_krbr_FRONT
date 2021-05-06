'use strict';

var creacionPerfilesService = function ($http,TokenRestManager) {

    var creacionPerfilesService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    creacionPerfilesService.setPerfilNew = function (perfil) {
        var param = TokenRestManager.paramNameCookieRest();
        perfil.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = perfil;
        console.log(perfil);

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'perfil',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionPerfilesService.setPerfilEdit = function (perfil, id) {
        var param = TokenRestManager.paramNameCookieRest();
        perfil.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = perfil;
        console.log(perfil);

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'perfil/'+id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionPerfilesService.getUniPerfil = function (idPerfil) {
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

    creacionPerfilesService.getPermisosActivos = function (idSistema) {
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

    creacionPerfilesService.getUsuariosActivos = function () {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'usuario?apePaterno=&apeMaterno=&nombre=&login=&estado=0',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionPerfilesService.getSistemasActivos = function () {
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

    creacionPerfilesService.getNombreSistema = function (id) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.id =  id;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'sistema/'+data_request.id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    return creacionPerfilesService ;


};

app.factory('CreacionPerfilesService', ['$http','TokenRestManager', creacionPerfilesService]);
