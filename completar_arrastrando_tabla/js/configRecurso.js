var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var maxIntentosReactivo = 2;
var calificacionGlobal = false;
var formatoColumnas = false;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
//var esTexto = true;   RAAR, May 16,18; elimino su uso con <object> en lugar de img               // true: respuestas son TEXTO; false respuestas son IMAGENES 
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
var seleccionRapida = true; //true permite elegir respuesta dando doble click ademas de arrastrar, falso: solo funcciona arrastrable

var reactivosMostrar =11;            // número de reactivos a mostrar, considere el encabezado...
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;


var mezclarPreguntas = false;         // true: mezcla preguntas; false NO mezcla preguntas
var mezclarRespuestas = true;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = false;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroArroba = false;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
var porEspacios = true;
var porEnunciados = true;
var ponerNumeral = false;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var recursoTransformer = true; // autoajuste a portable..
var debug=false;
if (debug) {
	document.write("-modo debug true-"); //para avisar en pantalla el modo...
}
var retroCal = [
	{LimInf: 0, LimSup: 3, Mensaje: ["Entiendes algunas de las diferencias entre equipo y grupo, pero es necesario que vuelvas a revisar la información que hemos visto durante esta unidad. Ten en cuenta que un grupo se forma cuando dos o más personas interactúan entre sí, manteniendo intereses en común, mientras que los equipos tienen características que permiten a los individuos interactuar dentro de las organizaciones.", "Insufficient"]},
	{LimInf: 4, LimSup: 6, Mensaje: ["Entiendes algunas de las diferencias entre equipo y grupo, pero es necesario que vuelvas a revisar la información que hemos visto durante esta unidad. Ten en cuenta que un grupo se forma cuando dos o más personas interactúan entre sí, manteniendo intereses en común, mientras que los equipos tienen características que permiten a los individuos interactuar dentro de las organizaciones.", "Work harder"]},
	{LimInf: 7, LimSup: 10, Mensaje: ["¡Felicidades! Has puesto gran atención a los temas que hemos revisado en esta unidad y eres capaz de distinguir los elementos que caracterizan a un grupo y aquellos que caracterizan a un equipo. No olvides que la importancia de los equipos de trabajo reside en que son grupos de personas con habilidades complementarias comprometidas con una misión y metas de desempeño.", "Sufficient"]},
//	{LimInf: 10, LimSup: 10, Mensaje: ["Excelente", "Excellent"]},
	];

var retroCal1 = [
	{LimInf: 0, LimSup: 3, Mensaje: "No fue suficiente"},	
	{LimInf: 4, LimSup: 6, Mensaje: "Esfuérzate más"},	
	{LimInf: 7, LimSup: 9, Mensaje: "Suficiente"},	
	{LimInf: 10, LimSup: 10, Mensaje: "Excelente"},	
	];

var ambSCORM = false;
var barraSCORM = false;

var idioma = "ESP";

// Estas son variables no parametros de configuración, no deben estar aqui....
var intentos = 0;
var correctas = 0;
var contestadas = 0;
var totalPreguntas = 0;