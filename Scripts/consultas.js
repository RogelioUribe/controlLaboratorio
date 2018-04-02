var rowsLab, periodo, rowsEstLab, laboratorio, rowsCar;

//Funcion para determinar el periodo y mostrar los usuarios de accesos no programados
function MostrarUsu() {
    $('#Usuarios').show();
    $('#Accesos').hide();
    $('#AccLab').hide();
    $('#Cursos').hide();
    $('#CurLab').hide();
    $('#Docentes').hide();
    $('#DocLab').hide();
    $('#Estudiantes').hide();
    $('#EstLab').hide();
    $('#Materias').hide();
    $('#MatLab').hide();

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

////////////////Estudiantes

//Mostrar los estudiantes que usaron el laboratorio
function MostrarEstTotal() {
    $('#Estudiantes').show();
    $('#Docentes').hide();
    $('#DocLab').hide();

    checkPeriodo();

    $.ajax({
        url: '/Home/getEstudiantesTotal',
        type: 'POST',
        data: { Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblEstudiantesTotal').text('Total de Estudiantes: ' + data);
            getLaboratorioEst();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Desplegar laboratorios estudiantes
function getLaboratorioEst() {
    $.ajax({
        url: '/Home/loadLaboratorios',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            rowsLab = '';
            $('#tbLab > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '" style="display:none" >' + data[i].lab_id +
                                '</td><td id="tdNombre' + i + '"><label id="lblId" onclick="getEstLab(this)">' + data[i].lab_nombre + '</label></td></tr>';
            });
            $('#tbLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar el numero de accesos al laboratorio seleccionado
function getEstLab(item) {
    $('#EstLab').show();
    laboratorio = $(item).parent().parent().children('td').eq(0).text();
    checkPeriodo();
    $.ajax({
        url: '/Home/getEstLab',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblEstudiantesLab').text('Total de Estudiantes en el laboratorio ' + laboratorio + ': ' + data);
            getLaboratoriosEst();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar los accesos del laboratorio laboratorio seleccionado
function getLaboratoriosEst() {
    $('#fechasEst').hide();
    $('#MesEst').hide();
    checkPeriodo();
    $.ajax({
        url: '/Home/getLaboratoriosEst',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbEstLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNoControl' + i + '">' + data[i].Numero +
                                '</td><td id="tdMaquina' + i + '">' + data[i].Maquina +
                                '</td><td id="tdHoraE' + i + '">' + data[i].HoraEntrada +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbEstLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar div de busqueda por fecha
function FechaEst() {
    $('#fechasEst').show();
    $('#MesEst').hide();
}

//Mostrar el total de accesos en las fechas seleccionadas
function BuscarFechaEst() {
    var fechaInicio = $('#txtFechaInicio').val();
    var fechaFinal = $('#txtFechaFinal').val();
    checkPeriodo();
    $.ajax({
        url: '/Home/getEstFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio:fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblEstudiantesLab').text('Total de Estudiantes en el laboratorio ' + laboratorio + ': ' + data);
            getFechaLaboratorio();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar los accesos del laboratorio seleccionado de las fechas seleccionadas
function getFechaLaboratorio() {
    var fechaInicio = $('#txtFechaInicio').val();
    var fechaFinal = $('#txtFechaFinal').val();
    checkPeriodo();
    $.ajax({
        url: '/Home/getLabEstFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbEstLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNoControl' + i + '">' + data[i].Numero +
                                '</td><td id="tdMaquina' + i + '">' + data[i].Maquina +
                                '</td><td id="tdHoraE' + i + '">' + data[i].HoraEntrada +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbEstLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Modal para ocultar y limpiar (Estudiante)
function OcultarFechaEst() {    
    $('#fechasEst').hide();
    $('#MesEst').hide();

    $('#txtFechaInicio').val('');
    $('#txtFechaFinal').val('');
    $('#txtMes').val('');
}

//Mostrar div de busqueda por mes
function MesEst() {
    $('#MesEst').show();
    $('#fechasEst').hide();
}

//Total de alumnos que accesaron ese mes
function BuscarMesEst() {
    var mes = $('#txtMes').val();
    var dia = 30;

    var hoy = new Date();    
    var yyyy = hoy.getFullYear();

    if (mes == "Enero") { mes = 01; }
    if (mes == "Febrero") { mes = 02; dia = 28; }
    if (mes == "Marzo") { mes = 03; }
    if (mes == "Abril") { mes = 04 }
    if (mes == "Mayo") { mes = 05; }
    if (mes == "Junio") { mes = 06; }
    if (mes == "Julio") { mes = 07; }
    if (mes == "Agosto") { mes = 08; }
    if (mes == "Septiembre") { mes = 09; }
    if (mes == "Octubre") { mes = 10; }
    if (mes == "Noviembre") { mes = 11; }
    if (mes == "Diciembre") { mes = 12; }

    var fechaIn = yyyy + '-' + mes + '-01';
    var fechaFin = yyyy + '-' + mes + '-' + dia;

    checkPeriodo();

    $.ajax({
        url: '/Home/getEstFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaIn, FechaFinal: fechaFin, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblEstudiantesLab').text('Total de Estudiantes en el laboratorio ' + laboratorio + ': ' + data);
            getMesLaboratorio(fechaIn, fechaFin);
        },
        error: function (data) {
            alert(data);
        }
    })

}

//Accesos de los alumnos en el laboratorio seleccionado
function getMesLaboratorio(fi, ff) {
    checkPeriodo();
    $.ajax({
        url: '/Home/getLabEstFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fi, FechaFinal: ff, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbEstLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNoControl' + i + '">' + data[i].Numero +
                                '</td><td id="tdMaquina' + i + '">' + data[i].Maquina +
                                '</td><td id="tdHoraE' + i + '">' + data[i].HoraEntrada +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbEstLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Total de alumnos que accesaron hoy
function HoyEst() {
    $('#fechasEst').hide();
    $('#MesEst').hide();
    $('#txtMes').val('');
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

    checkPeriodo();
    $.ajax({
        url: '/Home/getEstFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: hoy, FechaFinal: hoy, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblEstudiantesLab').text('Total de Estudiantes en el laboratorio ' + laboratorio + ': ' + data);
            getMesLaboratorio(hoy, hoy);
        },
        error: function (data) {
            alert(data);
        }
    })
}


//////////////////////Docentes

//Total de profesores que han accesado en los laboratorios
function MostrarPrf() {
    $('#Docentes').show();
    $('#Estudiantes').hide();
    $('#EstLab').hide();
    $('#Cursos').hide();
    $('#CurLab').hide();

    checkPeriodo();

    $.ajax({
        url: '/Home/getDocente',
        type: 'POST',
        data: { Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblDocentesTotal').text('Total de Docentes: ' + data);
            getLaboratorioDocente();
        },
        error: function (data) {
            alert(data);
        }
    })
}   

//Desplegar laboratorios docentes
function getLaboratorioDocente() {
    $.ajax({
        url: '/Home/loadLaboratorios',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            rowsLab = '';
            $('#tbLab > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '" style="display:none" >' + data[i].lab_id +
                                '</td><td id="tdNombre' + i + '"><label id="lblId" onclick="getDocLab(this)">' + data[i].lab_nombre + '</label></td></tr>';
            });
            $('#tbLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Total de docentes del laboratorio seleccionado
function getDocLab(item) {
    $('#DocLab').show();
    laboratorio = $(item).parent().parent().children('td').eq(0).text();
    checkPeriodo();
    $.ajax({
        url: '/Home/getDocLab',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblDocentesLab').text('Total de Docentes en el laboratorio ' + laboratorio + ': ' + data);
            getLaboratoriosDoc();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar Accesos de los docentes del laboratorio seleccionado
function getLaboratoriosDoc() {
    checkPeriodo();
    $.ajax({
        url: '/Home/getLaboratoriosDoc',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbEstLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNoControl' + i + '">' + data[i].Numero +
                                '</td><td id="tdMateria' + i + '">' + data[i].Materia +
                                '</td><td id="tdHoraE' + i + '">' + data[i].HoraEntrada +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbEstLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostar div de fecha (Docente)
function FechaDoc() {
    $('#fechasDoc').show();
    $('#MesDoc').hide();
}

//Total de acceso de docentes del laboatorio seleccionado de las fechas seleccionadas
function BuscarFechaDoc() {
    var fechaInicio = $('#txtFechaInicioDoc').val();
    var fechaFinal = $('#txtFechaFinalDoc').val();
    checkPeriodo();
    $.ajax({
        url: '/Home/getDocFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblDocentesLab').text('Total de Docentes en el laboratorio ' + laboratorio + ': ' + data);
            getLabDocFecha();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar accesos de los docentes del laboratorio seleccionado de las fechas seleccionadas
function getLabDocFecha() {
    var fechaInicio = $('#txtFechaInicioDoc').val();
    var fechaFinal = $('#txtFechaFinalDoc').val();
    checkPeriodo();
    $.ajax({
        url: '/Home/getLabDocFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbEstLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNoControl' + i + '">' + data[i].Numero +
                                '</td><td id="tdMateria' + i + '">' + data[i].Materia +
                                '</td><td id="tdHoraE' + i + '">' + data[i].HoraEntrada +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbEstLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar div de busqueda de mes
function MesDoc() {
    $('#MesDoc').show();
    $('#fechasDoc').hide();
}

//Modal de ocultar y limpiar (Docentes)
function OcultarFechaDoc() {
    $('#fechasDoc').hide();
    $('#MesDoc').hide();

    $('#txtFechaInicioDoc').val('');
    $('#txtFechaFinalDoc').val('');
    $('#txtMesDoc').val('');
}

//Total de docentes que accesaron ese mes
function BuscarMesDoc() {
    var mes = $('#txtMesDoc').val();
    var dia = 30;

    var hoy = new Date();
    var yyyy = hoy.getFullYear();

    if (mes == "Enero") { mes = 01; }
    if (mes == "Febrero") { mes = 02; dia = 28; }
    if (mes == "Marzo") { mes = 03; }
    if (mes == "Abril") { mes = 04 }
    if (mes == "Mayo") { mes = 05; }
    if (mes == "Junio") { mes = 06; }
    if (mes == "Julio") { mes = 07; }
    if (mes == "Agosto") { mes = 08; }
    if (mes == "Septiembre") { mes = 09; }
    if (mes == "Octubre") { mes = 10; }
    if (mes == "Noviembre") { mes = 11; }
    if (mes == "Diciembre") { mes = 12; }

    var fechaIn = yyyy + '-' + mes + '-01';
    var fechaFin = yyyy + '-' + mes + '-' + dia;
    checkPeriodo();
    $.ajax({
        url: '/Home/getDocFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaIn, FechaFinal: fechaFin, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblDocentesLab').text('Total de Docentes en el laboratorio ' + laboratorio + ': ' + data);
            getMesLaboratorioDoc(fechaIn, fechaFin);
        },
        error: function (data) {
            alert(data);
        }
    })

}

//Mostrar los docentes que accesaron este mes
function getMesLaboratorioDoc(fi, ff) {
    checkPeriodo();
    $.ajax({
        url: '/Home/getLabDocFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fi, FechaFinal: ff, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbEstLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNoControl' + i + '">' + data[i].Numero +
                                '</td><td id="tdMateria' + i + '">' + data[i].Materia +
                                '</td><td id="tdHoraE' + i + '">' + data[i].HoraEntrada +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbEstLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar los docentes que accesaron este dia
function HoyDoc() {
    $('#fechasDoc').hide();
    $('#MesDoc').hide();
    $('#txtMesDoc').val('');
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

    checkPeriodo();
    $.ajax({
        url: '/Home/getDocFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: hoy, FechaFinal: hoy, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblDocentesLab').text('Total de Docentes en el laboratorio ' + laboratorio + ': ' + data);
            getMesLaboratorioDoc(hoy, hoy);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//////////////////ACCESOS

//Total de asistencias en los laboratorios
function MostrarAccesos() {
    $('#Usuarios').hide();
    $('#Estudiantes').hide();
    $('#EstLab').hide();
    $('#Docentes').hide();
    $('#DocLab').hide();
    $('#Cursos').hide();
    $('#CurLab').hide();
    $('#Materias').hide();
    $('#MatLab').hide();

    $('#Accesos').show();
    checkPeriodo();

    $.ajax({
        url: '/Home/getAccesos',
        type: 'POST',
        data: { Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblAccesosTotal').text('Total de Accesos: ' + data);
            getLaboratorioAcceso();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Accesos a los laboratorios
function getLaboratorioAcceso() {
    $.ajax({
        url: '/Home/loadLaboratorios',
        type: 'POST',
        data: { },
        datatype: 'JSON',
        success: function (data) {
            rowsLab = '';
            $('#tbLab > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '" style="display:none" >' + data[i].lab_id +
                                '</td><td id="tdNombre' + i + '"><label id="lblId" onclick="getLaboratorio(this)">' + data[i].lab_nombre + '</label></td></tr>';
            });
            $('#tbLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Total de asistencias en ese laboratorio
function getLaboratorio(item) {
    $('#AccLab').show();
    laboratorio = $(item).parent().parent().children('td').eq(0).text();
    checkPeriodo();
    $.ajax({
        url: '/Home/getAsistenciaLab',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblAccesosLab').text('Total de Accesos en el laboratorio ' + laboratorio + ': ' + data);
            getAsisLab();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar asistencias del laboratorio seleccionado
function getAsisLab() {
    checkPeriodo();
    $.ajax({
        url: '/Home/getAsisLab',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo: periodo },        
        datatype: 'JSON',
        success: function (data) {
            rowsLab = '';
            $('#tbAccLab > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdPrf' + i + '">' + data[i].NombrePrf +
                                '</td><td id="tdMat' + i + '">' + data[i].NombreMat +
                                '</td><td id="tdGrp' + i + '">' + data[i].Grupo +
                                '</td><td id="tdAlm' + i + '">' + data[i].Alumnos +
                                '</td><td id="tdhe' + i + '">' + data[i].HoraE +
                                '</td><td id="tdhs' + i + '">' + data[i].HoraS +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbAccLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Total de asistencias en las fechas seleccionadas
function FechaAsis() {
    $('#fechasAsis').show();
    $('#MesAsis').hide();
}

//Ocultar divs y limpiar inputs (Accesos)
function OcultarFechaAsis() {
    $('#fechasAsis').hide();
    $('#MesAsis').hide();

    $('#txtFechaInicioAsis').val('');
    $('#txtFechaFinalAsis').val('');
    $('#txtMesAsis').val('');
}

//Total de asistencia en el laboratorio con fechas seleccionadas
function BuscarFechaAsis() {
    checkPeriodo();
    var fechaInicio = $('#txtFechaInicioAsis').val();
    var fechaFinal = $('#txtFechaFinalAsis').val();
    $.ajax({
        url: '/Home/getAsisFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblAccesosLab').text('Total de Accesos en el laboratorio ' + laboratorio + ': ' + data);
            getLabAsisFecha();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Asistencias en el laboratorio con fechas seleccionadas
function getLabAsisFecha() {
    checkPeriodo();
    var fechaInicio = $('#txtFechaInicioAsis').val();
    var fechaFinal = $('#txtFechaFinalAsis').val();
    $.ajax({
        url: '/Home/getLabAsisFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbAccLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdPrf' + i + '">' + data[i].NombrePrf +
                                '</td><td id="tdMat' + i + '">' + data[i].NombreMat +
                                '</td><td id="tdGrp' + i + '">' + data[i].Grupo +
                                '</td><td id="tdAlm' + i + '">' + data[i].Alumnos +
                                '</td><td id="tdhe' + i + '">' + data[i].HoraE +
                                '</td><td id="tdhs' + i + '">' + data[i].HoraS +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbAccLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Oculta div de busqueda de mes
function MesAsis() {
    $('#MesAsis').show();
    $('#fechasAsis').hide();
}

//Total de Asistencias del mes seleccionado
function BuscarMesAsis() {
    var mes = $('#txtMesAsis').val();
    var dia = 30;

    var hoy = new Date();
    var yyyy = hoy.getFullYear();

    if (mes == "Enero") { mes = 01; }
    if (mes == "Febrero") { mes = 02; dia = 28; }
    if (mes == "Marzo") { mes = 03; }
    if (mes == "Abril") { mes = 04 }
    if (mes == "Mayo") { mes = 05; }
    if (mes == "Junio") { mes = 06; }
    if (mes == "Julio") { mes = 07; }
    if (mes == "Agosto") { mes = 08; }
    if (mes == "Septiembre") { mes = 09; }
    if (mes == "Octubre") { mes = 10; }
    if (mes == "Noviembre") { mes = 11; }
    if (mes == "Diciembre") { mes = 12; }

    var fechaIn = yyyy + '-' + mes + '-01';
    var fechaFin = yyyy + '-' + mes + '-' + dia;
    checkPeriodo();
    $.ajax({
        url: '/Home/getAsisFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaIn, FechaFinal: fechaFin, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblAccesosLab').text('Total de Accesos en el laboratorio ' + laboratorio + ': ' + data);
            getMesLaboratorioAsis(fechaIn, fechaFin);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Asistencias del mes seleccionado
function getMesLaboratorioAsis(fi, ff) {
    checkPeriodo();
    $.ajax({
        url: '/Home/getLabAsisFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fi, FechaFinal: ff, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbAccLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdPrf' + i + '">' + data[i].NombrePrf +
                                '</td><td id="tdMat' + i + '">' + data[i].NombreMat +
                                '</td><td id="tdGrp' + i + '">' + data[i].Grupo +
                                '</td><td id="tdAlm' + i + '">' + data[i].Alumnos +
                                '</td><td id="tdhe' + i + '">' + data[i].HoraE +
                                '</td><td id="tdhs' + i + '">' + data[i].HoraS +
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbAccLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Asistencias diarias
function HoyAsis() {
    $('#fechasDoc').hide();
    $('#MesDoc').hide();
    $('#txtMesDoc').val('');
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
    checkPeriodo();
    $.ajax({
        url: '/Home/getAsisFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: hoy, FechaFinal: hoy, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblAccesosLab').text('Total de Accesos en el laboratorio ' + laboratorio + ': ' + data);
            getMesLaboratorioAsis(hoy, hoy);
        },
        error: function (data) {
            alert(data);
        }
    })
}

/////////////////CURSOS
//Total de cursos en los laboratorios
function MostrarCursos() {
    $('#Cursos').show();
    $('#Accesos').hide();
    $('#AccLab').hide();
    $('#Docentes').hide();
    $('#DocLab').hide();
    $('#Estudiantes').hide();
    $('#EstLab').hide();
    $('#Usuarios').hide();
    $('#Materias').hide();
    $('#MatLab').hide();
    checkPeriodo();

    $.ajax({
        url: '/Home/getCursos',
        type: 'POST',
        data: { Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblCursosTotal').text('Total de Cursos Atendidos: ' + data);
            getLaboratorioCurso();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Cursos a los laboratorios
function getLaboratorioCurso() {
    $.ajax({
        url: '/Home/loadLaboratorios',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            rowsLab = '';
            $('#tbCur > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '" style="display:none" >' + data[i].lab_id +
                                '</td><td id="tdNombre' + i + '"><label id="lblId" onclick="getCurso(this)">' + data[i].lab_nombre + '</label></td></tr>';
            });
            $('#tbCur > tbody').append(rowsLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Total de cursos en ese laboratorio
function getCurso(item) {
    $('#CurLab').show();
    laboratorio = $(item).parent().parent().children('td').eq(0).text();
    checkPeriodo();
    $.ajax({
        url: '/Home/getCursoLab',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblCursosLab').text('Total de Cursos Atendidos en el laboratorio ' + laboratorio + ' :' + data);
            getCurLab();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Mostrar cursos del laboratorio seleccionado
function getCurLab() {
    checkPeriodo();
    $.ajax({
        url: '/Home/getCurLab',
        type: 'POST',
        data: { Laboratorio: laboratorio, Periodo:periodo },
        datatype: 'JSON',
        success: function (data) {
            rowsLab = '';
            $('#tbCurLab > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdPrf' + i + '">' + data[i].NombreCurso +
                                '</td><td id="tdMat' + i + '">' + data[i].RepresentanteCurso +
                                '</td><td id="tdGrp' + i + '">' + data[i].PresentadorCurso +
                                '</td><td id="tdAlm' + i + '">' + data[i].HoraECurso +
                                '</td><td id="tdhe' + i + '">' + data[i].HoraSCurso +                                
                                '</td><td id="tdFecha' + i + '">' + data[i].DiaCurso + '</td></tr>';
            });
            $('#tbCurLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Total de cursos en las fechas seleccionadas
function FechaCur() {
    $('#fechasCur').show();
    $('#MesCur').hide();
}

//Ocultar divs y limpiar inputs (Cursos)
function OcultarFechaCur() {
    $('#fechasCur').hide();
    $('#MesCur').hide();

    $('#txtFechaInicioCur').val('');
    $('#txtFechaFinalCur').val('');
    $('#txtMesCur').val('');
}

//Total de cursos en el laboratorio con fechas seleccionadas
function BuscarFechaCur() {
    var fechaInicio = $('#txtFechaInicioCur').val();
    var fechaFinal = $('#txtFechaFinalCur').val();
    checkPeriodo();
    $.ajax({
        url: '/Home/getCurFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblCursosLab').text('Total de Cursos Atendidos en el laboratorio ' + laboratorio + ' :' + data);
            getLabCurFecha();
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Cursos en el laboratorio con fechas seleccionadas
function getLabCurFecha() {
    var fechaInicio = $('#txtFechaInicioCur').val();
    var fechaFinal = $('#txtFechaFinalCur').val();
    checkPeriodo();
    $.ajax({
        url: '/Home/getLabCurFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaInicio, FechaFinal: fechaFinal, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbCurLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdPrf' + i + '">' + data[i].NombreCurso +
                                '</td><td id="tdMat' + i + '">' + data[i].RepresentanteCurso +
                                '</td><td id="tdGrp' + i + '">' + data[i].PresentadorCurso +
                                '</td><td id="tdAlm' + i + '">' + data[i].HoraECurso +
                                '</td><td id="tdhe' + i + '">' + data[i].HoraSCurso +
                                '</td><td id="tdFecha' + i + '">' + data[i].DiaCurso + '</td></tr>';
            });
            $('#tbCurLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Oculta div de busqueda de mes
function MesCur() {
    $('#MesCur').show();
    $('#fechasCur').hide();
}

//Total de Cursos del mes seleccionado
function BuscarMesCur() {
    var mes = $('#txtMesCur').val();
    var dia = 30;

    var hoy = new Date();
    var yyyy = hoy.getFullYear();

    if (mes == "Enero") { mes = 01; }
    if (mes == "Febrero") { mes = 02; dia = 28; }
    if (mes == "Marzo") { mes = 03; }
    if (mes == "Abril") { mes = 04 }
    if (mes == "Mayo") { mes = 05; }
    if (mes == "Junio") { mes = 06; }
    if (mes == "Julio") { mes = 07; }
    if (mes == "Agosto") { mes = 08; }
    if (mes == "Septiembre") { mes = 09; }
    if (mes == "Octubre") { mes = 10; }
    if (mes == "Noviembre") { mes = 11; }
    if (mes == "Diciembre") { mes = 12; }

    var fechaIn = yyyy + '-' + mes + '-01';
    var fechaFin = yyyy + '-' + mes + '-' + dia;
    checkPeriodo();
    $.ajax({
        url: '/Home/getCurFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fechaIn, FechaFinal: fechaFin, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            $('#lblCursosLab').text('Total de Cursos Atendidos en el laboratorio ' + laboratorio + ' :' + data);
            getMesLaboratorioCur(fechaIn, fechaFin);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Cursos del mes seleccionado
function getMesLaboratorioCur(fi, ff) {
    checkPeriodo();
    $.ajax({
        url: '/Home/getLabCurFecha',
        type: 'POST',
        data: { Laboratorio: laboratorio, FechaInicio: fi, FechaFinal: ff, Periodo: periodo },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbCurLab > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdPrf' + i + '">' + data[i].NombreCurso +
                                '</td><td id="tdMat' + i + '">' + data[i].RepresentanteCurso +
                                '</td><td id="tdGrp' + i + '">' + data[i].PresentadorCurso +
                                '</td><td id="tdAlm' + i + '">' + data[i].HoraECurso +
                                '</td><td id="tdhe' + i + '">' + data[i].HoraSCurso +
                                '</td><td id="tdFecha' + i + '">' + data[i].DiaCurso + '</td></tr>';
            });
            $('#tbCurLab > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}


///////////////
//Funcion para mostrar las carreras registradas
function MostrarMaterias() {
    $('#Materias').show();
    $('#Usuarios').hide();
    $('#Estudiantes').hide();
    $('#EstLab').hide();
    $('#Docentes').hide();
    $('#DocLab').hide();
    $('#Accesos').hide();
    $('#AccLab').hide();
    $('#Cursos').hide();
    $('#CurLab').hide();
    $.ajax({
        url: '/Home/loadCarreras',
        type: 'POST',
        data: { },
        datatype: 'JSON',
        success: function (data) {
            rowsCar = '';
            $('#tbMat > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsCar += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '" style="display:none" >' + data[i].car_id +
                                '</td><td id="tdNombre' + i + '"><label id="lblCar" onclick="getMateriaCar(this)" >' + data[i].car_nombre + '</label></td></tr>';
            });
            $('#tbMat > tbody').append(rowsCar);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion prar mostrar las materias atendidas dependiendo de la carrera seleccionada
function getMateriaCar(item) {
    $('#MatLab').show();
    var carrera = $(item).parent().parent().children('td').eq(0).text();
    checkPeriodo();
    $.ajax({
        url: '/Home/getMateriaCar',
        type: 'POST',
        data: {Carrera: carrera, Periodo: periodo},
        datatype: 'JSON',
        success: function (data) {
            rowsCar = '';
            $('#tbMatCar > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsCar += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '" style="display:none" >' + data[i].IdMateria +
                                '</td><td id="tdNombre' + i + '">' + data[i].NombreMateria +
                                '</td><td id="tdAtendido' + i + '">' + data[i].Atendido + '</td></tr>';
            });
            $('#tbMatCar > tbody').append(rowsCar);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para mostrar el campo de period
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

////////Eportaciones

//Funcion para exportar la informacion de accesos no programados
function ExportarAccNo() {
    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('tbEstLab');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'Accesos No Programados ' + laboratorio + ' ' + periodo + '.xls';
    a.click();
}

//Funcion para exportar la informacion de accesos
function ExportarAcc() {
    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('tbAccLab');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'Accesos ' + laboratorio + ' ' + periodo + '.xls';
    a.click();
}

//Funcion para exportar la informacion de cursos
function ExportarCur() {
    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('tbCurLab');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'Cursos ' + laboratorio + ' ' + periodo + '.xls';
    a.click();
}

//Funcion para exportar la informacion de materias atendidas
function ExportarMat() {
    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('tbMatCar');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'Materias Atendidas ' + periodo + '.xls';
    a.click();
}