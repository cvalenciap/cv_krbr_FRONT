'use strict';

var busquedaUsuariosService = function ($http,TokenRestManager) {

    var busquedaUsuariosService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    busquedaUsuariosService.getSearchUsuarios = function (apPaterno, apMaterno, nombre, login, estado) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.apPaterno = apPaterno;
        data_request.apMaterno = apMaterno;
        data_request.nombre = nombre;
        data_request.login = login;
        data_request.estado = estado;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'usuario?apePaterno='+data_request.apPaterno+'&apeMaterno='+data_request.apMaterno+'&nombre='+data_request.nombre+'&login='+data_request.login+'&estado='+data_request.estado,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    return busquedaUsuariosService;


};

app.factory('BusquedaUsuariosService', ['$http','TokenRestManager', busquedaUsuariosService]);

