var serieTable, nombreTable, contratoTable, correoTable, telefonoTable, sizeTabla, lista = [];

//Funcion para validar los campos
function validar() {
    var i = 0;    

    if ($("#txtNombre").val().length < 1) {
        i++;
    }
    if ($("#txtNoEmp").val().length < 1) {
        i++;
    }
    if ($("#txtContrato").val().length < 1) {
        i++;
    }
    if ($("#txtTelefono").val().length < 1) {
        i++;
    }
    if ($("#txtCorreo").val().length < 1) {
        i++;
    }

    if (i == 5) {
        alert("Por favor llene todos los campos.");
        return false;
    }

    if ($("#txtNombre").val().length < 1) {
        alert("El nombre es obligatorio.");
    }
    if ($("#txtNoEmp").val().length < 1) {
        alert("El numero de empleado es obligatorio.");
    }    
    if ($("#txtContrato").val().length < 1) {
        alert("El campo contrato es obligatorio.");
    }
    if ($("#txtTelefono").val().length < 1) {
        alert("El campo telefono es obligatorio.");
    }
    if ($("#txtCorreo").val().length < 1) {
        alert("El campo correo es obligatorio.");
    }
    
    if (i == 0) {
        savePrf();        
        $('#txtNombre').val('');
        $('#txtNoEmp').val('');
        $('#txtContrato').val('');
        $('#txtTelefono').val('');
        $('#txtCorreo').val('');
    }
    
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
    $('#txtNombre').val('');
    $('#txtNoEmp').val('');
    $('#txtContrato').val('');
    $('#txtCorreo').val('');
    $('#txtTelefono').val('');
    var noEmp = $(item).parent().parent().children('td').eq(0).text();
    var nombre = $(item).parent().parent().children('td').eq(1).text();
    var contrato = $(item).parent().parent().children('td').eq(2).text();
    var correo = $(item).parent().parent().children('td').eq(3).text();
    var telefono = $(item).parent().parent().children('td').eq(4).text();
    $('#txtNombre').val(nombre);
    $('#txtNoEmp').val(noEmp);
    $('#txtContrato').val(contrato);
    $('#txtCorreo').val(correo);
    $('#txtTelefono').val(telefono);
}

//Funcion para registrar las cajas de texto
function limpiar() {
    $('#txtNombre').val('');
    $('#txtNoEmp').val('');
    $('#txtContrato').val('');
    $('#txtTelefono').val('');
    $('#txtCorreo').val('');
}

//Función para mostrar los docentes en el modal
function limpiarModalPrf() {
    $('#Search').val('');
    
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
                rowsPrf += '<tr id="trInfo' + (i + 1) + '"><td id="tdId' + i + '"><label id="lblI" onclick="mostrarPrf(this)"> ' + data[i].prf_id +
                                '</label></td><td id="tdNombre' + i + '">' + data[i].prf_nombreCompleto +
                                '</td><td id="tdPuesto' + i + '">' + data[i].prf_contrato +
                                '</td><td id="tdVigencia' + i + '">' + data[i].prf_correo +
                                '</td><td id="tdCorreo' + i + '">' + data[i].prf_telefono +
                                '</td><td id="tdDelete' + i + '"><i class="fa fa-trash-o" aria-hidden="true" onclick="deletePrf(this)"></i></td></tr>';
            });
            $('#tbPrf > tbody').append(rowsPrf);
        },
        error: function(data){
            alert('doesnt work');
    }
    })
}

//Funcion para eliminar el docente
function deletePrf(item) {
    var serie = $(item).parent().parent().children('td').eq(0).text();
    $.ajax({
        url: '/Home/elminarPrf',
        type: 'POST',
        data: { Profesor: serie },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registrar docente
function savePrf() {
    var noEmp = $('#txtNoEmp').val();
    var nombre = $('#txtNombre').val();
    var contrato = $('#txtContrato').val();
    var telefono = $('#txtTelefono').val();
    var correo = $('#txtCorreo').val();
    $.ajax({
        url: '/Home/saveProfesores',        
        type: 'POST',
        data: { NoEmp: noEmp, Nombre: nombre, Contrato: contrato, Correo: correo, Telefono: telefono },        
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registrar docentes de una tabla de importacion
function savePrfTable() {
    $('#my_file_output > tbody > tr').each(function (a, item) {
        sizeTabla = a;
    })

    $('#my_file_output > tbody > tr').each(function (i, item) {
        serieTable = $(item).children('td').eq(0).text(),
        nombreTable = $(item).children('td').eq(1).text(),
        contratoTable = $(item).children('td').eq(2).text(),
        correoTable = $(item).children('td').eq(3).text(),
        telefonoTable = $(item).children('td').eq(4).text();
        if (serieTable !== "" && nombreTable !== "" && contratoTable !== "" && correoTable !== "" || telefonoTable !== "") {
            $.ajax({
                url: '/Home/saveProfesoresImportar',
                type: 'POST',
                data: { NoEmp: serieTable, Nombre: nombreTable, Contrato: contratoTable, Correo: correoTable, Telefono: telefonoTable },
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

//Funcion para limpiar la tabla de importacion
function limpiarTabla() {
    $("#my_file_output > tbody ").empty();
}