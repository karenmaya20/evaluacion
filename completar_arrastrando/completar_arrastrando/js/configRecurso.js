﻿/* configuracion
*/
var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var siguienteIntentoBlanco = false; // REVISAR Ago 16,18, true: cuando se requiera que en un siguiente intento todo este en blanco quitando palomas y taches...
var maxIntentosReactivo = 2;
var calificacionGlobal = false;
var formatoColumnas = true;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
var calificaPregunta = true;   // true: Todas las arrobas de una pregunta cuentan como una, false: Cada arroba cuenta como un punto
var admitirErronea = true; // Para ciertos ejercicios de autoevaluacion se apaga esta bandera, asi solo admite respuestas correctas....
var elementosPorSegmento = 15; // elementos por segmento limita la visiblidad, la idea es que sea menor o igual a reactivosMostrar
var reactivosMostrar = 15;            // número de reactivos a mostrar
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}

var total = reactivosMostrar;
var mezclarPreguntas = false;         // true: mezcla preguntas; false NO mezcla preguntas, RAAR a partir de jun 12,18 mezcla todos los reactivos
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = calificaPregunta;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroArroba = !calificaPregunta;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = false // cuantos preguntas son?, no necesariamente cuantas son visibles...
var seleccionRapida = true; //true permite elegir respuesta dando doble click ademas de arrastrar, falso: solo funcciona arrastrable
var forzarRespuestaA = 0; //si se quiere que las respuestas solo se usen 'n' veces, si es cero se ignora...
var carruselContinuo = false; // si se quiere que los botonos previo y proximo no tengan pared TRUE, false para pared



var retroCal = [ // Esto es calificacion del 0 al 10, no puntaje
	{LimInf: 0, LimSup: 5, Mensaje: ["Es recomendable que revises nuevamente el tema", "Insufficient"]}
	,{LimInf: 6, LimSup: 9, Mensaje: ["Lo has hecho bien, es recomendable que revises algunos contenidos del tema", "Work harder"]}
	,{LimInf: 10, LimSup: 10, Mensaje: [" ¡Felicidades, has contestado correctamente!", "Sufficient"]}
/*	,{LimInf: 10, LimSup: 10, Mensaje: ["Excelente", "Excellent"]}*/
	];
 
var textoRetroGeneral= '';//'Texto independiente de calificacion'; no importando la calificación se puede poner un texto extra, '' para dejar en blanco

var ambSCORM = true; //prender para que guarde calificacion en moodle...
var barraSCORM = false; //para indicar si hay barra de avance en ambientes tipo APRENDO MAS. No interactua con la barra, es para que el recurso sepa donde almacenar datos...
var idObjetivo = 0; // Para dar secuencia a las evaluaciones dentro aprendo+, inicia en cero, si son 4 evaluaciones debe haber 0,1,2,3 recursos de evaluación respectivamente
var idioma = "ESP";
var debug=false; //Prender si se quieren preveer los resultados en pantalla, facilita la revisión y validación, a productivo SIEMPRE apagado
if (debug) {
	document.write("-modo debug true-"); //para avisar en pantalla el modo...
}

var verLongitud = false;  //true:ver longitud del texto ; false:omitir

