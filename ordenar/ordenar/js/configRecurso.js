/* Configuracion

*/

var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var maxIntentosReactivo = 2;
var calificacionGlobal = false;
var formatoColumnas = true;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var esTexto = true;                  // true: respuestas son TEXTO; false respuestas son IMAGENES
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas

var reactivosMostrar = 10;            // número de reactivos a mostrar
var carruselContinuo = false; // si se quiere que los botonos previo y proximo no tengan pared TRUE, false para pared

var elementosPorSegmento = 10;        // numero de elementos a mostrar por pagina en desktop
var elementosPorSegmentoMovil = 1;    // numero de elementos a mostrar por pagina en vista movil, sugerido 1
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var intentos = 0;
var correctas = 0;
var contestadas = 0;
var totalPreguntas = 0;
var mezclarPreguntas = true;         // true: mezcla preguntas; false NO mezcla preguntas
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = true;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
/*var porEspacios = true; NO SE USA
var porEnunciados = true;*/

var numeralAlfabetico = false; //si queremos letras en vez de números, true.
var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = false; // cuantos preguntas son?, no necesariamente cuantas son visibles...

var retroCal = [
	{LimInf: 0, LimSup: 3, Mensaje: ["No fue suficiente", "Insufficient"]},
	{LimInf: 4, LimSup: 6, Mensaje: ["Esfuérzate más", "Work harder"]},
	{LimInf: 7, LimSup: 9, Mensaje: ["Suficiente", "Sufficient"]},
	{LimInf: 10, LimSup: 10, Mensaje: ["Excelente", "Excellent"]},
	];
/* Por eliminar
var retroCal1 = [
	{LimInf: 0, LimSup: 3, Mensaje: "No fue suficiente"},	
	{LimInf: 4, LimSup: 6, Mensaje: "Esfuérzate más"},	
	{LimInf: 7, LimSup: 9, Mensaje: "Suficiente"},	
	{LimInf: 10, LimSup: 10, Mensaje: "Excelente"},	
	];*/

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var idioma = "ESP";
var debug = false;
