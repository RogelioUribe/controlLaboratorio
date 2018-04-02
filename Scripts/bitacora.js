//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtActividades').val('');
    $('#txtObservaciones').val('');
}

//Funcion para validar los campos
function validar() {
    if ($('#txtActividades').val().length < 1) {
        alert('El campo actividades es obligatorio');
    }
    else {
        saveBitacora();
        $('#txtActividades').val('');
        $('#txtObservaciones').val('');
    }
}

//funcion para registrar la bitacora
function saveBitacora() {
    var usuario = $('#txtUsuario').text();
    var actividades = $('#txtActividades').val();
    var observaciones = $('#txtObservaciones').val();
    var bitacora = "Actividades: " + actividades + ". Observaciones: " + observaciones;
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

    $.ajax({
        url: '/Home/saveBitacora',
        type: 'POST',
        data: { Usuario: usuario, Bitacora: bitacora, Fecha: hoy },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}