//Funcion para validar los campos
function validar() {

    var i = 0;

    if ($("#txtUsu").val().length < 1) {
        i++;
    }
    if ($("#txtPass").val().length < 1) {
        i++;
    }

    if (i == 2) {
        alert("Por favor llene todos los campos.");
        return false;
    }

    if ($("#txtUsu").val().length < 1) {
        alert("El campo Usuario es obligatorio.");
    }
    if ($("#txtPass").val().length < 1) {
        alert("El campo contraseña es obligatorio.");
    }    
    if (i == 0) {
        logearse();
        $('#txtUsu').val('');
        $('#txtPass').val('');        
    }    
}

//Funcion para logearse
function logearse() {
    usu = $('#txtUsu').val();
    pass = $('#txtPass').val();

    $.ajax({
        url: '/Home/getUsuario',
        type: 'POST',
        data: { usuario: usu, password: pass },
        datatype: 'JSON',
        success: function (data) {
            if (data == 'El usuario no existe.' || data == 'La contraseña es errona.') {
                alert(data);
            }
            else {
                alert(data);
                window.location = "/";
            }            
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtUsu').val('');
    $('#txtPass').val('');
}