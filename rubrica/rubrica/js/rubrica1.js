/**
 * CUAED-UNAM
 * Update: 2017-0821 @marco_caloch
 * 
 */


jq341(function () {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var eScormActividad = false; // true si se toma en cuenta como objetivo del scorm, false si no
    var retroIndividual = false; //true : muestra la retro individual por reactivo// false no muestra nada
    var mostrarRetroFinal = true; //true : muestra la retro final // false no muestra nada
    var intentos = 2; // 0 = ilimitados
    var indiceActividad = 2; //
    var idActividad = "#rubrica"; //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var actividadOriginal = $(idActividad+"").html();
    var total = 0;
    //var buenas = 0;
    var intentosRealizados = 0;
    var puntaje = 0;
    iniciar();

    function iniciar(){
        var lstSetsPreguntas = $(idActividad+" .set .pregunta");
        var lstSetsRespuestas = $(idActividad+" .set .respuestas");
        total = lstSetsPreguntas.length;
        console.log("Total inicio:"+total);
        $(idActividad+" .retro").hide();
        lstSetsRespuestas.each(function(idx, elm){

            $(elm).find("button").click(function(evt){
                var elmPadre = $(evt.currentTarget).parent();//Obtiene el nodo padre
                var abuelo = elmPadre.parent();
                var bisabuelo = abuelo.parent(); // nivel 3
                 $(elm).find("button").removeClass('clickme');
                console.log("Valor de la opción:"+$(this).val());
                //abuelo.find("button").removeClass("btn-default").addClass("btn-disabled").prop('disabled', true);//Desactiva todos los botones del set (abuelo)
                //elmPadre.addClass("contestado");//Marca la opción como contestada (no el set)
                $(this).addClass('clickme');

                abuelo.addClass("contestado");//Marca el set como contestado   
                if(retroIndividual == true){
                    console.log("mostrar retro individual");
                    elmPadre.find(".retro").show();
                }//fin if retro
                
            });
        });

        $(idActividad+" button#btnRuReiniciar").hide();
    //Espacio entre elementos de respuestas cajasTexto
        var nColumnas = $(idActividad+" .encabezado .rango").length;
        var porcentajeWidth = parseInt(90 / nColumnas);
        console.log("autoajuste "+ porcentajeWidth+"%");

        $(idActividad+" .set .encabezado .rango").css("width",porcentajeWidth+"%");

        $(idActividad+" .set .respuestas .cajaTexto").css("width",porcentajeWidth+"%");
        $("#modalRetro").hide(); // oculta espacio de retroalimentacion final
        //setEncabezadoOpcion();
    }//fin init


    //calcula la suma de la selección en las respuestas
    //sin parametros
    //retorna:  sumatoria de valores
    function calcularPonderacion(){
        var resultado = 0;
        var lstSetsRespuestas = $(idActividad+' .set button[class="clickme"]');
        lstSetsRespuestas.each(function(idx, elm){
            resultado += parseFloat($(elm).val());
        });
        //console.log("res:"+resultado);
        return resultado;
    }//fin calcularPonderacion

    $(idActividad+" button#btnRuRevisar").button().click(function(event) {
            var contestadas = $(idActividad+" .set .contestado").length;//
            puntaje = 0;
            console.log("Contestadas: "+contestadas);
        //Si ya ha terminado de contestar todas las preguntas
                if((total == contestadas) && contestadas > 0){
                    puntaje = calcularPonderacion();// es la suma de la valoracion en las preguntas

                    retroalimentar("Mensaje","Obtuviste " + puntaje + " puntos.");

                    //mostrar retroalimentacion final en texto
                    if(mostrarRetroFinal){
                        console.log("***");
                        retroFinalEvaluacion(puntaje);
                    }//

                    intentosRealizados++; //aumentamos el numero de intentos hechos
                     //deshabilitamos botonos si sobrepaso el limite de intentos
                    if( (intentos > 0) && ( intentosRealizados >= intentos) ){
                        $(idActividad+" button#btnRuReiniciar").hide();
                        $(idActividad+" button#btnRuRevisar").hide();
                    }//fin if
                    else{
                        $(idActividad+" button#btnRuReiniciar").show();
                        $(idActividad+" button#btnRuRevisar").hide();
                    }
                    console.log(" intentos:"+intentosRealizados+" de " + intentos  );

                    //save eScormActividad
                    if(eScormActividad){
                        almacenarDatosSCORM(indiceActividad, puntaje, total);//
                        enviarDatosSCORM();//
                    }//fin eScormActividad 

                }else{//Sino ha contestao el usuario que debe terminar
            retroalimentar("Alerta","Por favor, contesta todas las opciones.");
        }

    });

    //Reiniciar todas las propiedades y atributos
    $(idActividad+" button#btnRuReiniciar").button().click(function(){
       if( (intentos > 0) && (intentosRealizados <= intentos) ){
            $(idActividad+" .set").removeClass("contestado");
            $(idActividad+" .set div").removeClass("contestado");
            $(idActividad+" .set div button").removeClass("clickme");
            $(idActividad+" .retro").hide();
            $(idActividad+" .retroalimentacionFinal .retroRango").removeClass('verRetro').addClass('ocultarRetro');

            total = 0;
            puntaje = 0;
            $(idActividad+" button#btnRuRevisar").show();
            $(idActividad+" button#btnRuReiniciar").hide();
        iniciar();
       }//fin if
        else{
            retroalimentar("Alerta","Ha superado el número de intentos ."+intentosRealizados+"::"+intentos);
        }
    });

    //muestra la retro final
    function retroFinalEvaluacion(calificacion){
        var listaRetrosFinales = $(idActividad+" .retroalimentacionFinal .retroRango");
            console.log("----");
            listaRetrosFinales.each(function(i, element){
                console.log(calificacion + " "+ parseFloat($(element).attr("data-inicial")) + " "+parseFloat($(element).attr("data-final")) );
            if(calificacion >= parseFloat($(element).attr("data-inicial"))  && calificacion <= parseFloat($(element).attr("data-final"))  ){
                //return i; // si coindice regresa el texto
                //$(element).removeClass('ocultarRetro').addClass('verRetro');
                $("#modalRetro").show();
                $("#modalRetro").html($(element).text());
            }//fin if  
        });

    }

    /// Coloca valor de encabezados en labels //css 480 px
    /// 
    function setEncabezadoOpcion(){
        var lstSetsPreguntas = $(idActividad+" .encabezado .rango");
        var listaValorRespuestas = [];
        var listaRespuestas = $(idActividad+" .set .respuestas");

        lstSetsPreguntas.each(function(idx, elm){
            console.log("$"+idx +" "+ $(elm).html());
            listaValorRespuestas[idx] =$(elm).text();
        });

        //console.log(listaValorRespuestas);
        

        listaRespuestas.each(function(idr, caja){
            //console.log("+++++++++++++++");
            $(caja).find('input[type="radio"]').each(function(ide, elm){
                //console.log(ide+" radios "+listaValorRespuestas[ide]);
                var labelPadre = $(elm).parent();
                labelPadre.attr('data-valor', listaValorRespuestas[ide]);
            });

        });
    }
});