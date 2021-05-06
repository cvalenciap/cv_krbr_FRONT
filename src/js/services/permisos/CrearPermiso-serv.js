'use strict';

var creacionPermisosService = function ($http,TokenRestManager) {

    var creacionPermisosService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    creacionPermisosService.setPermisoNew = function (permiso) {
        var param = TokenRestManager.paramNameCookieRest();
        permiso.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = permiso;
        console.log(permiso);

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'permiso',
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionPermisosService.setPermisoEdit = function (permiso, id) {
        var param = TokenRestManager.paramNameCookieRest();
        permiso.Usuario = TokenRestManager.getUsuarioAuditoria();
        var data_request = permiso;
        console.log(permiso);

        return $http({
            method  : 'POST',
            url     : app.constants.backend_path + 'permiso/'+id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        })
            .then(standardSuccessFunction);

    };

    creacionPermisosService.getUniPermiso = function (idPermiso) {
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

    creacionPermisosService.getPerfilesActivos = function (idSistema) {
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

    creacionPermisosService.getUsuariosActivos = function () {
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

    creacionPermisosService.getSistemasActivos = function () {
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

    creacionPermisosService.getNombreSistema = function (id) {
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

    return creacionPermisosService ;


};

app.factory('CreacionPermisosService', ['$http','TokenRestManager', creacionPermisosService]);
