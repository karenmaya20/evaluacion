/* Configuracion

*/
 
var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var maxIntentosReactivo = 2;
var calificacionGlobal = false;
var formatoColumnas = true;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var esTexto = true;                  // true: respuestas son TEXTO; false respuestas son IMAGENES
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas (default)

var reactivosMostrar = 30;            // número de reactivos a mostrar
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
var porEspacios = true;
var porEnunciados = true;

var retroCal = [
	// {LimInf: 0, LimSup: 3, Mensaje: ["Debes mejorar", "Insufficient"]},
	// {LimInf: 4, LimSup: 6, Mensaje: ["Es importante releer nuestra unidad de aprendizaje. Recuerda realizarlo de manera continua y buscando palabras clave en cada lectura.", "Insufficient"]},
	// {LimInf: 7, LimSup: 9, Mensaje: ["Muy bien; queda mucho conocimiento que explorar; en estos intentos alcanzaste el objetivo planteado.", "Sufficient"]},
	// {LimInf: 10, LimSup: 10, Mensaje: ["Excelente", "Excellent"]},
	];

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0; // Para scorm...

var rubricaMultiple = false;    //  true: funciona como checkBox; false: funciona como radioButton

var idioma = "ESP";
