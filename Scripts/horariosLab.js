var lab, dia, rowsDetail = '', horaEntrada, horaSalida, materia, grupo, profesor, id, serie, periodo;

//Funcion para mostrar el panel de dias
$("body").on("click", ".examplein", function () {
    $('#infoUpdate').hide();
    $('#infoAceptar').hide();
    $('#infoDias').show();
    lab = $(this).val();
    console.log(lab);
    $('#tbHorario > tbody').empty();
});

//Funcion para mostrar el horario dependiendo del laboratorio y dia seleccionado
$("body").on("click", ".getDate", function () {    
    $('#infoUpdate').hide();
    $('#infoAceptar').hide();

    dia = $(this).val();
    
    checkPeriodo();

    $('#infoHorario').show();
    $('#tbHorario > tbody').empty();
    $.ajax({
        url: '/Home/loadLabHora',
        type: 'POST',
        data: { Lab: lab, Dia: dia, Periodo: periodo},
        datatype: 'JSON',
        success: function (data) {
            $('#tbHorario > tbody').empty();
            rowsDetail = '';
            $.each(data, function (i, item) {
                rowsDetail = '<tr><td style="display:none" id="tdPrf' + (i + 1) + '">' + data[i].IdHorario +
                           '</td><td id="tdSerie' + (i + 1) + '">' + data[i].Serie +
                           '</td><td id="tdMat' + (i + 1) + '">' + data[i].NombreProfesor +
                           '</td><td id="tdMat' + (i + 1) + '">' + data[i].NombreMateria +
                           '</td><td id="tdGro' + (i + 1) + '">' + data[i].Grupo +
                           '</td><td id="tdHoraE' + (i + 1) + '">' + data[i].HoraE +
                           '</td><td id="tdHoraS' + (i + 1) + '">' + data[i].HoraS +
                           '</td><td id="tdStatus"><i class="fa fa-refresh" aria-hidden="true" onclick="mostrarHora(this)"></i></td><td id="tdDelete' + i + '"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteHora(this)"></i></td></tr>';
                $('#tbHorario > tbody').append(rowsDetail);
            });
            debugger;
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
});

//Funcion para eliminar un horario
function deleteHora(item) {
    var id = $(item).parent().parent().children('td').eq(0).text();
    var serie = $(item).parent().parent().children('td').eq(1).text();
    var horaEntrada = $(item).parent().parent().children('td').eq(5).text();
    var horaSalida = $(item).parent().parent().children('td').eq(6).text();
    $.ajax({
        url: '/Home/eliminarHora',
        type: 'POST',
        data: { IdHora:id, Serie:serie, HoraEntrada:horaEntrada, HoraSalida:horaSalida },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para mostrar la informacion del horario a modificar
function mostrarHora(item) {
    $('#infoUpdate').show();
    $('#infoAceptar').show();
    $('#txtId').val('');
    $('#txtPrf').val('');
    $('#txtMtr').val('');
    $('#txtGrupo').val('');
    $('#txtLaboratorio').val('');
    $('#txtHoraEntrada').val('');
    $('#txtHoraSalida').val('');
    $('#txtDia').val('');
    id = $(item).parent().parent().children('td').eq(0).text();
    serie = $(item).parent().parent().children('td').eq(1).text();
    profesor = $(item).parent().parent().children('td').eq(2).text();
    materia = $(item).parent().parent().children('td').eq(3).text();
    grupo = $(item).parent().parent().children('td').eq(4).text();
    horaEntrada = $(item).parent().parent().children('td').eq(5).text();
    horaSalida = $(item).parent().parent().children('td').eq(6).text();
    $('#txtId').val(id);
    $('#txtPrf').val(profesor);
    $('#txtMtr').val(materia);
    $('#txtGrupo').val(grupo);
    $('#txtLaboratorio').val(lab);    
}

//Función para herramienta de autocompletar en el campo de laboratorio
$('#txtLaboratorio').autocomplete({
    serviceUrl: '../Home/getLab'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});

//Funcion para validar los campos
function validar() {
    var i = 0;

    
    if ($("#txtLaboratorio").val().length < 1) {
        i++;
    }
    if ($("#txtHoraEntrada").val().length < 1) {
        i++;
    }
    if ($("#txtHoraSalida").val().length < 1) {
        i++;
    }
    if ($("#txtDia").val().length < 1) {
        i++;
    }
    if ($("#txtRazon").val().length < 1) {
        i++;
    }

    if (i == 5) {
        alert("Por favor llene todos los campos.");
        return false;
    }
    
    if ($("#txtLaboratorio").val().length < 1) {
        alert("El campo de laboratorio es obligatorio.");
    }
    if ($("#txtHoraEntrada").val().length < 1) {
        alert("El campo de hora entrada es obligatorio.");
    }
    if ($("#txtHoraSalida").val().length < 1) {
        alert("El campo de hora de salida es obligatorio.");
    }
    if ($("#txtDia").val().length < 1) {
        alert("El campo de dia es obligatorio.");
    }
    if ($("#txtRazon").val().length < 1) {
        alert("El campo razon de cambio es obligatorio.");
    }

    if (i == 0) {
        saveHorario();
        $('#txtGrupo').val('');
        $('#txtMtr').val('');
        $('#txtPrf').val('');
        $('#txtLaboratorio').val('');
        $('#txtHoraEntrada').val('');
        $('#txtHoraSalida').val('');
        $('#txtDia').val('');
        $('#txtRazon').val('');
        return false;
    }
}

//Funcion para guardar el horario modificado
function saveHorario() {
    var idHora = $('#txtId').val();
    var laboratorio = $('#txtLaboratorio').val();
    var horaEntradaNueva = $('#txtHoraEntrada').val();
    var horaSalidaNueva = $('#txtHoraSalida').val();
    var diaNuevo = $('#txtDia').val();
    var razon = $('#txtRazon').val();

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

    checkPeriodo();

    hoy = mm + '/' + dd + '/' + yyyy;

    $.ajax({
        url: '/Home/updateHorario',
        type: 'POST',
        data: { Id: idHora, Serie: serie, Laboratorio: lab, LaboratorioNuevo: laboratorio, HoraEntrada: horaEntrada, HoraSalida: horaSalida, HoraEntradaNueva: horaEntradaNueva, HoraSalidaNueva: horaSalidaNueva, Dia: dia, DiaNuevo: diaNuevo, Razon: razon, Fecha: hoy, Periodo: periodo },        
        datatype: 'JSON',
        success: function (data) {
            alert(data);
            $('#infoUpdate').hide();
            $('#infoAceptar').hide();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para limpar las cajas de texto
function limpiar() {
    $('#infoUpdate').hide();
    $('#infoAceptar').hide();
    $('#txtId').val('');
    $('#txtPrf').val('');
    $('#txtMtr').val('');
    $('#txtGrupo').val('');
    $('#txtLaboratorio').val('');
    $('#txtHoraEntrada').val('');
    $('#txtHoraSalida').val('');
    $('#txtDia').val('');
    $('#txtRazon').val('');
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

//Funcion para determinar el periodo
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