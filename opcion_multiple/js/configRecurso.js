/* configuracion
*/
var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
//var siguienteIntentoBlanco = false; // REVISAR Ago 16,18, true: cuando se requiera que en un siguiente intento todo este en blanco quitando palomas y taches...
var maxIntentosReactivo = 2;
var calificacionGlobal = false;
var formatoColumnas = false;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
//var calificaPregunta = true;   // true: Todas las arrobas de una pregunta cuentan como una, false: Cada arroba cuenta como un punto
//var admitirErronea = true; // Para ciertos ejercicios de autoevaluacion se apaga esta bandera, asi solo admite respuestas correctas....
var elementosPorSegmento = 2; // elementos por segmento limita la visiblidad, la idea es que sea menor o igual a reactivosMostrar
var reactivosMostrar = 4;            // número de reactivos a mostrar
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
//var recursoTransformer = false; // autoajuste a portable..

var total = reactivosMostrar;
var mezclarPreguntas = false;         // true: mezcla preguntas; false NO mezcla preguntas, RAAR a partir de jun 12,18 mezcla todos los reactivos
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = true;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroArroba = false;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = false; // cuantos preguntas son?, no necesariamente cuantas son visibles...
var numeralAlfabetico = false; //si queremos letras en vez de números, true.
var ponerNumeralRespuesta = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var numeralRespuestaAlfabetico = true; //si queremos letras en vez de números, true.
var calificarEnTiempoReal = false; //si se quiere el despliegue de correcto/incorrecto al seleccionar...

var carruselContinuo = false; // si se quiere que los botonos previo y proximo no tengan pared TRUE, false para pared

var retroCal = [ // RAAR may 28, 18 la coma al inicio del renglon solo es un truco par inhibir una linea sin preocuparte por la coma q esta arriba....
	{LimInf: 0, LimSup:8, Mensaje: ["Revise nuevamente la unidad."]}
	,{LimInf: 9, LimSup: 12, Mensaje: ["Hay conceptos que necesita precisar."]}
	,{LimInf: 13, LimSup: 14, Mensaje: ["¡Muy bien!"]}
    ,{LimInf: 15, LimSup: 15, Mensaje: ["¡Excelente!"]} 
	];
 
var textoRetroGeneral= '';//'Texto independiente de calificacion'; no importando la calificación se puede poner un texto extra, '' para dejar en blanco

var ambSCORM = false; //prender para que guarde calificacion en moodle...
var barraSCORM = false; //para indicar si hay barra de avance en ambientes tipo APRENDO MAS. No interactua con la barra, es para que el recurso sepa donde almacenar datos...
var idObjetivo = 0; // RAAR Mar 21,18: traigo esto de completarArrastrando.js, no tiene sentido alla
var idioma = "ESP";
var debug = false;
if (debug) {
	document.write("-modo debug true-"); //para avisar en pantalla el modo...
}

var verLongitud = false;  //true:ver longitud del texto ; false:omitir

