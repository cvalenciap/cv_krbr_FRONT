'use strict';

var modalService = function ($http,TokenRestManager) {

    var modalService = {};
    var standardSuccessFunction = function (result){
        return result;
    };

    modalService.cambiarUniRegistroSistema = function(id, estado){
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.id = id;
        data_request.estado = estado;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'sistema/'+ data_request.id+'/'+data_request.estado+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.consultaSistema = function(id){
        var param = TokenRestManager.paramNameCookieRest();
        var data_request = {};
        data_request.id = id;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'sistema/'+ data_request.id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.cambiarVarRegistroSistema = function(id, estado){
        console.log('Entro al Servicio');
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.Id = id;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();
        var state = estado;

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'sistemavar/'+state+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.cambiarUniRegistroPerfil = function(id, estado){
        console.log(id);
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.id = id;
        data_request.estado = estado;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'perfil/'+ data_request.id+'/'+data_request.estado+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };
    
    modalService.consultaPerfil = function(id){
        var param = TokenRestManager.paramNameCookieRest();
        var data_request = {};
        data_request.id = id;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'perfil/'+ data_request.id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.cambiarVarRegistroPerfil = function(id, estado){
        console.log('Entro al Servicio');
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.Id = id;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();
        var state = estado;

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'perfilvar/'+state+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.cambiarUniRegistroPermiso = function(id, estado){
        console.log(id);
        //$scope.changeReg(id, '0');

        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.id = id;
        data_request.estado = estado;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'permiso/'+ data_request.id+'/'+data_request.estado+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.consultaPermiso = function(id){
        var param = TokenRestManager.paramNameCookieRest();
        var data_request = {};
        data_request.id = id;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'permiso/'+ data_request.id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.cambiarVarRegistroPermiso = function(id, estado){
        console.log('Entro al Servicio');
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.Id = id;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();
        var state = estado;

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'permisovar/'+state+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.cambiarUniRegistroUsuario = function(id, estado){
        console.log(id);
        //$scope.changeReg(id, '0');

        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.id = id;
        data_request.estado = estado;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'usuario/'+ data_request.id+'/'+data_request.estado+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.consultaUsuario = function(id){
        var param = TokenRestManager.paramNameCookieRest();
        var data_request = {};
        data_request.id = id;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'usuario/'+ data_request.id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.cambiarVarRegistroUsuario = function(id, estado){
        console.log('Entro al Servicio');
        var param = TokenRestManager.paramNameCookieRest();

        var data_request = {};
        data_request.Id = id;
        data_request.idUsuario = TokenRestManager.getUsuarioAuditoria();
        var state = estado;

        return $http({
            method  : 'PUT',
            url     : app.constants.backend_path + 'usuariovar/'+state+'/'+data_request.idUsuario,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    modalService.consultaParametro = function(id){
        var param = TokenRestManager.paramNameCookieRest();
        var data_request = {};
        data_request.id = id;

        return $http({
            method  : 'GET',
            url     : app.constants.backend_path + 'parametro/'+ data_request.id,
            headers : { 'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : TokenRestManager.cookieRest() },
            data: data_request
        }).then(standardSuccessFunction);
    };

    return modalService;


};

app.factory('ModalService', ['$http','TokenRestManager', modalService]);
