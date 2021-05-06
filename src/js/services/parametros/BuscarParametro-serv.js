'use strict';

var busquedaParametrosService = function ($http,TokenRestManager) {

    var busquedaParametrosService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    busquedaParametrosService.getSearchParametros = function (paramPadre, estado) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.paramPadre = paramPadre;
        data_request.estado = estado;

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

    return busquedaParametrosService;


};

app.factory('BusquedaParametrosService', ['$http','TokenRestManager', busquedaParametrosService]);
