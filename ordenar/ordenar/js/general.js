/* Creado: 20170825 @marco_caloch
 * By CUAED
 * */
var eScorm = false; //estado; si la actividad es SCORM = true
var evaluacionesContestadas = 0; // numero de actividades activas -- se obtiene por funcion del num de indice del arreglo de recativos que no son 0
var totalLimite = 10; // limite de recursos en el arreglo.
var totalEvaluaciones = 2; // numero de evaluaciones (objetivos) en el scorm
var totalReactivosSCORM = []; // guarda el total de reactivos por indice de actividad
var calificacionSCORM = []; // guarda las calificaciones por indice de actividad

// A jq321( document ).ready() block.
jq321( document ).ready(function() {
    console.log( "ready!" );
//    //caja de dialogo general
//    uiDialogo = jq321("#dialog");
//    uiDialogo.dialog({
//        title:"Mensaje",
//        modal:true,
//        show:"slideDown",
//        hide:"slideUp",
//        autoOpen:false,
//        buttons: [
//            {
//                text: "Aceptar", icons: {primary: "ui-icon-check"},
//                click: function() {
//                    jq321(this).dialog( "close" );
//                }
//            }
//        ]
//    });
    //
    // iniciarEntorno(); //inicializa variables y eventos de la uapa

    // Asignación de las las funciones a cuando se va a cerrar la página. //
    //
    // if (eScorm) {
    //     window.onunload = enviarDatosSCORM;
    //     window.onbeforeunload = enviarDatosSCORM;

    // }//fin if

});

// if (eScorm) {
// 	window.addEventListener("load", function() {
// 		var conexion = conectividadSCORM.conectarYComenzar();
// 		console.log("declaracionObjetivos.js -> ", conexion);
// 		if (conectividadSCORM.crearObjetivos(totalEvaluaciones)) {//Aquí va el número de actividades
// 			conectividadSCORM.salvar();
// 			console.log("objetivos creados");
// 		}
// 	});
// }
//
// function iniciarEntorno() {
// 	//codigo SCORM 
// 	if (eScorm) {
// 		if (conectividadSCORM !== undefined) {
// 			if (window.document.readyState === "complete") {
// 				window.addEventListener("load", function() {
// 					iniciarSCORM();
// 				});
// 				console.log("ya había cargado");
// 			}
// 			else {
// 				console.log("agregó listener");
// 				window.addEventListener("load", function() {
// 					iniciarSCORM();
// 				});
// 			}
// 		}//
// 		iniciarArreglo(totalReactivosSCORM);// inicamos arreglo con valores en 0
// 		iniciarArreglo(calificacionSCORM);// inicamos arreglo con valores en 0
// 	}//fin eScorm
	
// }//fin iniciarEntorno


//funcion que inicializa los objetivos del scorm
// sin parametros
// function iniciarSCORM() {
// 	//iniciamos todos los objetivos del scorm
// 	for (var idObj = 1; idObj <= totalEvaluaciones; idObj++) {
// 		conectividadSCORM.iniciarObjetivo(idObj);
// 		conectividadSCORM.salvar();
// 	}//fin for
// 	console.log("Objetivos SCORM [iniciado]");
// }//fin iniciarSCORM


// function enviarDatosSCORM() {
// 	evaluacionesContestadas = numIndicesActivos(totalReactivosSCORM);//cuantas evaluaciones han sido calificadas
// 		console.log(calificacionSCORM);
// 		console.log("Total objetivos activos: " +evaluacionesContestadas);
// 	   // var intContadorBuenas = Math.round(totalDatos(calificacionSCORM)/evaluacionesContestadas); // calculamos calificacion general
// 	   // var intTotalReactivos = totalDatos(totalReactivosSCORM); // calculamos reactivos totales
// 	   // console.log(objetivoInicialScorm+" buenasT:"+intContadorBuenas+ " reactivosT:"+intTotalReactivos);
// 		if (conectividadSCORM !== undefined) {

// 			//salvamos los datos de todas las evaluaciones
// 			for (var idObj = 1; idObj <= totalEvaluaciones; idObj++) {
// 				conectividadSCORM.calificarObjetivo(idObj, calificacionSCORM[idObj], totalReactivosSCORM[idObj], 0);
// 				conectividadSCORM.finalizarObjetivo(idObj); //Mismo número que en el paso anterior
			   
// 				//console.log("DATOS ALAMCENADOS: " +intContadorBuenas+ " "+intTotalReactivos);
// 			}//fin for

// 			 //promediar datos totales del scorm
// 			 // salvamos los datos
// 			conectividadSCORM.salvar(); 
// 			console.log("Datos Salvados");
// 			 // si todas las evaluaciones han sido contestadasterminar el scorm
// 			if (evaluacionesContestadas >= totalEvaluaciones) {
// 				conectividadSCORM.terminar();
// 				console.log("Actividad terminada");
// 			}//fin if
// 		}//fin --   conectividad      
// }//fin enviarDatosSCORM

//Devuelve la suma de los datos almacenados en el arreglo
//arregloDatos = es el arreglo con datos
function totalDatos(arregloDatos) {
	var valor = 0;
	for (var ci = 0; ci < arregloDatos.length; ci++) {
		valor += arregloDatos[ci];
	}//fin for
	return valor;
}//fin 

//Inicializa los valores del arreglo en cero
//arregloDatos = es el arreglo a llenar
function iniciarArreglo(arregloDatos) {
	for (var ci = 0; ci < totalLimite; ci++) {
		arregloDatos[ci] = 0;
	}//fin for
}//fin 

//almacena en los arreglos temporales los datos de las evaluaciones antes de enviarlas a guardar
// indice = es el numero de objetivo en el scorm
// buenas = total de respuestas correctas
// total = nuemro de reactivos de la actividad
// function almacenarDatosSCORM(indice, buenas, total) {
// 	totalReactivosSCORM[indice]= total;
// 	calificacionSCORM[indice] = buenas;
// 	console.log(indice + " buenas:" + buenas + " total:" + total);
// }//

//Devuelve el numero de indices/Objetivos que tienen datos validos
//arregloDatos = es el arreglo que contiene los valores
function numIndicesActivos(arregloDatos) {
	var valor = 0;
	for (var ci = 0; ci <arregloDatos.length; ci++) {
		if (arregloDatos[ci] > 0) {
			valor++;
		}//fin if
	}//fin for
	return valor;
}

/***********************************************************************/
// A. 
/***********************************************************************/
//
function quitarAcentos(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to   = "aaaaeeeeiiiioooouuuunc------";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
	return str;
}//
