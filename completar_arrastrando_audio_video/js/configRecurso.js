/* configuracion

*No leia el maxIntentos si estaba al inicio de este archivo...


pendiente....        bodyOriginal = document.body.innerHTML; y para reestablecer... document.body.innerHTML = bodyOriginal;
file:///G:/Mi%20unidad/DesarrolloMultimedia/FabiolaCorreccionesDeInglesI_programacion/list/index.html
y ojo    with(oDragItem.style){
        zIndex = 1000;
        position="absolute";
        left=x+"px";
        top=y+"px";
    }

*/
var carruselContinuo = false; // si se quiere que los botonos previo y proximo no tengan pared TRUE, false para pared

var maxIntentos = 2;                 // número de intentos máximo para resolver el ejercicio
var siguienteIntentoBlanco = false; // true: cuando se requiera que en un siguiente intento todo este en blanco quitando palomas y taches...

var maxIntentosReactivo = 2;
var calificacionGlobal = false;
var formatoColumnas = true;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
// EN DESUSO AHORA ES FUNCION AUTOMATICA var esTexto = true;                  // true: respuestas son TEXTO; false respuestas son IMAGENES
var invPregResp = false;             // true: invierte orden de preguntas y respuestas; false NO invierte orden de preguntas y respuestas
var calificaPregunta = false;   // true: Todas las arrobas de una pregunta cuentan como una, false: Cada arroba cuenta como un punto
var admitirErronea = true; // Para ciertos ejercicios de autoevaluacion se apaga esta bandera, asi solo admite respuestas correctas....

var elementosPorSegmento = 3; // elementos por segmento limita la visiblidad, la idea es que sea menor o igual a reactivosMostrar
var reactivosMostrar = 6;            // número de reactivos a mostrar
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var recursoTransformer = true; // autoajuste a portable..

var total = reactivosMostrar;
var numeral=true //pone un numeral a lado del video.
var mezclarPreguntas = false;         // true: mezcla preguntas; false NO mezcla preguntas, RAAR a partir de jun 12,18 mezcla todos los reactivos
var mezclarRespuestas = false;        // true: mezcla respuestas; false NO mezcla respuestas
var mostrarRetroIndividual = false;  // true: muestra retro por pregunta individual; false: NO muestra retro por pregunta individual
var mostrarRetroArroba = false;  // Por cada arroba, true: muestra; false: NO muestra
var mostrarRetroFinal = true;       // true: muestra retro por aciertos; false: NO muestra retro
//var porEspacios = true; //no se usa
//var porEnunciados = true; // nose usa
var ponerNumeral = true;     // Para poner o agregar numeros secuenciales al inicio de las las preguntas...
var ponerNumeroPreguntas = true // cuantos preguntas son?, no necesariamente cuantas son visibles...
var retroCal = [
	{LimInf: 0, LimSup: 5, Mensaje: ["Repasa nuevamente el tema...", "Insufficient"]}
	,{LimInf: 6, LimSup: 7.5, Mensaje: ["Ya casi lo tienes", "Work harder"]}
	,{LimInf: 7.6, LimSup: 10, Mensaje: ["¡¡¡Muy bien!!!", "Sufficient"]}
/*	,{LimInf: 10, LimSup: 10, Mensaje: ["Excelente", "Excellent"]}*/
    ];
    
    var debug=false;
    if (debug) {
        document.write("-modo debug true-"); //para avisar en pantalla el modo...
    }

var ambSCORM = false;
var barraSCORM = false;
var idioma = "ESP";

