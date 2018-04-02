var nombreTable, repTable, labTable, heTable, hsTable, diaTable, preTable, perTable, periodo, sizeTabla, lista = [];


//Funcion para validar los campos
function validar() {
    var i = 0;

    if ($('#txtNombre').val().length < 1) {
        i++;
    }
    if ($('#txtRep').val().length < 1) {
        i++;
    }
    if ($('#txtPre').val().length < 1) {
        i++;
    }
    if ($('#txtLaboratorio').val().length < 1) {
        i++;
    }
    if ($('#txtHoraEntrada').val().length < 1) {
        i++;
    }
    if ($('#txtHoraSalida').val().length < 1) {
        i++;
    }
    if ($('#txtDia').val().length < 1) {
        i++;
    }

    if (i == 7) {
        alert('Por favor llene todos los campos.');
        return false;
    }


    if ($('#txtNombre').val().length < 1) {
        alert("El campo nombre es obligatorio");
    }
    if ($('#txtRep').val().length < 1) {
        alert("El campo representante es obligatorio");
    }
    if ($('#txtPre').val().length < 1) {
        alert("El campo presentador es obligatorio");
    }
    if ($('#txtLaboratorio').val().length < 1) {
        alert("El campo laboratorio es obligatorio");
    }
    if ($('#txtHoraEntrada').val().length < 1) {
        alert("El campo hora de entrada es obligatorio");
    }
    if ($('#txtHoraSalida').val().length < 1) {
        alert("El campo hora de salida es obligatorio");
    }
    if ($('#txtDia').val().length < 1) {
        alert("El campo dia es obligatorio");
    }    
   
    if (i > 0) {
        return false;
    }
    else {
        saveCur();        
        $('#txtNombre').val('');
        $('#txtRep').val('');
        $('#txtPre').val('');
        $('#txtLaboratorio').val('');
        $('#txtHoraEntrada').val('');
        $('#txtHoraSalida').val('');
        $('#txtDia').val('');        
        return false;
    }
    

}

//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtNombre').val('');
    $('#txtRep').val('');
    $('#txtPre').val('');
    $('#txtLaboratorio').val('');
    $('#txtHoraEntrada').val('');
    $('#txtHoraSalida').val('');
    $('#txtDia').val('');
    $('#txtPer').val('');
}

//Función de busqueda dinámica para docentes
function filtrarPrf(e) {
    var trId;
    var trNombre, trNoEmp, trPuesto, trCorreo;
    var itemValue = $(e).val();
    $('#tbPrf tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbPrf tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trNoEmp = $(tr).children('td').eq(0).text();
            trNombre = $(tr).children('td').eq(1).text();            
            trCorreo = $(tr).children('td').eq(2).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trNoEmp.match(regexp) || trCorreo.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar el docente en el campo correspondiente
function mostrarPrf(item) {
    $('#txtRep').val('');
    var profesor = $(item).parent().parent().children('td').eq(1).text();
    $('#txtRep').val(profesor);
}

//Función para mostrar los docentes en el modal
function limpiarModalPrf() {
    $('#SearchPrf').val('');    
    var rowsPrf = '';
    $.ajax({
        url: '/Home/loadProfesores',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbPrf > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsPrf += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '"><label id="lblId" onclick="mostrarPrf(this)" >' + data[i].prf_id +
                                '</td><td id="tdNombre' + i + '">' + data[i].prf_nombreCompleto +                                
                                '</td><td id="tdCorreo' + i + '">' + data[i].prf_correo + '</td></tr>';
            });
            $('#tbPrf > tbody').append(rowsPrf);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función de busqueda dinámica para laboratorios
function filtrarLab(e) {
    var trId;
    var trNombre, trCapacidad;
    var itemValue = $(e).val();
    $('#tbLab tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbLab tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trNombre = $(tr).children('td').eq(0).text();
            trCapacidad = $(tr).children('td').eq(1).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trCapacidad.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar el laboratorios en el campo correspondiente
function mostrarLab(item) {
    $('#txtLaboratorio').val('');
    var lab = $(item).parent().parent().children('td').eq(0).text();
    $('#txtLaboratorio').val(lab);
}

//Función para mostrar los laboratorios en el modal
function limpiarModalLab() {
    $('#SearchLab').val('');    
    var rowsLab = '';
    $.ajax({
        url: '/Home/loadLaboratorios',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbLab > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNombre' + i + '"><label id="lblId" onclick="mostrarLab(this)" >' + data[i].lab_nombre +
                                '</td><td id="tdCapacidad' + i + '">' + data[i].lab_capacidad + '</td></tr>';
            });
            $('#tbLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función de busqueda dinámica para cursos
function filtrarCur(e) {
    var trId;
    var trNombre, trRep, trPre, trLab, trDia;
    var itemValue = $(e).val();
    $('#tbCur tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbCur tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trNombre = $(tr).children('td').eq(0).text();
            trRep = $(tr).children('td').eq(1).text();
            trPre = $(tr).children('td').eq(2).text();
            trLab = $(tr).children('td').eq(3).text();
            trDia = $(tr).children('td').eq(6).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trRep.match(regexp) || trPre.match(regexp) || trLab.match(regexp) || trDia.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar el curso en el campo correspondiente
function mostrarCur(item) {
    $('#txtNombre').val('');
    $('#txtRep').val('');
    $('#txtPre').val('');
    $('#txtLaboratorio').val('');
    $('#txtPer').val('');
    $('#txtHoraEntrada').val('');
    $('#txtHoraSalida').val('');
    $('#txtDia').val('');
    var nombre = $(item).parent().parent().children('td').eq(1).text();
    var rep = $(item).parent().parent().children('td').eq(2).text();
    var pre = $(item).parent().parent().children('td').eq(3).text();
    var lab = $(item).parent().parent().children('td').eq(4).text();
    var periodo = $(item).parent().parent().children('td').eq(5).text();
    var hEntrada = $(item).parent().parent().children('td').eq(6).text();
    var hSalida = $(item).parent().parent().children('td').eq(7).text();
    var dia = $(item).parent().parent().children('td').eq(8).text();
    $('#txtNombre').val(nombre);
    $('#txtRep').val(rep);
    $('#txtPre').val(pre);
    $('#txtLaboratorio').val(lab);
    $('#txtPer').val(periodo);
    $('#txtHoraEntrada').val(hEntrada);
    $('#txtHoraSalida').val(hSalida);
    $('#txtDia').val(dia);
}

//Función para mostrar los cursos en el modal
function limpiarModalCur() {
    $('#SearchCur').val('');    
    var rowsCur = '';

    checkPeriodo();



    $.ajax({
        url: '/Home/loadCursos',
        type: 'POST',
        data: {Periodo: periodo},
        datatype: 'JSON',
        success: function (data) {
            $('#tbCur > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsCur += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '" style="display:none" >' + data[i].IdCurso +
                                '</td><td id="tdNombre' + i + '"><label id="lblId" onclick="mostrarCur(this)" >' + data[i].NombreCurso +
                                '</td><td id="tdRepresentante' + i + '">' + data[i].RepresentanteCurso +
                                '</td><td id="tdPresentador' + i + '">' + data[i].PresentadorCurso +
                                '</td><td id="tdLaboratorio' + i + '">' + data[i].LaboratorioCurso +
                                '</td><td id="tdPeriodo' + i + '">' + data[i].PeriodoCurso +
                                '</td><td id="tdHoraE' + i + '">' + data[i].HoraECurso +
                                '</td><td id="tdHoraS' + i + '">' + data[i].HoraSCurso +
                                '</td><td id="tdDia' + i + '">' + data[i].DiaCurso +
                                '</td><td id="tdDelete' + i + '"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteCur(this)"></i></td></tr>';
            });
            $('#tbCur > tbody').append(rowsCur);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función de busqueda dinámica para periodos
function filtrarPer(e) {
    var trId;
    var trNombre;
    var itemValue = $(e).val();
    $('#tbPer tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbPer tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trNombre = $(tr).children('td').eq(0).text();            
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar el periodo en el campo correspondiente
function mostrarPer(item) {    
    $('#txtPer').val('');
    var per = $(item).parent().parent().children('td').eq(0).text();    
    $('#txtPer').val(per);
}

//Función para mostrar los periodos en el modal
function limpiarModalPer() {
    //$('#SearchCur').val('');
    //var curso = $('#SearchCur').val('');
    //filtrarCur(curso);
    var rowsPer = '';
    $.ajax({
        url: '/Home/loadPeriodo',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbPer > tbody').empty();            
            $.each(data, function (i, item) {
                rowsPer += '<tr id="trInfo' + (i + 1) + '"><td id="tdNombre' + i + '"><label id="lblId" onclick="mostrarPer(this)" >' + data[i].Nombre + '</td></tr>';
            });
            $('#tbPer > tbody').append(rowsPer);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para eliminar los cursos
function deleteCur(item) {
    var serie = $(item).parent().parent().children('td').eq(0).text();
    $.ajax({
        url: '/Home/eliminarCur',
        type: 'POST',
        data: { Curso: serie },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registrar el curso
function saveCur() {

    var fecha = $('#txtDia').val();
    var anio = fecha.substring(0, 4);
    var mes = fecha.substring(5, 7);
    var dia = fecha.substring(8, 10);

    var nombreMes, numeroPerido;
    if (mes == 01) { nombreMes = "January"; numeroPerido = 1;}
    if (mes == 02) { nombreMes = "February"; numeroPerido = 1; }
    if (mes == 03) { nombreMes = "March"; numeroPerido = 1; }
    if (mes == 04) { nombreMes = "April"; numeroPerido = 1; }
    if (mes == 05) { nombreMes = "May"; numeroPerido = 1; }
    if (mes == 06) { nombreMes = "June"; numeroPerido = 1; }
    if (mes == 07) { nombreMes = "July"; numeroPerido = "Verano"; }
    if (mes == 08) { nombreMes = "August"; numeroPerido = 2; }
    if (mes == 09) { nombreMes = "September"; numeroPerido = 2; }
    if (mes == 10) { nombreMes = "Octuber"; numeroPerido = 2; }
    if (mes == 11) { nombreMes = "November"; numeroPerido = 2; }
    if (mes == 12) { nombreMes = "December"; numeroPerido = 2; }

    var periodo = anio + '-' + numeroPerido;
    var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
    var dt = new Date(nombreMes + ' ' + dia + ', ' + anio + ' 12:00:00');

    var nombreDia = dias[dt.getUTCDay()];

    var nombre = $('#txtNombre').val();
    var profesor= $('#txtRep').val();
    var laboratorio = $('#txtLaboratorio').val();
    var horaEn = $('#txtHoraEntrada').val();
    var horaSa = $('#txtHoraSalida').val();    
    var presentador = $('#txtPre').val();    

    $.ajax({
        url: '/Home/saveCurso',
        type: 'POST',
        data: { Nombre: nombre, Representante: profesor, Presentador: presentador, Laboratorio: laboratorio, Periodo: periodo, HoraEntrada: horaEn, HoraSalida: horaSa, Fecha: fecha, Dia: nombreDia },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registrar los cursos importados de una tabla
function saveCurTable() {
    $('#my_file_output > tbody > tr').each(function (i, item) {
        sizeTabla = i;
    })

    $('#my_file_output > tbody > tr').each(function (i, item) {
        nombreTable = $(item).children('td').eq(0).text(),
        repTable = $(item).children('td').eq(1).text(),
        preTable = $(item).children('td').eq(2).text(),
        labTable = $(item).children('td').eq(3).text(),        
        heTable = $(item).children('td').eq(4).text(),
        hsTable = $(item).children('td').eq(5).text(),
        fechaTable = $(item).children('td').eq(6).text();

        var anio = fechaTable.substring(5, 7);
        var dia = fechaTable.substring(2, 4);
        var mes = fechaTable.substring(0, 1);

        var nombreMes, numeroPerido;
        if (mes == 01) { nombreMes = "January"; numeroPerido = 1; }
        if (mes == 02) { nombreMes = "February"; numeroPerido = 1; }
        if (mes == 03) { nombreMes = "March"; numeroPerido = 1; }
        if (mes == 04) { nombreMes = "April"; numeroPerido = 1; }
        if (mes == 05) { nombreMes = "May"; numeroPerido = 1; }
        if (mes == 06) { nombreMes = "June"; numeroPerido = 1; }
        if (mes == 07) { nombreMes = "July"; numeroPerido = "Verano"; }
        if (mes == 08) { nombreMes = "August"; numeroPerido = 2; }
        if (mes == 09) { nombreMes = "September"; numeroPerido = 2; }
        if (mes == 10) { nombreMes = "Octuber"; numeroPerido = 2; }
        if (mes == 11) { nombreMes = "November"; numeroPerido = 2; }
        if (mes == 12) { nombreMes = "December"; numeroPerido = 2; }

        var periodo = '20' + anio + '-' + numeroPerido;
        var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
        var dt = new Date(nombreMes + ' ' + dia + ', ' + anio + ' 12:00:00');
        var fecha = '20' + anio + '-' + '0' + mes + '-' + dia;
        var nombreDia = dias[dt.getUTCDay()];

        $.ajax({
            url: '/Home/saveCursoImportar',
            type: 'POST',
            data: { Nombre: nombreTable, Representante: repTable, Presentador: preTable, Laboratorio: labTable, Periodo: periodo, HoraEntrada: heTable, HoraSalida: hsTable, Fecha: fecha, Dia: nombreDia },
            datatype: 'JSON',
            success: function (data) {
                var mensaje = "Registro " + (i + 1) + ". " + data + "\n";
                lista.push(mensaje);
                if (i == sizeTabla) {
                    if (lista.length > 23) {
                        var mensajeUno = [], mensajeDos = [];
                        for (i = 0; i < 23; i++) {
                            mensajeUno.push(lista[i]);
                        }
                        for (i = 24; i < 48; i++) {
                            mensajeDos.push(lista[i]);
                        }
                        alert(mensajeUno);
                        alert(mensajeDos);
                    }
                    else {
                        alert(lista);
                    }
                }
                if (i == sizeTabla) {
                    lista.splice(0, lista.length);
                }
            },
            error: function (data) {
                alert(data);
            }
        })
    })
    $('#my_file_output > tbody').empty();
    $('#my_file_input').val('');
}

//Funcion para limpiar la tabla de importacion
function limpiarTabla() {
    $("#my_file_output > tbody ").empty();
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

//Función para herramienta de autocompletar en el campo de representante
$('#txtRep').autocomplete({
    serviceUrl: '../Home/getPrf'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});

//Función para herramienta de autocompletar en el campo de laboratorio
$('#txtLaboratorio').autocomplete({
    serviceUrl: '../Home/getLab'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});