var carreraGrpUno, carreraGrpDos, grupoUno, grupoDos, materia, profesor, grupo, laboratorio, horaE, horaS, dia, alumnos, sizeTabla, lista = [];

//Funcion para guardar los grupos comparitdos importados de una tabla
function validar() {
    var noFilas = document.getElementById("my_file_output").rows.length;

    var fecha = new Date();
    var mes = fecha.getMonth() + 1; //hoy es 0!
    var anio = fecha.getFullYear();

    var numeroPerido;
    if (mes >= 01 && mes <= 6) { numeroPerido = 1; }
    if (mes == 07) { numeroPerido = "Verano"; }
    if (mes >= 08 && mes <= 12) { numeroPerido = 2; }

    var periodo = anio + '-' + numeroPerido;

    $('#my_file_output > tbody > tr').each(function (i, item) {
        sizeTabla = i;
    })

    $('#my_file_output > tbody > tr').each(function (i, item) {
        carreraGrpUno = $(item).children('td').eq(0).text(),
        grupoUno = $(item).children('td').eq(1).text(),
        carreraGrpDos = $(item).children('td').eq(2).text(),
        grupoDos = $(item).children('td').eq(3).text(),
        grupo = $(item).children('td').eq(4).text(),
        alumnos = $(item).children('td').eq(5).text(),
        materia = $(item).children('td').eq(6).text(),
        profesor = $(item).children('td').eq(7).text(),                        
        laboratorio = $(item).children('td').eq(8).text(),
        horaE = $(item).children('td').eq(9).text(),
        horaS = $(item).children('td').eq(10).text(),
        dia = $(item).children('td').eq(11).text();
        if (carreraGrpUno !== "" && grupoUno !== "" && carreraGrpDos !== "" && grupoDos !== "" && profesor !== "" && grupo !== "" && alumnos !== "" && materia !== "" && laboratorio !== "" && horaE !== "" && horaS !== "" && dia !== "") {
            $.ajax({
                url: '/Home/saveGRpComImportar',
                type: 'POST',
                data: { CarGrpUno:carreraGrpUno, CarGrpDos:carreraGrpDos, GrupoUno:grupoUno, GrupoDos:grupoDos, Grupo: grupo, Alumnos: alumnos, Materia: materia, Profesor: profesor, Laboratorio: laboratorio, HoraEntrada: horaE, HoraSalida: horaS, Dia: dia, Periodo: periodo },
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
            });
        }
    })

    $('#my_file_output > tbody').empty();
    $('#my_file_input').val('');
}

//Funcion para limpiar la tabla de importacion
function limpiar() {
    $('#my_file_output > tbody').empty();
    $('#my_file_input').val('');
}

//Funcion para limpiar la tabla de importacion
function limpiarTabla() {
    $("#my_file_output > tbody ").empty();
}

////Función de busqueda dinámica para carreras
function filtrarCar(e) {
    var trId;
    var trIdCar, trNombre;
    var itemValue = $(e).val();
    $('#tbCar tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbCar tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trIdCar = $(tr).children('td').eq(0).text();
            trNombre = $(tr).children('td').eq(1).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trIdCar.match(regexp) || trNombre.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para mostrar la primera carrera en el modal
function limpiarModalCar() {
    //$('#SearchCar').val('');
    //var car = $('#SearchCar').val('');
    //filtrarCar(car);
    var rowsCar = '';
    $.ajax({
        url: '/Home/loadCarreras',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbCar > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsCar += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '"><label id="lblId" onclick="mostrarCar(this)" >' + data[i].car_id +
                                '</td><td id="tdNombre' + i + '">' + data[i].car_nombre + '</td></tr>';
            });
            $('#tbCar > tbody').append(rowsCar);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función para mostrar la segunda carrera en el modal
function limpiarModalCarDos() {
    //$('#SearchCar').val('');
    //var car = $('#SearchCar').val('');
    //filtrarCar(car);
    var rowsCar = '';
    $.ajax({
        url: '/Home/loadCarreras',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbCar > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsCar += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '"><label id="lblId" onclick="mostrarCarDos(this)" >' + data[i].car_id +
                                '</td><td id="tdNombre' + i + '">' + data[i].car_nombre + '</td></tr>';
            });
            $('#tbCar > tbody').append(rowsCar);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Función para ingresar la primera carrera en el campo correspondiente
function mostrarCar(item) {
    $('#txtCarreraUno').val('');
    var carrera = $(item).parent().parent().children('td').eq(1).text();
    $('#txtCarreraUno').val(carrera);
}

//Función para ingresar la segunda carrera en el campo correspondiente
function mostrarCarDos(item) {
    $('#txtCarreraDos').val('');
    var carrera = $(item).parent().parent().children('td').eq(1).text();
    $('#txtCarreraDos').val(carrera);
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
    var materia = $(item).parent().parent().children('td').eq(0).text();
    $('#txtMateria').val(materia);
}

//Función para mostrar las asignaturas en el modal
function limpiarModalMtr() {
    //$('#SearchMtr').val('');
    //var mrt = $('#SearchMtr').val('');
    //filtrarMrt(mrt);
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
                rowsMtr += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '"><label id="lblId" onclick="mostrarMtr(this)">' + data[i].NombreMateria +                                
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
            trPuesto = $(tr).children('td').eq(2).text();
            trCorreo = $(tr).children('td').eq(4).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trNoEmp.match(regexp) || trPuesto.match(regexp) || trPuesto.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar el docente en el campo correspondiente
function mostrarPrf(item) {
    $('#txtProfesor').val('');
    var profesor = $(item).parent().parent().children('td').eq(1).text();
    $('#txtProfesor').val(profesor);
}

//Función para mostrar los docentes en el modal
function limpiarModalPrf() {
    //$('#SearchPrf').val('');
    //var prf = $('#SearchPrf').val('');
    //filtrarPrf(prf);
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

//Funcion para limpiar las cajas de texto
function limpiarInfo() {
    $('#txtCarreraUno').val('');
    $('#txtGrupoUno').val('');
    $('#txtCarreraDos').val('');
    $('#txtGrupoDos').val('');
    $('#txtGrupo').val('');
    $('#txtMateria').val('');
    $('#txtCapacidad').val('');
    $('#txtProfesor').val('');
    $('#txtLaboratorio').val('');
    $('#txtHoraEntrada').val('');
    $('#txtHoraSalida').val('');
    $('#txtDia').val('');
}

//Funcion para validar los campos
function validarInfo() {
    var i = 0;

    if ($("#txtCarreraUno").val().length < 1) {
        i++;
    }
    if ($("#txtGrupoUno").val().length < 1) {
        i++;
    }
    if ($("#txtCarreraDos").val().length < 1) {
        i++;
    }
    if ($("#txtGrupoDos").val().length < 1) {
        i++;
    }
    if ($("#txtGrupo").val().length < 1) {
        i++;
    }
    if ($("#txtMateria").val().length < 1) {
        i++;
    }
    if ($("#txtCapacidad").val().length < 1) {
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

    if (i == 12) {
        alert('Por favor llene todos los campos');
        return false;
    }

    if ($("#txtCarreraUno").val().length < 1) {
        alert('El campo carrera del grupo uno es obligatorio');
    }
    if ($("#txtGrupoUno").val().length < 1) {
        alert('El campo del grupo uno es obligatorio');
    }
    if ($("#txtCarreraDos").val().length < 1) {
        alert('El campo carrera del grupo dos es obligatorio');
    }
    if ($("#txtGrupoDos").val().length < 1) {
        alert('El campo del grupo dos es obligatorio');
    }
    if ($("#txtGrupo").val().length < 1) {
        alert('El campo grupo de la materia compartida es obligatorio');
    }
    if ($("#txtMateria").val().length < 1) {
        alert('El campo materia es obligatorio');
    }
    if ($("#txtCapacidad").val().length < 1) {
        alert('El campo alumnos es obligatorio');
    }
    if ($("#txtProfesor").val().length < 1) {
        alert('El campo profesor es obligatorio');
    }
    if ($("#txtLaboratorio").val().length < 1) {
        alert('El campo laboratorio es obligatorio');
    }
    if ($("#txtHoraEntrada").val().length < 1) {
        alert('El campo hora de entrada es obligatorio');
    }
    if ($("#txtHoraSalida").val().length < 1) {
        alert('El campo hora de salida es obligatorio');
    }
    if ($("#txtDia").val().length < 1) {
        alert('El campo dia es obligatorio');
    }

    if (i == 0) {
        saveCompartido();
        $('#txtCarreraUno').val('');
        $('#txtGrupoUno').val('');
        $('#txtCarreraDos').val('');
        $('#txtGrupoDos').val('');
        $('#txtGrupo').val('');
        $('#txtMateria').val('');
        $('#txtCapacidad').val('');
        $('#txtProfesor').val('');
        $('#txtLaboratorio').val('');
        $('#txtHoraEntrada').val('');
        $('#txtHoraSalida').val('');
        $('#txtDia').val('');
    }
}

//Funcion para registrar un grupo compartido
function saveCompartido() {
    var carUno = $('#txtCarreraUno').val();
    var grpUno = $('#txtGrupoUno').val();
    var carDos = $('#txtCarreraDos').val();
    var grpDos = $('#txtGrupoDos').val();
    var grupo = $('#txtGrupo').val();
    var materia = $('#txtMateria').val();
    var alumnos = $('#txtCapacidad').val();
    var profesor = $('#txtProfesor').val();
    var lab = $('#txtLaboratorio').val();
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
        url: '/Home/saveGrupoCom',
        type: 'POST',
        data: { CarreraGrupoUno: carUno, GrupoUno: grpUno, CarreraGrupoDos: carDos, GrupoDos: grpDos, Grupo: grupo, Materia: materia, Alumnos: alumnos, Profesor: profesor, Laboratorio: lab, HoraEntrada: he, HoraSalida: hs, Dia: dia, Periodo: periodo},
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Función para herramienta de autocompletar en el campo de carrrera uno
$('#txtCarreraUno').autocomplete({
    serviceUrl: '../Home/getCarrera'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});

//Función para herramienta de autocompletar en el campo de carrera dos
$('#txtCarreraDos').autocomplete({
    serviceUrl: '../Home/getCarrera'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});

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
    serviceUrl: '../Home/getMateria'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});