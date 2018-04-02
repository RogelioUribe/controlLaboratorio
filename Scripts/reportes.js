var rowsEstLab;

//Funcion para mostrar los reportes del usuario seleccionado
function MostrarReporte(item) {
    $('#Reporte').show();
    var usuario = $(item).parent().parent().children('td').eq(0).text();

    $.ajax({
        url: '/Home/getReporte',
        type: 'POST',
        data: { Usuario: usuario },
        datatype: 'JSON',
        success: function (data) {
            console.log(data);
            $('#tbReporte > tbody').empty();
            rowsEstLab = '';
            $.each(data, function (i, item) {
                rowsEstLab += '<tr id="trInfo' + (i + 1) + '"><td id="tdReporte' + i + '">' + data[i].Descripcion +                                
                                '</td><td id="tdFecha' + i + '">' + data[i].Fecha + '</td></tr>';
            });
            $('#tbReporte > tbody').append(rowsEstLab);
        },
        error: function (data) {
            alert(data);
        }
    })
}