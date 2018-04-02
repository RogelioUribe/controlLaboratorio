//Función para limpiar las cajas de texto
function limpiar() {
    $('#txtUsuario').val('');
    $('#txtNoControl').val('');
    $('#txtLaboratorio').val('');
    $('#txtMaquina').val('');
    $('#txtHoraEntrada').val('');
    $('#txtMateria').val('');
}

//Función para alidar los campos
function validar() {
    var i = 0;    
    var horaAcceso = $('#txtHoraEntrada').val();
    var usuario = $('#Usuario').val();

    if (usuario == 'Estudiante') {
        if ($('#Usuario').val().length < 1) {
            i++;
        }
        if ($('#txtNoControl').val().length < 1) {
            i++;
        }
        if ($('#txtLaboratorio').val().length < 1) {
            i++;
        }
        if ($('#txtMaquina').val().length < 1) {
            i++;
        }              

        if (i == 4) {
            alert('Por favor llene todos los campos.');
            return false;
        }

        if ($('#Usuario').val().length < 1) {
            alert('El campo usuario es obligatorio.');
        }
        if ($('#txtNoControl').val().length < 1) {
            alert('El campo numero de control es obligatorio.');
        }
        if ($('#txtLaboratorio').val().length < 1) {
            alert('El campo laboratorio es obligatorio.');
        }
        if ($('#txtMaquina').val().length < 1) {
            alert('El campo maquina es obligatorio.');
        }        
       
        if (i == 0) {
            saveAcc();            
            $('#Usuario').val('');
            $('#txtNoControl').val('');
            $('#txtLaboratorio').val('');
            $('#txtMaquina').val('');            
            return false;
        }
    }

    else {
        if ($('#Usuario').val().length < 1) {
            i++;
        }        
        if ($('#txtLaboratorio').val().length < 1) {
            i++;
        }       
        if ($('#txtNoControl').val().length < 1) {
            i++;
        }
        if ($('#txtMateria').val().length < 1) {
            i++;
        }

        if (i == 4) {
            alert('Por favor llene todos los campos.');
            return false;
        }

        if ($('#Usuario').val().length < 1) {
            alert('El campo usuario es obligatorio.');
        }        
        if ($('#txtLaboratorio').val().length < 1) {
            alert('El campo laboratorio es obligatorio.');
        }        
        if ($('#txtNoControl').val().length < 1) {
            alert('El campo numero de empleado es obligatorio.');
        }
        if ($('#txtMateria').val().length < 1) {
            alert('El campo materia es obligatorio.');
        }

        
        if (i == 0) {
            saveAcc();            
            $('#Usuario').val('');
            $('#txtNoControl').val('');
            $('#txtLaboratorio').val('');
            $('#txtMaquina').val('');
            $('#txtMateria').val('');
            return false;
        }
    }
}

//Función para mostrar campos dependiendo del usuario
function mostrarUsuario() {
    var usuario = $('#Usuario').val();    
        if (usuario == 'Estudiante') {
        $('#lblNoControl').show();
        $('#txtNoControl').show();
        $('#txtNoControl').css({
            marginLeft: '19px'
        })        
        $('#lblMaquina').show();
        $('#txtMaquina').show();
        $('#lblNoEmp').hide();
        $('#lblMateria').hide();
        $('#txtMateria').hide();
        $('#btnMateria').hide();
    }
    else {
        $('#txtNoControl').val('');
        $('#txtNoControl').css({
            marginLeft: '40px'
        })
        $('#txtMateria').css({
            marginLeft: '43px'
        })
        $('#txtMaquina').val('');
        $('#lblNoEmp').show();
        $('#lblNoControl').hide();        
        $('#lblMaquina').hide();
        $('#txtMaquina').hide();
        $('#lblMateria').show();
        $('#txtMateria').show();
        $('#btnMateria').show();
    }
}

//Función de busca dinámica para laboratorios
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
function mostrarLab(item) {
    $('#txtLaboratorio').val('');
    var lab = $(item).parent().parent().children('td').eq(0).text();
    $('#txtLaboratorio').val(lab);
}

//Función para mostrar los laboratorios en el modal
function limpiarModalLab() {
    //$('#SearchLab').val('');
    //var lab = $('#SearchLab').val('');
    //filtrarLab(lab);
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
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNombre' + i + '">' + data[i].lab_nombre +
                                '</td><td id="tdCapacidad' + i + '">' + data[i].lab_capacidad +
                                '<td id="tdStatus"><i class="fa fa-info-circle" aria-hidden="true" onclick="mostrarLab(this)"></i></td></tr>';
            });
            $('#tbLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
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

//Función de busqueda dinámica para asignaturas
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

//Función para ingresar la asignatura en el campo correspondiente
function mostrarMtr(item) {
    $('#txtMateria').val('');
    var materia = $(item).parent().parent().children('td').eq(1).text();
    $('#txtMateria').val(materia);
}

//Función para registar el acceso
function saveAcc() {
    var usuario = $('#Usuario').val();
    var numeroId = $('#txtNoControl').val();
    var laboratorio = $('#txtLaboratorio').val();
    var maquina = $('#txtMaquina').val();
    var materia = $('#txtMateria').val();
    
    //Obtener hora
    var tiempo = new Date();
    var hora = tiempo.getHours();
    var minuto = tiempo.getMinutes();

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
    var dia = hoy.substring(8, 10);

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

    var periodo = anio + '-' + numeroPerido;    
    hora = hora + ':00';


    $.ajax({
        url: '/Home/saveAcceso',
        type: 'POST',
        data: { Usuario: usuario, NumeroID: numeroId, Laboratorio: laboratorio, Maquina: maquina, horaE: hora, Fecha: hoy, Periodo: periodo, Materia: materia },        
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Función para herramienta de autocompletar en el campo de laboratorio
$('#txtLaboratorio').autocomplete({
    serviceUrl: '../Home/getLab'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});

//Función para herramienta de autocompletar en el campo de materia
$('#txtMateria').autocomplete({
    serviceUrl: '../Home/getMateria'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});