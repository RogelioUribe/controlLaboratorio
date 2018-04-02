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