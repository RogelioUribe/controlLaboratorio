//Función para validar los campos
function validar() {
    var i = 0;

    if ($("#txtGrupo").val().length < 1) {
        i++;
    }
    if ($("#txtMateria").val().length < 1) {
        i++;
    }
    if ($("#txtProfesor").val().length < 1) {
        i++;
    }
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


    if (i == 7) {
        alert("Por favor llene todos los campos.");
        return false;
    }


    if ($("#txtGrupo").val().length < 1) {
        alert("El campo de grupo es obligatorio.");
    }
    if ($("#txtMateria").val().length < 1) {
        alert("El campo de materia es obligatorio.");
    }
    if ($("#txtProfesor").val().length < 1) {
        alert("El campo de profesor es obligatorio.");
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

    var horaEntrada = $("#txtHoraEntrada").val();
    var horaSalida = $("#txtHoraSalida").val();

    if (i == 0) {
        saveHorario();
        $('#txtGrupo').val('');
        $('#txtMateria').val('');
        $('#txtProfesor').val('');
        $('#txtLaboratorio').val('');
        $('#txtHoraEntrada').val('');
        $('#txtHoraSalida').val('');
        $('#txtDia').val('');        
        return false;
    }

}

//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtGrupo').val('');
    $('#txtMateria').val('');
    $('#txtProfesor').val('');
    $('#txtLaboratorio').val('');
    $('#txtHoraEntrada').val('');
    $('#txtHoraSalida').val('');
    $('#txtDia').val('');    
}

//Función de busqueda dinamica para asignaturas
function filtrarMrt(e) {
    var trId;
    var trNombre, trSemestre, trCarrera;
    var itemValue = $(e).val();
    $('#tbMrt tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbMrt tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trNombre = $(tr).children('td').eq(0).text();
            trSemestre = $(tr).children('td').eq(1).text();
            trCarrera = $(tr).children('td').eq(2).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trSemestre.match(regexp) || trCarrera.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar la asignatura seleccionado al campo correspondiente
function mostrarMtr(item) {
    $('#txtMateria').val('');
    var materia = $(item).parent().parent().children('td').eq(0).text();
    $('#txtMateria').val(materia);
}

//Función para mostrar las asignaturas en el modal
function limpiarModalMtr() {
    $('#SearchMtr').val('');
   
    var rowsMtr = '';
    $.ajax({
        url: '/Home/loadMaterias',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbMrt > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsMtr += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '"><label id="lblId" onclick="mostrarMtr(this)">' + data[i].IdMateria +
                                '</label></td><td id="tdNombre' + i + '">' + data[i].NombreMateria +
                                '</label></td><td id="tdSemestre' + i + '">' + data[i].SemestreMat +
                                '</td><td id="tdCarrera' + i + '">' + data[i].CarreraMat + '</td></tr>';
            });
            $('#tbMrt > tbody').append(rowsMtr);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función de busqueda dinamica para docentes
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

//Función para ingresar el docente seleccionado al campo correspondiente
function mostrarPrf(item) {
    $('#txtProfesor').val('');
    var profesor = $(item).parent().parent().children('td').eq(1).text();
    $('#txtProfesor').val(profesor);
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
                rowsPrf += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '"><label id="lblId" onclick="mostrarPrf(this)">' + data[i].prf_id +
                                '</label></td><td id="tdNombre' + i + '">' + data[i].prf_nombreCompleto +                                
                                '</td><td id="tdCorreo' + i + '">' + data[i].prf_correo + '</td></tr>';
            });
            $('#tbPrf > tbody').append(rowsPrf);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función de busqueda dinamica para laboratorios
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

//Función para ingresar el laboratorio seleccionado al campo correspondiente
function mostrarLab(item){
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
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNombre' + i + '"><label id="lblId"  onclick="mostrarLab(this)">' + data[i].lab_nombre +
                                '</label></td><td id="tdCapacidad' + i + '">' + data[i].lab_capacidad + '</td></tr>';
            });
            $('#tbLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función para registrar el horario
function saveHorario() {
    var grupo = $('#txtGrupo').val();
    var materia = $('#txtMateria').val();
    var profesor = $('#txtProfesor').val();
    var laboratorio = $('#txtLaboratorio').val();
    var he = $('#txtHoraEntrada').val();
    var hs = $('#txtHoraSalida').val();
    var dia = $('#txtDia').val();

    var fecha = new Date();    
    var mes = fecha.getMonth() + 1; //hoy es 0!
    var anio = fecha.getFullYear();

    var numeroPerido;
    if (mes >= 01 && mes <= 6) { numeroPerido = 1; }    
    if (mes == 07) { numeroPerido = "Verano"; }
    if (mes >= 08 && mes <= 12) { numeroPerido = 2; }    

    var periodo = anio + '-' + numeroPerido;

    $.ajax({
        url: '/Home/saveHorario',
        type: 'POST',
        data: { Grupo: grupo, Materia: materia , Profesor: profesor, Laboratorio: laboratorio, HEntrada: he, HSalida: hs, Dia: dia, Periodo: periodo},
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Función para herramienta de autocompletar en el campo de profesor
$('#txtProfesor').autocomplete({
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

//Función para herramienta de autocompletar en el campo de materia
$('#txtMateria').autocomplete({
    serviceUrl: '../Home/getMateriaId'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});