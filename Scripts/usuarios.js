var rowsUsu;

//Funcion para limpiar las cajas de texto
function limpiar() {
    $('#txtNombre').val('');
    $('#txtApPaterno').val('');
    $('#txtApMaterno').val('');
    $('#txtNick').val('');
    $('#txtPassword').val('');
    $('#txtCorreo').val('');
    $('#txtPerfil').val('');
    $('#txtNoControl').val('');
    $('#txtCarrera').val('');
}

//Funcion para validar los campos
function validar() {
    var i = 0;
    var perfil = $('#txtPerfil').val();

    if (perfil == 'Servicio Social') {
        if ($('#txtNombre').val().length < 1) {
            i++;
        }
        if ($('#txtApPaterno').val().length < 1) {
            i++;
        }
        if ($('#txtApMaterno').val().length < 1) {
            i++;
        }       
        if ($('#txtPassword').val().length < 1) {
            i++;
        }
        if ($('#txtCorreo').val().length < 1) {
            i++;
        }
        if ($('#txtPerfil').val().length < 1) {
            i++;
        }
        if ($('#txtNoControl').val().length < 1) {
            i++;
        }        

        if (i == 7) {
            alert('Por favor llene todos los campos.');
            return false;
        }

        if ($('#txtNombre').val().length < 1) {
            alert('El campo nombre es obligatorio.');
        }
        if ($('#txtApPaterno').val().length < 1) {
            alert('El campo apellido paterno es obligatorio.');
        }
        if ($('#txtApMaterno').val().length < 1) {
            alert('El campo apellido materno es obligatorio.');
        }        
        if ($('#txtPassword').val().length < 1) {
            alert('El campo contraseña es obligatorio.');
        }
        if ($('#txtCorreo').val().length < 1) {
            alert('El campo correo es obligatorio.');
        }
        if ($('#txtPerfil').val().length < 1) {
            alert('El campo perfil es obligatorio.');
        }
        if ($('#txtNoControl').val().length < 1) {
            alert('El numero de control es obligatorio.');
        }        

        if (i == 0) {
            saveUsuario();
            $('#txtNombre').val('');
            $('#txtApPaterno').val('');
            $('#txtApMaterno').val('');            
            $('#txtPassword').val('');
            $('#txtCorreo').val('');
            $('#txtPerfil').val('');
            $('#txtNoControl').val('');            
            return false;
        }        
    }

    else {
        if ($('#txtNombre').val().length < 1) {
            i++;
        }
        if ($('#txtApPaterno').val().length < 1) {
            i++;
        }
        if ($('#txtApMaterno').val().length < 1) {
            i++;
        }       
        if ($('#txtPassword').val().length < 1) {
            i++;
        }
        if ($('#txtCorreo').val().length < 1) {
            i++;
        }
        if ($('#txtPerfil').val().length < 1) {
            i++;
        }       

        if (i == 6) {
            alert('Por favor llene todos los campos.');
            return false;
        }

        if ($('#txtNombre').val().length < 1) {
            alert('El campo nombre es obligatorio.');
        }
        if ($('#txtApPaterno').val().length < 1) {
            alert('El campo apellido paterno es obligatorio.');
        }
        if ($('#txtApMaterno').val().length < 1) {
            alert('El campo apellido materno es obligatorio.');
        }        
        if ($('#txtPassword').val().length < 1) {
            alert('El campo contraseña es obligatorio.');
        }
        if ($('#txtCorreo').val().length < 1) {
            alert('El campo correo es obligatorio.');
        }
        if ($('#txtPerfil').val().length < 1) {
            alert('El campo perfil es obligatorio.');
        }       

        if (i == 0) {            
            saveUsuario();
            $('#txtNombre').val('');
            $('#txtApPaterno').val('');
            $('#txtApMaterno').val('');
            $('#txtPassword').val('');
            $('#txtCorreo').val('');
            $('#txtPerfil').val('');
            return false;
        }        
    }
    
}

//Funcion para mostrar campos dependiendo del perfil
function mostrarSS() {    
    var perfil = $('#txtPerfil').val();
    if (perfil == 'Servicio Social') {
        $('#lblNoControl').show();
        $('#txtNoControl').show();        
    }
    else {
        $('#txtNoControl').val('');        
        $('#lblNoControl').hide();
        $('#txtNoControl').hide();        
    }    
}

//Funcion de busqueda para los usuarios
function filtrarUsu(e) {
    var trId;
    var trNombre, trPerfil, trNoControl;
    var itemValue = $(e).val();
    $('#tbUsu tbody tr').each(function (i, tr) {
        trId = $(tr).attr('id');
        if (itemValue != '') {
            $('#' + trId).hide();
        }
        else {
            $('#' + trId).show();
        }
    });

    if (itemValue != '') {
        $('#tbUsu tbody tr').each(function (i, tr) {
            trId = $(tr).attr('id');
            trNombre = $(tr).children('td').eq(1).text();
            trPerfil = $(tr).children('td').eq(3).text();
            trNoControl = $(tr).children('td').eq(4).text();
            var regexp = new RegExp(itemValue, 'i');
            if (trNombre.match(regexp) || trPerfil.match(regexp) || trNoControl.match(regexp)) {
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

//Función para mostrar los usuarios en el modal
function limpiarModalUsuario() {
    $('#SearchUsu').val('');

    var rowsUsu = '';
    $.ajax({
        url: '/Home/loadUsuarios',
        type: 'POST',
        data: {},
        datatype: 'JSON',
        success: function (data) {
            $('#tbUsu > tbody').empty();
            debugger;
            $.each(data, function (i, item) {
                rowsUsu += '<tr id="trInfo' + (i + 1) + '"><td style="display:none" id="tdId' + i + '">' + data[i].UsuId +
                                '</td><td id="tdNombre' + i + '">' + data[i].NombreCompleto +
                                '</td><td id="tdCorreo' + i + '">' + data[i].UsuCorreo +
                                '</td><td id="tdPerfil' + i + '">' + data[i].UsuPerfil +
                                '</td><td id="tdNoControl' + i + '">' + data[i].NoControl +
                                '</td><td id="tdPass' + i + '">' + data[i].UsuPass + 
                                '</td><td id="tdDelete' + i + '"><i class="fa fa-trash-o" aria-hidden="true" onclick="deleteUsu(this)"></i></td></tr>';
            });
            $('#tbUsu > tbody').append(rowsUsu);
        },
        error: function (data) {
            alert('doesnt work');
        }
    })
}

//Funcion para eliminar los usuarios
function deleteUsu(item) {
    var serie = $(item).parent().parent().children('td').eq(0).text();
    $.ajax({
        url: '/Home/eliminarUsu',
        type: 'POST',
        data: { Id: serie },
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}

//Funcion para registrar el usuario
function saveUsuario() {
    var nombre = $('#txtNombre').val();
    var ap = $('#txtApPaterno').val();
    var am = $('#txtApMaterno').val();
    var pass = $('#txtPassword').val();
    var correo = $('#txtCorreo').val();
    var perfil = $('#txtPerfil').val();
    var noControl = $('#txtNoControl').val();

    $.ajax({
        url: '/Home/saveUsuario',
        type: 'POST',
        data: { Nombre: nombre, Paterno: ap, Materno: am, Pass: pass, Correo: correo, Perfil: perfil, NControl: noControl },        
        datatype: 'JSON',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert(data);
        }
    })
}