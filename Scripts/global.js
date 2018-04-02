//Funcion para que el campo solo reciba numeros
function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if (keynum == 8)
        return true;

    return /\d/.test(String.fromCharCode(keynum));
}

//Funcion para que el campo solo reciba letras
function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";//Se define todo el abecedario que se quiere que se muestre.
    especiales = [8, 37, 39, 46, 6]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        alert('Tecla no aceptada');
        return false;
    }
}

//Funcion para deslogearse
function logout() {
    var usuario = $('#txtUsuario').text();
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
        url: '/Home/Logout',
        type: 'POST',
        data: { Usuario: usuario, Fecha: hoy },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
            window.location = "/";
        },
        error: function (data) {
            alert(data);
        }
    })
}