'use strict';

var busquedaPermisosService = function ($http,TokenRestManager) {

    var busquedaPermisosService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    busquedaPermisosService.getSearchPermisos = function (idSelect, codigo, nombre, estado) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.nombre = nombre;
        data_request.estado = estado;
        data_request.idSistema = idSelect;
        data_request.codigo = codigo;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'permiso?sistema='+data_request.idSistema+'&codigo='+data_request.codigo+'&nombre='+data_request.nombre+'&estado='+data_request.estado,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    busquedaPermisosService.getSistemasActivos = function () {
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

    return busquedaPermisosService;


};

app.factory('BusquedaPermisosService', ['$http','TokenRestManager', busquedaPermisosService]);

