﻿var periodo, rowsMtr;


//Funcion de bsqeda dinamica de series
function filtrarSerie(e) {
    var trId;
    var trSerie, trMateria, trGrupo;
    var itemValue = $(e).val();
    $('#tbSerie tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbSerie tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trSerie = $(tr).children('td').eq(0).text();
            trMateria = $(tr).children('td').eq(1).text();
            trGrupo = $(tr).children('td').eq(2).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trSerie.match(regexp) || trMateria.match(regexp) || trGrupo.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Funcion para mostrar las horas practicas dependiendo del periodo
function showSeries() {
    checkPeriodo()
    $.ajax({
        url: '/Home/getHorasP',
        type: 'POST',
        data: {Periodo: periodo},
        datatype: 'JSON',
        success: function (data) {
            rowsMtr = '';
            $('#tbSerie > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsMtr += '<tr id="trInfo' + (i + 1) + '"><td id="tdSerie' + i + '"><label id="lblId" onclick="mostrarMtr(this)">' + data[i].Serie +
                                '</label></td><td id="tdNombre' + i + '">' + data[i].Materia +
                                '</td><td id="tdSemestre' + i + '">' + data[i].Grupo +
                                '</td><td id="tdCarrera' + i + '">' + data[i].HorasPracticas +
                                '</td><td id="tdHPrac' + i + '">' + data[i].HorasFaltantes +
                                '</td><td id="tdHPrac' + i + '">' + data[i].HorasSobrantes + '</td></tr>';                                
            });
            $('#tbSerie > tbody').append(rowsMtr);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para mostrar el campo de periodo
function ShowPeriodo() {
    element = document.getElementById("txtPeriodo");
    check = document.getElementById("ckPeriodo");
    if (check.checked) {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
        $('#txtPeriodo').val('');
    }
}

//Funcion determinar el periodo
function checkPeriodo() {
    if ($('#txtPeriodo').val().length < 1) {
        //Obtener fecha
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        hoy = yyyy + '-' + mm + '-' + dd;

        //Obtener nombre del dia

        var anio = hoy.substring(0, 4);
        var mes = hoy.substring(5, 7);

        var numeroPerido;
        if (mes == 01) { numeroPerido = 1; }
        if (mes == 02) { numeroPerido = 1; }
        if (mes == 03) { numeroPerido = 1; }
        if (mes == 04) { numeroPerido = 1; }
        if (mes == 05) { numeroPerido = 1; }
        if (mes == 06) { numeroPerido = 1; }
        if (mes == 07) { numeroPerido = "Verano"; }
        if (mes == 08) { numeroPerido = 2; }
        if (mes == 09) { numeroPerido = 2; }
        if (mes == 10) { numeroPerido = 2; }
        if (mes == 11) { numeroPerido = 2; }
        if (mes == 12) { numeroPerido = 2; }

        periodo = anio + '-' + numeroPerido;
    }
    else {
        var ckPer = $('#txtPeriodo').val();
        var anoPer = ckPer.substring(0, 4);
        var longitud = ckPer.length;
        if (longitud == 11) {
            var semPer = ckPer.substring(5, 11);
        }
        if (longitud == 6) {
            var semPer = ckPer.substring(5, 6);
        }
        $.ajax({
            url: '/Home/checkPeriodo',
            type: 'POST',
            data: { Ano: anoPer, Semestre: semPer },
            datatype: 'JSON',
            success: function (data) {
                if (data == 'True') {
                    periodo = anoPer + '-' + semPer;
                }
                else {
                    alert('El periodo no existe');
                }
            },
            error: function (data) {
                alert('doesnt work');
            }
        })
    }
}

//Funcion para exportar en documento xls la informacion de las horas practicas
function Exportar() {
    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('tbSerie');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'Horas Practicas ' + periodo + '.xls';
    a.click();
}