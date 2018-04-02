var serieTable, nombreTable, sizeTabla, lista = [];


//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtSerie').val('');
    $('#txtNombre').val('');    
}

//Funcion para validar los campos
function validar() {
    var i = 0;

    if ($('#txtNombre').val().length < 1) {
        i++;
    }
    if ($('#txtSerie').val().length < 1) {
        i++;
    }    

    if (i == 2) {
        alert('Por favor llene todos los campos.');
        return false;
    }


    if ($('#txtNombre').val().length < 1) {
        alert("El campo nombre es obligatorio");
    }
    if ($('#txtSerie').val().length < 1) {
        alert("El campo serie es obligatorio");
    }

    if (i > 0) {
        return false;
    }
    else {
        saveCar();        
        $('#txtSerie').val('');
        $('#txtNombre').val('');        
        return false;
    }
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

//Función para ingresar la carrera en el campo correspondiente
function mostrarCar(item) {
    $('#txtSerie').val('');
    $('#txtNombre').val('');
    var serie = $(item).parent().parent().children('td').eq(0).text();
    var nombre = $(item).parent().parent().children('td').eq(1).text();
    $('#txtSerie').val(serie);
    $('#txtNombre').val(nombre);
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
                                '</td><td id="tdNombre' + i + '">' + data[i].car_nombre +
                                '</td><td id="tdDelete' + i + '"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteCar(this)"></i></td></tr>';
            });
            $('#tbCar > tbody').append(rowsCar);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para registrar una carrera
function saveCar() {
    var serie = $('#txtSerie').val();
    var nombre = $('#txtNombre').val();    
    $.ajax({
        url: '/Home/saveCarrera',
        type: 'POST',
        data: { Serie:serie, Nombre:nombre },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para eliminar una carrera
function deleteCar(item) {
    var serie = $(item).parent().parent().children('td').eq(0).text();
    $.ajax({
        url: '/Home/elminarCar',
        type: 'POST',
        data: { Carrera: serie },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para guardar varias carreras de una tabla
function saveCarTable() {
    $('#my_file_output > tbody > tr').each(function (i, item) {        
        sizeTabla = i;
    })

    $('#my_file_output > tbody > tr').each(function (i, item) {
        serieTable = $(item).children('td').eq(0).text(),
        nombreTable = $(item).children('td').eq(1).text();
        if (serieTable !== "" && nombreTable !== "") {
            $.ajax({
                url: '/Home/saveCarreraImportar',
                type: 'POST',
                data: { Serie: serieTable, Nombre: nombreTable },
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
        }
    })
    $('#my_file_output > tbody').empty();
    $('#my_file_input').val('');
}

//Funcion para limpiar los datos de la tabla de importacion
function limpiarTabla() {
    $("#my_file_output > tbody ").empty();
}