/* configuracion
*/

/*SECCION CASILLAS DROP Buscar esta sección en estilos.css aprox linea 98, ahi se define la posición
de cada casilla receptora. Se usan posiciones y tamaños PORCENTULES % para responsividad.
*/
var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var siguienteIntentoBlanco = false; // REVISAR Ago 16,18, true: cuando se requiera que en un siguiente intento todo este en blanco quitando palomas y taches...

var maxIntentosReactivo = 2;
var calificacionGlobal = false;

// Para rotar las respuestas INICIO
var formatoColumnas = false;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apilados
var invPregResp = true;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
// Para rotar las respuestas FIN

// EN DESUSO AHORA ES FUNCION AUTOMATICA var esTexto = true;                  // true: respuestas son TEXTO; false respuestas son IMAGENES
var calificaPregunta = false;   // true: Todas las arrobas de una pregunta cuentan como una, false: Cada arroba cuenta como un punto
var admitirErronea = true; // Para ciertos ejercicios de autoevaluacion se apaga esta bandera, asi solo admite respuestas correctas....

var elementosPorSegmento =1; // elementos por segmento limita la visiblidad, la idea es que sea menor o igual a reactivosMostrar
var reactivosMostrar = 1;            // número de reactivos a mostrar
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}

var total = reactivosMostrar;
var recursoTransformer = true; // autoajuste a portable..
var debug=false;
if (debug) {
	document.write("-modo debug true-"); //para avisar en pantalla el modo...
}
var mezclarPreguntas = false;         // true: mezcla preguntas; false NO mezcla preguntas, RAAR a partir de jun 12,18 mezcla todos los reactivos
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = false;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroArroba = true;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
//var porEspacios = true; //no se usa
//var porEnunciados = true; // nose usa
var ponerNumeral = false;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = false // cuantos preguntas son?, no necesariamente cuantas son visibles...
var seleccionRapida = true; //true permite elegir respuesta dando doble click ademas de arrastrar, falso: solo funcciona arrastrable

var retroCal = [ // Esto es calificacion del 0 al 10, no puntaje
	{LimInf: 0, LimSup: 5, Mensaje: ["Repasa nuevamente el tema...", "Insufficient"]}
	,{LimInf: 6, LimSup: 7.5, Mensaje: ["Ya casi lo tienes", "Work harder"]}
	,{LimInf: 7.6, LimSup: 10, Mensaje: ["¡¡¡Muy bien!!!", "Sufficient"]}
/*	,{LimInf: 10, LimSup: 10, Mensaje: ["Excelente", "Excellent"]}*/
	];
//RAAR: no importando la calificación se puede poner un texto extra, '' para dejar en blanco
var textoRetroGeneral = '';//'Texto independiente de calificacion';

var ambSCORM = false;
var barraSCORM = false;
var idioma = "ING";

