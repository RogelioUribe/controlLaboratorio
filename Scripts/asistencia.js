//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtEmpleado').val('');
    $('#txtAlumnos').val('');
    $('#txtDocente').val('');
    $('#txtMateria').val('');
    $('#txtGrupo').val('');
    $('#txtLaboratorio').val('');
    $('#txtHorario').val('');
}

//Funcipn para validar los campos
function validar() {    
    var i = 0;

    if ($("#txtEmpleado").val().length < 1) {
        i++;
    }
    if ($("#txtAlumnos").val().length < 1) {
        i++;
    }    

    if (i == 2) {
        alert("Por favor llene todos los campos.");
        return false;
    }


    if ($("#txtEmpleado").val().length < 1) {
        alert('El campo empleado es obligatorio');
    }
    if ($("#txtAlumnos").val().length < 1) {
        alert('El campo alumnos es obligatorio');
    }


    if (i == 0) {
        saveAsistencia();
        $('#txtEmpleado').val('');
        $('#txtAlumnos').val('');
        $('#txtDocente').val('');
        $('#txtMateria').val('');
        $('#txtGrupo').val('');
        $('#txtLaboratorio').val('');
        $('#txtHorario').val('');
        return false;
    }
}

//Funcion para cargar la informacion de horario dependiendo del docente y la hora actual
function getHorario() {
    //Obtener profesor
    var profesor = $('#txtEmpleado').val();    
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

    var periodo = anio + '-' + numeroPerido;
    var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
    var dt = new Date(nombreMes + ' ' + dia + ', ' + anio + ' 12:00:00');

    var nombreDia = dias[dt.getUTCDay()];
       
    hora = hora + ':00';

    $.ajax({
        url: '/Home/loadPrfHora',
        type: 'POST',
        data: { IdProfesor: profesor, HoraEntrada: hora, Dia: nombreDia, Periodo: periodo },        
        datatype: 'JSON',
        success: function (data) {
            $('#tbHorario > tbody').empty();
            rowsDetail = '';
            $.each(data, function (i, item) {
                rowsDetail = '<tr><td style="display:none" id="tdPrf' + (i + 1) + '">' + data[i].IdHorario +
                           '</td><td id="tdMat' + (i + 1) + '">' + data[i].NombreMateria +
                           '</td><td id="tdMat' + (i + 1) + '">' + data[i].NombreLab +
                           '</td><td id="tdGro' + (i + 1) + '">' + data[i].Grupo +
                           '</td><td id="tdHoraE' + (i + 1) + '">' + data[i].HoraE +
                           '</td><td id="tdHoraS' + (i + 1) + '">' + data[i].HoraS + '</td></tr>';
                $('#tbHorario > tbody').append(rowsDetail);
            });
            debugger;
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para registrar una asistencia
function saveAsistencia() {
    var alumnos = $('#txtAlumnos').val();
    var profesor = $('#txtEmpleado').val();
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

    var periodo = anio + '-' + numeroPerido;
    var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
    var dt = new Date(nombreMes + ' ' + dia + ', ' + anio + ' 12:00:00');

    var nombreDia = dias[dt.getUTCDay()];

    hora = hora + ':00';

    $.ajax({
        url: '/Home/saveAsistencia',
        type: 'POST',
        data: { IdProfesor: profesor, HoraEntrada: hora, Dia: nombreDia, Alumnos: alumnos, Periodo: periodo, Fecha: hoy },        
        datatype: 'JSON',
        success: function (data) {
            alert(data)
            $('#tbHorario > tbody').empty();
        },
        error: function (data) {
            alert(data);
        }
    })
}