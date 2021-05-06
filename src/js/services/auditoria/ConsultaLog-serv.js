'use strict';

var consultaLogService = function ($http,TokenRestManager) {

    var consultaLogService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    consultaLogService.getSearchAuditoria = function (idSistema, idUsuario, fechaInicio, fechaFin) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idSistema = idSistema;
        data_request.idUsuario = idUsuario;
        data_request.fechaInicio = fechaInicio;
        data_request.fechaFin = fechaFin;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'log?sistema='+data_request.idSistema+'&usuario='+data_request.idUsuario+'&fechaInicio='+data_request.fechaInicio+'&fechaFin='+data_request.fechaFin,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    consultaLogService.getExcelAuditoria = function (idSistema, idUsuario, fechaInicio, fechaFin) {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.idSistema = idSistema;
        data_request.idUsuario = idUsuario;
        data_request.fechaInicio = fechaInicio;
        data_request.fechaFin = fechaFin;

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'log?sistema='+data_request.idSistema+'&usuario='+data_request.idUsuario+'&fechaInicio='+data_request.fechaInicio+'&fechaFin='+data_request.fechaFin,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    consultaLogService.getSistemasActivos = function () {
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

    consultaLogService.getUsuariosActivos = function () {
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.apePaterno = '';
        data_request.apeMaterno = '';
        data_request.nombre = '';
        data_request.login = '';
        data_request.estado = '0';

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'usuario?apePaterno='+ data_request.apePaterno+'&apeMaterno='+ data_request.apeMaterno+'&nombre='+ data_request.nombre+'&login='+ data_request.login+'&estado='+ data_request.estado,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);
    };

    return consultaLogService;


};

app.factory('ConsultaLogService', ['$http','TokenRestManager', consultaLogService]);