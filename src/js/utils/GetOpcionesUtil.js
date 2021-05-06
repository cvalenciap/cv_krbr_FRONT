'use strict';

var getOpcionesUtil = function () {
    var getOpcionesUtilFactory = {};

    var menuOpcs = {
        "BUSSIS": { nombre: "Buscar Sistemas", ruta: "common.BuscarSistema", opcion: "CON" },
        "CRESIS": { nombre: "Crear/Editar Sistema", ruta: "common.CrearSistema", opcion: "CREDIT" },
        "BUSPERF": { nombre: "Buscar Perfiles", ruta: "common.BuscarPerfil", opcion: "CON" },
        "CREPERF": { nombre: "Crear/Editar Perfil", ruta: "common.CrearPerfil", opcion: "CREDIT" },
        "BUSPERM": { nombre: "Buscar Permisos", ruta: "common.BuscarPermiso", opcion: "CON" },
        "CREPERM": { nombre: "Crear/Editar Permiso", ruta: "common.CrearPermiso", opcion: "CREDIT" },
        "BUSUSR": { nombre: "Buscar Usuarios", ruta: "common.BuscarUsuario", opcion: "CON" },
        "CREUSR": { nombre: "Crear/Editar Usuario", ruta: "common.CrearUsuario", opcion: "CREDIT" },
        "BUSPARAM": { nombre: "Buscar Parámetros", ruta: "common.BuscarParametro", opcion: "CON" },
        "CREPARAM": { nombre: "Crear/Editar Parámetro", ruta: "common.CrearParametro", opcion: "CREDIT" },
        "BUSAUD": { nombre: "Logs de Auditoría", ruta: "common.AuditoriaKerbero", opcion: "CON" },
        "ACTBLOQ": { nombre: "Activar/Bloquear", opcion: "ACTIVARBLOQUEAR" },
        "ELIMINAR": { nombre: "Eliminar", opcion: "ELIM" },
    };

    getOpcionesUtilFactory.obtenerOpcion = function (codMenu) {
        return menuOpcs[codMenu];
    };

    return getOpcionesUtilFactory;
};

app.factory('GetOpcionesUtil', [getOpcionesUtil]);