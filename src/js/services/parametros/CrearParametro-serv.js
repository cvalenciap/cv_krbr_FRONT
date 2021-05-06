'use strict';

var creacionParametrosService = function ($http,TokenRestManager) {

    var creacionParametrosService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    creacionParametrosService.setParametroNew = function (parametro) {
        var param = TokenRestManager.paramNameCookieRest();
        parametro.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = parametro;
        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'parametro',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionParametrosService.setParametroEdit = function (parametro, id) {
        var param = TokenRestManager.paramNameCookieRest();
        parametro.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = parametro;
        console.log("parametro editar", parametro);
        console.log("id editar", id);
        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'parametro/'+id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionParametrosService.getUniParametro = function (idParametro) {
        var param = TokenRestManager.paramNameCookieRest();

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

    creacionParametrosService.getParametrosActivos = function () {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.paramPadre = '';
        data_request.estado = '0';

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'parametro?paramPadre='+ data_request.paramPadre+'&estado='+data_request.estado,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    return creacionParametrosService ;


};

app.factory('CreacionParametrosService', ['$http','TokenRestManager', creacionParametrosService]);
