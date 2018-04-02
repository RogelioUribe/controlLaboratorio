//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtAno').val('');
    $('#txtSem').val('');
}

//Funcion para validar los campos
function validar() {
    var i = 0;

    if ($('#txtAno').val().length < 1) {
        i++;
    }
    if ($('#txtSem').val().length < 1) {
        i++;
    }

    if (i == 2) {
        alert('Por favor llene todos los campos.');
        return false;
    }


    if ($('#txtAno').val().length < 1) {
        alert("El campo año es obligatorio");
    }
    if ($('#txtSem').val().length < 1) {
        alert("El campo semestre es obligatorio");
    }

    if (i > 0) {
        return false;
    }
    else {
        savePer();        
        $('#txtAno').val('');
        $('#txtSem').val('');
        return false;
    }
}

//Función de busqueda dinámica para periodos
function filtrarPer(e) {
    var trId;
    var trNombre;
    var itemValue = $(e).val();
    $('#tbPer tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbPer tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trNombre = $(tr).children('td').eq(0).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp)) {
                $('#' + trId).show();
            }
        });
    }
}

//Función para mostrar los periodos en el modal
function limpiarModalPer() {
    $('#SearchLab').val('');

    var rowsPer = '';
    $.ajax({
        url: '/Home/loadPeriodo',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbPer > tbody').empty();
            $.each(data, function (i, item) {
                rowsPer += '<tr id="trInfo' + (i + 1) + '"><td id="tdNombre' + i + '">' + data[i].Nombre + '</td></tr>';
            });
            $('#tbPer > tbody').append(rowsPer);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para registrar periodo
function savePer() {
    var ano = $('#txtAno').val();
    var sem = $('#txtSem').val();
    var fecha = new Date();
    var anoActual = fecha.getFullYear();
    $.ajax({
        url: '/Home/savePeriodo',
        type: 'POST',
        data: { Ano: ano, Semestre: sem, AnoActual: anoActual },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}