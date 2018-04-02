var nombreTable, serieTable, semestreTable, carreraTable, hpTable, sizeTabla, lista = [];

//Funcion para validar los campos
function validar() {
    var i = 0;

    if ($("#txtNombre").val().length < 1) {
        i++;
    }
    if ($("#txtSemestre").val().length < 1) {
        i++;
    }
    if ($("#txtCarrera").val().length < 1) {
        i++;
    }
    if ($("#txtSerie").val().length < 1) {
        i++;
    }
    if ($("#txtHPracticas").val().length < 1) {
        i++;
    }


    if (i == 5) {
        alert("Por favor llene todos los campos.");
        return false;
    }


    if ($("#txtNombre").val().length < 1) {
        alert("El nombre es obligatorio.");
    }
    if ($("#txtSemestre").val().length < 1) {
        alert("El semestre designado es obligatorio.");
    }
    if ($("#txtCarrera").val().length < 1) {
        alert("La carrera es obligatorio.");
    }
    if ($("#txtSerie").val().length < 1) {
        alert("La serie es obligatorio.");
    }
    if ($("#txtHPracticas").val().length < 1) {
        alert("El campo de horas practicas es obligatorio.");
    }

    if (i == 0) {
        saveMtr();        
        $('#txtSerie').val('');
        $('#txtNombre').val('');
        $('#txtSemestre').val('');
        $('#txtCarrera').val('');
        $('#txtHPracticas').val('');
        return false;
    }

}

//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtSerie').val('');
    $('#txtNombre').val('');
    $('#txtSemestre').val('');
    $('#txtCarrera').val('');
    $('#txtHPracticas').val('');
}

//Función de busqueda dinámica para carreras
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

//Función de busqueda dinámica para asignaturas
function filtrarMrt(e) {
    var trId;
    var trNombre, trSemestre, trCarrera, trSerie, trHPrac;
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
            trSerie = $(tr).children('td').eq(0).text();
            trNombre = $(tr).children('td').eq(1).text();
            trSemestre = $(tr).children('td').eq(2).text();
            trCarrera = $(tr).children('td').eq(3).text();
            trHPrac = $(tr).children('td').eq(4).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trSemestre.match(regexp) || trCarrera.match(regexp) || trSerie.match(regexp) || trHPrac.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar la carrera en el campo correspondiente
function mostrarCar(item) {
    $('#txtCarrera').val('');
    var carrera = $(item).parent().parent().children('td').eq(1).text();
    $('#txtCarrera').val(carrera);
}

//Función para ingresar la asignatura en el campo correspondiente
function mostrarMtr(item) {
    $('#txtSerie').val('');
    $('#txtNombre').val('');
    $('#txtSemestre').val('');
    $('#txtCarrera').val('');
    $('#txtHPracticas').val('');
    var serie = $(item).parent().parent().children('td').eq(0).text().substring(0,1);
    var nombre = $(item).parent().parent().children('td').eq(1).text();
    var semestre = $(item).parent().parent().children('td').eq(2).text();
    var carrera = $(item).parent().parent().children('td').eq(3).text();
    var hPrac = $(item).parent().parent().children('td').eq(4).text();
    $('#txtSerie').val(serie);
    $('#txtNombre').val(nombre);
    $('#txtSemestre').val(semestre);
    $('#txtCarrera').val(carrera);
    $('#txtHPracticas').val(hPrac);
}

//Función para mostrar las carreras en el modal
function limpiarModalCar() {
    $('#SearchCar').val('');    
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
                rowsMtr += '<tr id="trInfo' + (i + 1) + '"><td id="tdSerie' + i + '"><label id="lblId" onclick="mostrarMtr(this)">' + data[i].IdMateria +
                                '</label></td><td id="tdNombre' + i + '">' + data[i].NombreMateria +
                                '</td><td id="tdSemestre' + i + '">' + data[i].SemestreMat +
                                '</td><td id="tdCarrera' + i + '">' + data[i].CarreraMat +
                                '</td><td id="tdHPrac' + i + '">' + data[i].HorasP +
                                '</td><td id="tdDelete' + i + '"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteMtr(this)"></i></td></tr>';
            });
            $('#tbMrt > tbody').append(rowsMtr);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para elimiar asignatura
function deleteMtr(item) {
    var serie = $(item).parent().parent().children('td').eq(0).text();
    $.ajax({
        url: '/Home/eliminarMtr',
        type: 'POST',
        data: { Materia: serie },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registrar asignatura
function saveMtr() {
    var serie = $('#txtSerie').val();
    var nombre = $('#txtNombre').val();
    var semestre = $('#txtSemestre').val();
    var carrera = $('#txtCarrera').val();
    var hprac = $('#txtHPracticas').val();
    $.ajax({
        url: '/Home/saveMateria',
        type: 'POST',
        data: { Serie: serie, Nombre: nombre, Semestre: semestre, Carrera: carrera, HPracticas: hprac },        
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registar mateiras de una tabla de importacion
function saveMatTable() {
    $('#my_file_output > tbody > tr').each(function (i, item) {
        sizeTabla = i;
    })

    $('#my_file_output > tbody > tr').each(function (i, item) {
        serieTable = $(item).children('td').eq(0).text(),
        nombreTable = $(item).children('td').eq(1).text(),
        semestreTable = $(item).children('td').eq(2).text(),
        carreraTable = $(item).children('td').eq(3).text(),
        hpTable = $(item).children('td').eq(4).text();
        if (serieTable !== "" && nombreTable !== "" && semestreTable !== "" && carreraTable !== "" && hpTable !== "") {
            $.ajax({
                url: '/Home/saveMateriaImportar',
                type: 'POST',
                data: { Serie: serieTable, Nombre: nombreTable, Semestre: semestreTable, Carrera: carreraTable, HPracticas: hpTable },
                datatype: 'JSON',
                success: function (data) {
                    var mensaje = "Registro " + (i + 1) + ". " + data + "\n";
                    lista.push(mensaje);
                    if (i == sizeTabla) {
                        if (lista.length > 23)
                        {
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
                },
                error: function (data) {
                    alert(data);
                }
            })
        }
    })
    $('#my_file_output > tbody').empty();
    $('#my_file_input').val('');
}

//Funcion pra limpiar la tabla de importacion
function limpiarTabla() {
    $("#my_file_output > tbody ").empty();
}

//Función para herramienta de autocompletar en el campo de carrera
$('#txtCarrera').autocomplete({
    serviceUrl: '../Home/getCarrera'
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});