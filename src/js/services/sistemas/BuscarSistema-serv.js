'use strict';

var busquedaSistemasService = function ($http,TokenRestManager) {

    var busquedaSistemasService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    busquedaSistemasService.getSearchSistemas = function (nombre, estado) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.nombre = nombre;
        data_request.estado = estado;

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

    return busquedaSistemasService;


};

app.factory('BusquedaSistemasService', ['$http','TokenRestManager', busquedaSistemasService]);
