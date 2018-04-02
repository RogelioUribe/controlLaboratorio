var serieTable, nombreTable, capacidadTable, descTable, sizeTabla, lista = [];

//Funcion para limpiar cajas de texto
function limpiar() {
    $('#txtSerie').val('');
    $('#txtLaboratorio').val('');
    $('#txtCapacidad').val('');
    $('#txtObservaciones').val('');
}

//Funcion para validar campos
function validar() {
    var i = 0;

    if ($("#txtSerie").val().length < 1) {
        i++;
    }
    if ($("#txtLaboratorio").val().length < 1) {
        i++;
    }
    if ($("#txtCapacidad").val().length < 1) {
        i++;
    }    


    if (i == 3) {
        alert("Por favor llene todos los campos.");
        return false;
    }

    if ($("#txtSerie").val().length < 1) {
        alert("El campo serie es obligatorio.");
    }
    if ($("#txtLaboratorio").val().length < 1) {
        alert("El campo nombre es obligatorio.");
    }
    if ($("#txtCapacidad").val().length < 1) {
        alert("El campo capacidad es obligatorio.");
    }    

    if (i > 0) {        
        return false;
    }
    else {
        saveLab();        
        $('#txtSerie').val('');
        $('#txtLaboratorio').val('');
        $('#txtCapacidad').val('');
        $('#txtObservaciones').val('');
    }
}

//Función de busqueda dinámica para laboratorios
function filtrarLab(e) {
    var trId;
    var trSerie, trNombre, trCapacidad;
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
            trSerie = $(tr).children('td').eq(0).text();
            trNombre = $(tr).children('td').eq(1).text();
            trCapacidad = $(tr).children('td').eq(2).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trCapacidad.match(regexp) || trSerie.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para ingresar el laboratorio en el campo correspondiente
function mostrarLab(item) {
    $('#txtSerie').val('');
    $('#txtLaboratorio').val('');
    $('#txtCapacidad').val('');
    $('#txtObservaciones').val('');
    var Idlab = $(item).parent().parent().children('td').eq(0).text();
    var lab = $(item).parent().parent().children('td').eq(1).text();
    var capacidad = $(item).parent().parent().children('td').eq(2).text();
    var des = $(item).parent().parent().children('td').eq(3).text();
    $('#txtSerie').val(Idlab);
    $('#txtLaboratorio').val(lab);
    $('#txtCapacidad').val(capacidad);
    $('#txtObservaciones').val(des);
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
                rowsLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdNombre' + i + '"><label id="lblId" onclick="mostrarLab(this)">' + data[i].lab_id +
                                '</label></td><td id="tdCapacidad' + i + '">' + data[i].lab_nombre +
                                '</td><td id="tdCapacidad' + i + '">' + data[i].lab_capacidad +
                                '</td><td id="tdDescripcion' + i + '">' + data[i].lab_descripcion + 
                                '</td><td id="tdDelete' + i + '"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteLab(this)"></i></td></tr>';
            });
            $('#tbLab > tbody').append(rowsLab);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para registrar el laboratorio
function saveLab() {
    var serie = $('#txtSerie').val();
    var nombre = $('#txtLaboratorio').val();
    var capacidad = $('#txtCapacidad').val();
    var descripcion = $('#txtObservaciones').val();    
    $.ajax({
        url: '/Home/saveLaboratorio',
        type: 'POST',
        data: { Serie: serie, Nombre: nombre, Capacidad: capacidad, Descripcion: descripcion },
        datatype: 'JSON',
        success: function (data) {           
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para elimiar un laboratorio
function deleteLab(item) {
    var serie = $(item).parent().parent().children('td').eq(0).text();
    $.ajax({
        url: '/Home/eliminarLab',
        type: 'POST',
        data: { Laboratorio: serie },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registrar laboratorios de una tabla de importacion
function saveLabTable() {
    $('#my_file_output > tbody > tr').each(function (i, item) {
        sizeTabla = i;
    })

    $('#my_file_output > tbody > tr').each(function (i, item) {
        serieTable = $(item).children('td').eq(0).text(),
        nombreTable = $(item).children('td').eq(1).text(),
        capacidadTable = $(item).children('td').eq(2).text(),
        descTable = $(item).children('td').eq(3).text();
        if (serieTable !== "" && nombreTable !== "" && capacidadTable !== "" && descTable !== "") {
            $.ajax({
                url: '/Home/saveLaboratorioImportar',
                type: 'POST',
                data: { Serie: serieTable, Nombre: nombreTable, Capacidad: capacidadTable, Descripcion: descTable },
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

//Funcion par alimpiar la tabla de importacion
function limpiarTabla() {
    $("#my_file_output > tbody ").empty();
}