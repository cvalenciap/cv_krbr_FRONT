'use strict';

var tokenRestManager = function ($sessionStorage) {
    var tokenFactory = {};

    tokenFactory.setCookieRest = function (new_cookie) {
        $sessionStorage['token-kerbero'] = new_cookie;
    };

    tokenFactory.cookieRest = function () {
        return $sessionStorage['token-kerbero'];
    };

    tokenFactory.cookieUser = function () {
        return $sessionStorage['user'];
    };

    tokenFactory.cookieViews = function () {
        return $sessionStorage['views'];
    };

    tokenFactory.cookiePaginacion = function () {
        return $sessionStorage['paginacion'];
    };

    tokenFactory.cleanStorage = function () {
        delete $sessionStorage['token-kerbero'];
        delete $sessionStorage['user'];
    };

    tokenFactory.setCookieUser = function (user) {
        $sessionStorage['user'] = user;
    };
    tokenFactory.setCookieCredentials = function (credenciales) {
        $sessionStorage['credential'] = credenciales;
    };
    tokenFactory.setCookieViews = function (views) {
        $sessionStorage['views'] = views;
    };
    tokenFactory.cookieCredentials = function () {
        return $sessionStorage['credential'];
    };
    tokenFactory.setUsuarioAuditoria = function (idUsuario) {
        $sessionStorage['idUsuario'] = idUsuario;
    };
    tokenFactory.getUsuarioAuditoria = function () {
        return $sessionStorage['idUsuario'];
    };
    tokenFactory.paramNameCookieRest = function () {
        return 'Authenticate';
    }

    tokenFactory.setCookiePaginacion = function (paginacion) {
        $sessionStorage['paginacion'] = paginacion;
    };

    return tokenFactory;

};

app.factory('TokenRestManager', ['$sessionStorage', tokenRestManager]);