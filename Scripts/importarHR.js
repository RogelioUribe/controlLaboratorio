var grupo, materia, profesor, laboratorio, he, hs, dia, alumnos, sizeTabla, lista = [];

//Funcion para registrar horarios de una talba de importacion
function validar() {
    var noFilas = document.getElementById("my_file_output").rows.length;
    var fecha = new Date();
    var mes = fecha.getMonth() + 1; //hoy es 0!
    var anio = fecha.getFullYear();

    var numeroPerido;
    if (mes >= 01 && mes <= 6) { numeroPerido = 1; }
    if (mes == 07) { numeroPerido = "Verano"; }
    if (mes >= 08 && mes <= 12) { numeroPerido = 2; }

    var periodo = anio + '-' + numeroPerido;

    $('#my_file_output > tbody > tr').each(function (i, item) {
        sizeTabla = i;
    })

    $('#my_file_output > tbody > tr').each(function (i, item) {
        profesor = $(item).children('td').eq(0).text(),
        grupo = $(item).children('td').eq(1).text(),
        alumnos = $(item).children('td').eq(2).text(),
        materia = $(item).children('td').eq(3).text(),
        laboratorio = $(item).children('td').eq(4).text(),
        he = $(item).children('td').eq(5).text(),
        hs = $(item).children('td').eq(6).text(),
        dia = $(item).children('td').eq(7).text();
        if (profesor !== "" && grupo !=="" && alumnos !== "" && materia !== "" && laboratorio !== "" && he !== "" && hs !== "" && dia !== "") {
            $.ajax({
                url: '/Home/saveHorarioImportar',
                type: 'POST',
                data: { Grupo: grupo, Alumnos:alumnos, Materia: materia, Profesor: profesor, Laboratorio: laboratorio, HEntrada: he, HSalida: hs, Dia: dia, Periodo: periodo },
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
            });
        }        
        })
        
    $('#my_file_output > tbody').empty();
    $('#my_file_input').val('');
}

//Funcion para limpiar la tabla de importacion
function limpiar() {
    $('#my_file_output > tbody').empty();
    $('#my_file_input').val('');
}