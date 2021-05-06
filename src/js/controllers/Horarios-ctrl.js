'use strict';

app.controller('HorariosCtrl', ['$compile', '$scope', '$state', '$stateParams', 'Auth', 'FunctionUtil', HorariosCtrl]);

function HorariosCtrl($compile, $scope, $state, $stateParams, Auth, FunctionUtil) {

    var appTitle = 'Horarios';
    var appIcon = 'icon-laptop';

    var init = function () {
        $scope.nombreTitulo = "test";
        //FunctionUtil.registrarFuncionesManejoAlertas($scope);
        var diasSem = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
        $("#horarios").append('<tr class="status-info">');
        $("#horarios").append('<td></td>');
        $("#horarios").append('<td></td>');
        for (var j = 0; j < diasSem.length; j++) {
            var str = '<td><input type="checkbox" ng-model="chk_todos' + diasSem[j] + '" id="chk_todos' + diasSem[j] + '" ng-change="seleccionarXDia(\'' + diasSem[j] + '\')" ng-init="chk_todos' + diasSem[j] + '=true"/></td>';
            $('#horarios').append($compile(str)($scope));
        }
        $("#horarios").append('</tr>');
        for (var i = 0; i < 24; i++) {
            var indice = "00";
            if (i.toString().length == 1){
                indice = '0' + i;
            } else {
                indice = i;
            }
            $("#horarios").append('<tr class="status-info">');
            $("#horarios").append('<td>' + indice + ':00 - ' + indice + ':59</td>');
            var chktodos = '<td><input type="checkbox" ng-model="chk_todos' + i + '" ng-init="chk_todos' + i + '=true" id="chk_todos' + i + '" ng-change="seleccionarXHora(' + i + ')"/></td>';
            $("#horarios").append($compile(chktodos)($scope));
            for (var j = 0; j < diasSem.length; j++) {
                var str = '<td><input id="chk_' + diasSem[j] + i + '" type="checkbox" /></td>';
                $('#horarios').append($compile(str)($scope));
            }
            $("#horarios").append('</tr>');
        }
    };

    $scope.seleccionarXHora = function (id){
        var chkTodos = 'chk_todos' + id;
        var diasSem = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
        for (var j = 0; j < diasSem.length; j++) {
            var chkBox = "chk_" + diasSem[j] + id;
            if ($('#' + chkTodos).is(':checked')) {
                $('#' + chkBox).prop('checked', true);
            } else {
                $('#' + chkBox).prop('checked', false);
            }
        }
        return true;
    };

    $scope.seleccionarXDia = function (id){
        for (var i = 0; i < 24; i++) {
            var chkTodos = 'chk_todos' + id;
            var chkBox = "chk_" + id + i;
            if ($('#' + chkTodos).is(':checked')) {
                $('#' + chkBox).prop('checked', true);
            } else {
                $('#' + chkBox).prop('checked', false);
            }
        }
        return true;
    };

    $scope.generarCadena = function (){
        $scope.cadenaHorarios = "";
        var diasSem = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < diasSem.length; j++) {
                var chkBox = "chk_" + diasSem[j] + i;
                if ($('#' + chkBox).is(':checked')) {
                    $scope.cadenaHorarios = $scope.cadenaHorarios + diasSem[j] + i + "|";
                }
            }
        }
        $scope.setCadena($scope.cadenaHorarios);
    };

    $('#modal-form').on('show.bs.modal', function () {
        $scope.cadenaHorarios = $scope.getCadena();
        var diasSem = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
        $("#titulo").append($scope.getSubtitulo());

        for (var i = 0; i < 24; i++) {
           for (var j = 0; j < diasSem.length; j++) {
               var chkTmp = diasSem[j] + i;
               var horarios = $scope.cadenaHorarios.split("|");
               var flag = $scope.compararCheckBox(chkTmp, horarios);
               if (flag){
                   $('#chk_' + chkTmp).prop('checked', true);
               } else{
                   $('#chk_' + chkTmp).prop('checked', false);
               }
            }
        }

    });


    $scope.compararCheckBox = function (chkTmp, horarios){
        for (var k = 0; k < horarios.length; k++){
            if (chkTmp === horarios[k]){
                return true;
            }
        }
        return false;
    };

    init();

}
  