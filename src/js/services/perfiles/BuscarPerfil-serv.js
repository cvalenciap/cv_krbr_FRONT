'use strict';

var busquedaPerfilesService = function ($http,TokenRestManager) {

    var busquedaPerfilesService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    busquedaPerfilesService.getSearchPerfiles = function (nombre, estado, idSelect) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.nombre = nombre;
        data_request.estado = estado;
        data_request.idSistema = idSelect;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'perfil?sistema='+data_request.idSistema+'&nombre='+data_request.nombre+'&estado='+data_request.estado,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    busquedaPerfilesService.getSistemasActivos = function () {
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

    return busquedaPerfilesService;


};

app.factory('BusquedaPerfilesService', ['$http','TokenRestManager', busquedaPerfilesService]);

