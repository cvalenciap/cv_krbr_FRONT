'use strict';

var creacionSistemasService = function ($http,TokenRestManager) {

    var creacionSistemasService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    creacionSistemasService.setSistemaNew = function (sistema) {
        var param = TokenRestManager.paramNameCookieRest();
        sistema.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = sistema;

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'sistema',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionSistemasService.setSistemaEdit = function (sistema, id) {
        var param = TokenRestManager.paramNameCookieRest();
        sistema.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = sistema;

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'sistema/'+id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionSistemasService.getUniSistema = function (idSistema) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idSistema = idSistema;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'sistema/'+data_request.idSistema,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionSistemasService.getPermisosActivos = function (idSistema) {
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

    creacionSistemasService.getPerfilesActivos = function (idSistema) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idSistema = idSistema;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'perfil?sistema='+data_request.idSistema+'&nombre=&estado=0',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    return creacionSistemasService ;


};

app.factory('CreacionSistemasService', ['$http','TokenRestManager', creacionSistemasService]);
