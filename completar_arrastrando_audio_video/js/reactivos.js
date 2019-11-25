// JavaScript Document
var preguntas = [];
var respuestas = [];
var conteo=0;
var casillasRespuesta;
var retro = [];
var indices = [];
var preg = [];
var numeralpro=1;
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var incremento;
// RAAR Estas las migre de configRecurso.js
var intentos = 0;
var correctas = 0;
//var contestadas = 0;
var totalPreguntas = 0;
var totalSegmentos = 0;
var recorreSegmentos =1; // por lo menos existe el primer segmento o sea el unico


var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip  far fa-check-circle blink' style='display:none'></i>";
var tache = "<i class='it  far fa-times-circle blink' style='display:none'></i>";
var video;
var seekslider;
//funciones para inicializar la linea seek, de cada video 

//ESTA FUNCION CONTROLA EL SEEKER DEL REPRODUCTOR EN RESPUESTAS 
function intializePlayer(ind){
	console.log("holiporoli");
	video= document.getElementById("resp"+ind);
	seekslider= document.getElementById("seekslider"+ind);
	 seekslider.addEventListener("change",vidSeek, false);
 video.addEventListener("timeupdate",seektimeupdate,false);
}
//ESTA FUNCION CONTROLA EL SEEKER DEL REPRODUCTOR EN PREGUNTAS 
function intializePlayer1(ind){
	console.log("holiporoli");
	video= document.getElementById("cloncas"+ind);
	seekslider= document.getElementById("seekslidercas"+ind);
	 seekslider.addEventListener("change",vidSeek, false);
 video.addEventListener("timeupdate",seektimeupdate,false);
}

//inicia la linea seek en su punto inicial
function estandarizar(){
var todostotal=document.getElementsByClassName("rangos");

for(var i=0; i<todostotal.length;i++){
	todostotal[i].value=0;
}

}
//FUNCIONES PARA QUE EL SEEKER TENGA RANGO 
function vidSeek(){
	console.log("siguiele");
var seekto= video.duration*(seekslider.value/100);
	video.currentTime=seekto;
}

function seektimeupdate(){
	var nt=video.currentTime*(100/video.duration);
	seekslider.value=nt;
}

jq321(document).ready(function() {
	if (window.name=="movil") {
		esMobil = true;
		// alert ("indexbis.html window.name: "+window.name);
	}
	else {
		esMobil = esPortable();		
	}
	console.log("ready(), es un aparato mobil? "+esMobil);

	console.log("ready(), modo debug? "+debug);

	if (esMobil && recursoTransformer) {
	
		elementosPorSegmento =2;
		//var texto = jq321("#textoInstrucciones").html();
	jq321("#textoInstrucciones").addClass("estilosinstruccion");
	jq321(".info").removeClass("ocultar").addClass("mostrar");
	 jq321("#textoInstrucciones").slideUp(10);
	 jq321("#textoInstrucciones").addClass("mostrarinfo");

 
	}


	if (mezclarPreguntas) {	reactivos.sort(function(a, b){return 0.5 - Math.random()}); }
	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
/*			if (mezclarPreguntas) {reordenaArreglo(preguntas)}; // POR QUE? RAAR MAY 28, agregue MezclarReactivos de mas, cambio este a if (mezclarReactivos) y ya quedaria...*/
	if (mezclarRespuestas) {reordenaArreglo(respuestas)};
	iniciar();
	estandarizar();

	jq321(".info").click(function(){
		console.log("hola");
			if(jq321(this).hasClass("hiden"))
			   {				 jq321("#textoInstrucciones").slideUp(300);
				   jq321(this).removeClass("hiden");
			   }
			else
			{
				
				jq321("#textoInstrucciones").slideDown(300); 
				jq321(this).addClass("hiden");
			}
		
		});

	});



function escribeArreglo(arreglo) {
	for (i = 0; i < arreglo.length; i++) {
		for (var prop in arreglo[i]) {
			if (arreglo[i].hasOwnProperty(prop)) {
				document.writeln('<p style="text-align: left">' + prop + ' || ' + arreglo[i][prop] + '</p>');
			}
		}
	}
	document.writeln('<hr>');
}

// solo voltea los strings, los voy eliminado a partir de abril 3, 2018, RAAR
function ic(c) {
	var x = c.length;
	var ci = "";
	while (x >= 0) {
		ci+=c.charAt(x);
		x--;
	}
	return ci;
}

function creaIndice() {
	var i = 0;
	for (i = 0; i < reactivos.length; i++) {
		indices.push(i)
	}
	reordenaArreglo(indices);
}

function divideReactivosQF_A(numReactivos) {  //  RA-01, RA-03,   QF-A
	var listaRespuestas =[]; // Para generar un listado de respuestas sin repetidos
	var listaTodas = [];
	var tantos = 0;
	for (i = 0; i < numReactivos; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
	//	preguntas.push({txt1: "", txt2: "", ind: 0, respA:"", respB:"", listaResp:""});
	preguntas.push({txt1: "", txt2: "", ind: 0, listaResp:"", listaFA:""});	
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		preguntas[i].listaResp = reactivos[i].A;
		preguntas[i].listaFA = reactivos[i].FA;		
	}
	
	var enlaza="";
	for (i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join();
	   if (i<numReactivos-1) { enlaza += ","; }
	}	
	enlaza = enlaza.replace(/[|]/gi, ","); // Cambios los pipes por comas, por que en las casillas de respuesta no importa...encierro en [] para que lo tome como caracter...
	listaTodas = enlaza.split(",");
	for (i = 0; i < listaTodas.length; i++) { 
		//if (!listaRespuestas.includes (listaTodas[i])) { //includes no jala en IE
		if (listaRespuestas.indexOf (listaTodas[i])==-1) {  //si no esta incluyelo...
		   listaRespuestas.push(listaTodas[i]);
		}
	}
/*	 //deshablito por que simplifico al agregar pipes en las  respuestas
for (i = 0; i < numReactivos; i++) { // genero la lista de respuetas recorriendo la matriz y pondiendola en una lista continua sin duplicados
		for (var j = 0; j < reactivos[i].A.length; j++) {
			if (!listaRespuestas.includes (reactivos[i].A[j])) { 
			   listaRespuestas.push(reactivos[i].A[j]);
			}
			listaTodas.push(reactivos[i].A[j]);
		}
	}*/
	listaRespuestas.sort();
	listaTodas.sort();
	for (i=0; i<listaRespuestas.length;i++){ // translado a la variable global respuestas....
		tantos = cuentaElemento(listaTodas,listaRespuestas[i]); // en listaTodas leo cuantas incidencias tiene una respuesta....
		respuestas.push({txt: listaRespuestas[i], ind:0, incidencia:tantos});
		//console.log ("RESPUESTAS "+respuestas[i].txt,"incidencia "+respuestas[i].incidencia);
	}
    casillasRespuesta = listaTodas.length;
	//console.log (listaRespuestas instanceof Array); // respuestas es un array, por que instancesof da true por que respuestas fue creado por el constructor array
}

function cuentaElemento (arregloBusqueda, palabraBuscada){ // cuenta cuantas veces aparece una palabra en un arreglo
	var j=0;
	var cuentaIncidencia = 0;
	//console.log("cuenta elementos");
	//alert (palabraBuscada);
	for (j=0; j<arregloBusqueda.length; j++){
		if (arregloBusqueda[j]==palabraBuscada) {
			cuentaIncidencia++
		}
	}
	return cuentaIncidencia;
}

function reordenaArreglo(arreglo) {
    arreglo.sort(function(a, b){return 0.5 - Math.random()}); // es un funcion de comparacion, math. produce valores -1 a 1, y provoca azar...
}

function creaEscribir(reactivosMostrar){
	for (i = 0; i < reactivosMostrar; i++) {
		var preg = reactivos[i].Q.split("@");
		var texto = "";
		for (j = 0; j < reactivos[i].A.length; j++) {
			texto += preg[j] + '<input type="text" data-respuesta="' + reactivos[i].A[j] + '" id="caja_' + (i + 1) + "." + (j + 1) + '">';
		}
		texto += preg[j];
		jq321("#completable").append('<hr><div id="p' + i + '"><p>' + texto + tam(reactivos[i].Q, 0));
		jq321("#p" + i).append('<span class="retroBien ocultarRetro">' + tam(reactivos[i].F[0], 1) + '</span><span class="retroMal ocultarRetro">' + tam(reactivos[i].F[1], 1) + '</span>');
	}
}

function creaArrastrar() { // Se arman las textos con sus correspondientes cajas...
	var idCas = 0; //para cololar un ID unica a cada casilla droppable....
	var textoRetro = '';
	jq321(".reactivos .lista-preguntas").each(function() { jq321(this).html(''); });
	jq321(".respuestas .lista-respuestas").each(function() { jq321(this).html(''); });
	//alert ("crea arrastrar");
	if (invPregResp) {jq321(".respuestas").prependTo(".ejercicio-arrastrar")}
	if (formatoColumnas) {
		jq321("#reactivo").addClass("col-md-9 col-lg-9");
		jq321("#respuesta").addClass("col-md-3 col-lg-3");
	/*	if (!(esTexto)) {
			jq321("#reactivo").addClass("col-sm-9 col-xs-9");
			jq321("#respuesta").addClass("col-sm-3 col-xs-3");
		}*/
	}
	else {
		jq321("#reactivo").addClass("center");
		jq321("#respuesta").addClass("center");
	}
	var cuentaPreguntasSegmento =0;
	var cuentaSegmentos = 1; // iniciamos en 1, el cero se presta a confusion...
	for (var i = 0; i < preguntas.length; i++ ) { // Armo las preguntas.....
		var preg = preguntas[i].txt1.split("@");
		var HTMLArmado = "";
		var HTMLArmadoNew ="";
		var HTMLDroppable ="";
		//var segmentos = preg.length;
		var cuantasArrobas = preg.length-1; // Para formar las casillas droppable de respuesta, puede haber respuestas dummy o sea de mas asi evito casillas de mas.
		var numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas? '/'+reactivosMostrar:'') + ((ponerNumeral || ponerNumeroPreguntas)?'.':'');
		if (cuentaPreguntasSegmento==elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			cuentaSegmentos++;
		
		} else {
			cuentaPreguntasSegmento++;
		}
		var pClases = "sub-item pregunta ocultar segmento"+cuentaSegmentos;
		var h1 ='<div class="'+pClases+'" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + '>';
		var h2 = '<p>' + numeralPregunta + '&nbsp;&nbsp;' + tam(preg[0], 1);
		var h10 = '</p>';
		var h11 ='</div>';
        //HTMLArmadoNew = h1+h2+h10+h11;
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
		for (var j=0;j<cuantasArrobas;j++){ //preguntas[i].listaResp.length, da casillas de mas por las respuetas dummy
			//alert (preg[i]);																				
			//HTMLDroppable +='<span class="droppable" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[j]+'" data-idu="pd'+preguntas[i].ind+'"></span>' + preg[j+1];
			HTMLDroppable +='<span class="droppable cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[j]+'"></span>' + preg[j+1];
			idCas++;
			//console.log ("HTMLDroppable: "+HTMLDroppable);
		}
		HTMLArmadoNew = h1+h2+HTMLDroppable+h10+h11;
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
		jq321("#reactivo .lista-preguntas").append(HTMLArmadoNew);

	jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroArroba ocultarRetro" id="retro' + preguntas[i].ind + '0">' + preguntas[i].listaFA ); //RETRO ARROBA

		textoRetro = tam(preguntas[i].txt2[0], 1);
		jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + textoRetro );
		textoRetro = tam(preguntas[i].txt2[1], 1);
		jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + textoRetro );
	//	jq321('#preg' + preguntas[i].ind).after('<hr/>'); RAAR jun 13,18: inhabilito no detecto para que....
	}
	//jq321('div.sub-item:last + hr').remove(); //RAAR jun 13,18: inhabilito no detecto para que....
var arr=[];
	for (var i = 0; i < respuestas.length; i++ ) { //armo respuestas....
		var HTMLArmado ="";
			var listaDroppables = jq321('[data-resp="'+respuestas[i].txt+'"]');		//ojo que una respuesta puede pertenecer a mas de una pregunta/casilla
			var acumulaSegmento='';
			listaDroppables.each( function( index, elemento ) {
			   // jq321( el ).attr('class');				
				//console.log(respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class'));				
				//var clasesPregunta = respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class');
				var guardaSegmento='';	
				var totalseg= elementosPorSegmento;


				if(i==0){

					for(var m=0;m<cuentaSegmentos;m++){
						arr.push(0);
					}
				}

				

				for (var j=1; j<=cuentaSegmentos ;j++) {
					guardaSegmento = 'segmento'+j;
					console.log("holi "+cuentaSegmentos);
					console.log(respuestas[i].txt+' - '+'segmento'+j+' '+ jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento));
					if (jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento)) {
						acumulaSegmento += ' '+guardaSegmento; //por ahora dejo que se dupliquen si es que estan en el mismo segmento....
						conteo++;
						var posis=acumulaSegmento.indexOf("o");
						var novo=acumulaSegmento.substring(posis+1,acumulaSegmento.length);
						var nom= parseInt(novo,10);
						
						var posarr=nom-1;
						var aux= arr[posarr];
						aux++;
						arr[posarr]=aux;

						var formula=(nom-1)*elementosPorSegmento;

						incremento=formula+aux;

					}
					//jq321( elemento ).parents('.pregunta').hasClass('segmento'+j);
				}
			});
			// Firefox 1.0+
			var controlsText='';
			var isFirefox = typeof InstallTrigger !== 'undefined';
			if (!isFirefox) {
				//alert ('firefox');
				controlsText='controls';
			}			

////INCIO DE LA CONSTRUCCION DEL REPRODUCTOR
///LA VARIABLE ENTORNO NOS DICE SI ES AUDIO O VIDEO DESDE LA RUTA
			var entorno=respuestas[i].txt;
			var posm=entorno.indexOf("/");
			entorno=entorno.substring(0,posm);
	var muestra="";
	var playau="";
	var controlclass="";
			var siaudio="";
			var posteraud="";
var audioimagen="";
var altovid="";
//LA VARIABLE POSTERAUD GUARDA LA IMAGEN MOSTRADA EN AUDIOS, LE DAMOS OTRA CLASE A LOS ADIOS YA QUE TIENEN OTRA FORMA EN MOVIL

			if(entorno=="audio"){
				posteraud="poster='img/sonido.png'"
				altovid="height='0px'";
				muestra= 'style="display:none"';
				controlclass="controlitosaud";
				playau="botonplpaaud";


			}else{
				siaudio='<div class="numeralsi" id="exp'+i+'" onclick=" getFullscreen('+i+')" ><i class="fas fa-expand botonexp"></i></div> <div style="display:none" class="numeralsi" id="comp'+i+'" onclick=" getFullscreenOn('+i+')" >	<i class="fas fa-compress botonexp"></i></div>';
				altovid="height='95%'";
				controlclass="controlitos";
				playau="botonplpa";
			}
		
///CREAMOS EL VIDEO TANTO EN AUDIOS COMO EN VIDEOS
			var iconoToca = '<video '+altovid+'  id="resp'+i+'" preload="auto" '+muestra+' data-respuesta="'+respuestas[i].txt+ '" data-quedan="'+respuestas[i].incidencia+'" data-pro="'+i+'" class="draggable"  data="'+respuestas[i].txt+'">'; //aqui requiere CONTROLS  style="color:red;" style="background-color:powderblue;"
			iconoToca += '<source src="'+respuestas[i].txt+'" type="audio/mp3" style="background-color:powderblue;"> ';
			iconoToca += 'Your browser does not support the audio element. ';
			iconoToca += '</video> ';

			var numeralito;
			if (numeral==true){
numeralito=numeralpro;
numeralpro++;
			}
			//CREAMOS LOS CONTROLES PARA EL PLAY O EL STOP, SON DOS DIV CON ICONOS
			//LA LINEA ES UN INPUT TIPO SEEKER 
			//EL DE AMPLIAR ES UN DIV IGUAL CON ICONO
			var botonplay='<div class="'+controlclass+'" id="controles'+i+'"><div class="numeralsi">'+incremento+'</div><div  class="'+playau+'" id="play'+(i+1)+'" onclick="playAudio('+i+')"><i class="play fas fa-play-circle fa-5x"></i></div><div class="'+playau+'" id="pause'+(i+1)+'" style="display:none" onclick="pauseAudio('+i+')"><i class="pause fas fa-pause-circle fa-5x"></i></div><input class="rangos" id="seekslider'+i+'" type="range" min="0" max="100" step="1">'+siaudio+'</div>';

			var values=jq321("resp"+i);
		

			HTMLArmado = '<div id="contenedor'+i+'" data-respuesta="'+respuestas[i].txt+ '" data-quedan="'+respuestas[i].incidencia+'"  data-drag="' + i + '" data="'+respuestas[i].txt+'"   class="sub-item draggable respuesta ocultar'+acumulaSegmento+'" >'+audioimagen+ iconoToca +botonplay+'</div>';
			
			//RAAR Jun 22,18: recuerda, fuen cuando se agrego acumulaSegmento que al restringir la elementosPorSegmento se volvio mas pequeña la casilla de una respuesta que correspondia dos preguntas del mismo segmento...no se que fue....
//			HTMLArmado = '<div class="sub-item respuesta ocultar'+acumulaSegmento+'" ><object data-respuesta="'+respuestas[i].txt+ '" data-quedan="'+respuestas[i].incidencia+'" class="draggable" data-drag="' + i + '" data="'+respuestas[i].txt+'">'+tam(respuestas[i].txt, 1)+'</object>' +'</div>';	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 
			jq321(".respuestas .lista-respuestas").append(HTMLArmado);

	}
	totalSegmentos = cuentaSegmentos;

	recorreSegmentos = 1; // el primer segmento a desplegar...
	jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	if (totalSegmentos>recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
		jq321("#btnPaginador").text(""+recorreSegmentos+"/"+totalSegmentos);
		jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}

}
/*function creaOrdenar() {
	preguntas = reactivos;
	for (i = 0; i < reactivosMostrar; i++) {
		respOriginales.push(preguntas[i].Q);
		var tmp = preguntas[i].Q.split(" ");
		preg = [];
		for (j = 0; j < tmp.length; j++) {
			preg.push([tmp[j], j]);
		}
		reordenaArreglo(preg);
		var txt = "";
		for (j = 0; j < preg.length; j++) {
			txt += "<li class='ui-state-default ui-sortable-handle' data-orden=" + preg[j][1] + "><span class='ui-icon ui-icon-arrowthick-2-e-w'></span>" + preg[j][0] + "</li>";
		}
		jq321("#ordenarEnunciado").append("<div class='lista'><ul class='sortable' id='ulId" + i + "'>" + txt + tam(preguntas[i].Q, 0) + "<div class='retroInd'><div class='retroBien ocultarRetro'>" + tam(preguntas[i].F[0], 1) + "</div><div class='retroMal ocultarRetro'>" + tam(preguntas[i].F[1], 1) + "</div></div>");
		jq321(".lista:last").after("<hr/>");
	}
	jq321(".lista > .sortable").each(function() {
		$(this).sortable();
		$(this).disableSelection();
	});
}*/

//  ============================================================================================================
/*function creaTablaVF(numReactivos){
	jq321('div#contenedor').append('<table class="tabla-reactivos">');
	jq321('.tabla-reactivos').append('<tbody>');
	jq321('tbody').append('<tr>');
	jq321('tr').append('<th>&nbsp;');
	jq321('tr').append('<th id="tV">Verdadero');
	jq321('tr').append('<th id="tF">Falso');
	jq321('tr').append('<th>&nbsp;');
	for (i = 0; i < numReactivos; i++){
		jq321('tbody').append('<tr class="reactivo">');
		jq321('tr:last').append('<td class="preguntaTexto" id="' + i + '">' + tam(reactivos[i].Q, 1) + '<br/><div class="retroBien ocultarRetro">' + tam(reactivos[i].F[0], 1) + '</div><div class="retroMal ocultarRetro">' + tam(reactivos[i].F[1], 1) + '</div></td>');
		jq321('tr:last').append('<td class="preguntaOpciones"><label>' + espacios + '<input type="radio" name="pregunta' + i + '" value="true">' + espacios + '</label>');
		jq321('tr:last').append('<td class="preguntaOpciones"><label>' + espacios + '<input type="radio" name="pregunta' + i + '" value="false">' + espacios + '</label>');
		jq321('tr:last').append('<td>' + palomita + tache);
	}
}*/

/*
//  ============================================================================================================
function creaElegir(mostrar) {
	var ind = 1;
	for (i = 0; i < mostrar; i++) {
		jq321("#contenedor").append('<hr/>').append('<div id="divId' + i + '">');
		jq321("div#divId" + i).append('<p id="pId' + i + '">');
		var componentes = reactivos[i].Q.split("@");
		var respuestas = reactivos[i].A;
		for (j = 0; j < respuestas.length; j++) {
			var opciones = respuestas[j];
			if (mezclarRespuestas) {reordenaArreglo(opciones)}
			opciones.unshift({opcion: "-------", correcta: false});
			jq321("#pId" + i).append(componentes[j]).append('<select id="selId' + ind + '">');
			for (k = 0; k < opciones.length; k++) {
				jq321("select:last").append("<option>" + opciones[k].opcion);
				if (opciones[k].correcta) {
					jq321("select:last").attr("data-respuesta", opciones[k].opcion);
				}
			}
			ind++;
		}
		jq321("#pId" + i).append(componentes[j] + tam(reactivos[i].Q, 0));
		jq321("#divId" + i).append("<div class='retroBien ocultarRetro'>" + tam(reactivos[i].F[0], 1)).append("<div class='retroMal ocultarRetro'>" + tam(reactivos[i].F[1], 1));
	}
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text(ic("kcehC"));
			jq321("#btnReiniciar").text(ic("tpmetta txeN"));
			break;
		default:
			jq321("#btnRevisar").text(ic("rasiveR"));
			jq321("#btnReiniciar").text(ic("otnetni omixórP"));
	}
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
}*/

/*
function creaOM(mostrar) {
	var ind = 1;
	for (i = 0; i < mostrar; i++) {
		jq321("#bancoPreguntas").append('<div class="setPregunta" id="sp' + i + '">');
		jq321(".setPregunta:last").append('<div class="preguntaTexto">' + (i + 1) + '. ' + tam(reactivos[i].Q, 1));
		jq321(".setPregunta:last").append('<div class="opciones">');
		jq321(".setPregunta:last").append('<div class="retroIndividual">');
		if (mezclarRespuestas) {reordenaArreglo(reactivos[i].A);}
		for (j = 0; j < reactivos[i].A.length; j++) {
			var res = String.fromCharCode(j + 97) + ') ';
			jq321(".opciones:last").append('<div class="opcion btn btn-default" data-correcta="' + reactivos[i].A[j].correcta + '">' + res + tam(reactivos[i].A[j].opcion, 1));
			if (reactivos[i].A[j].correcta) {
				jq321(".retroIndividual:last").append('<div class="retroBien ocultarRetro bg-success">' + tam(reactivos[i].A[j].retro, 1) + '</div>');
			}
			else {
				jq321(".retroIndividual:last").append('<div class="retroMal ocultarRetro bg-danger">' + tam(reactivos[i].A[j].retro, 1) + '</div>');
			}
		}
	}
}*/

function tam(cad, n) {// 1T, 0ele.esc.ord Es para imprimir la longitud del texto indicado, crm=var global de impresion, n para apagar en caso particular...
	var txt = "";
	if (crm) {txt = (n == 1) ? cad : ""} // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {txt = cad + txt}
	}
	return txt;
}
//function mostrarMensaje(tipo, titulo, cadena) {
function mostrarMensaje(clase, recurso) {
	if (!recurso) {recurso = -1}
	var msgs = [,
		[ic("setneidnopserroc soicapse sol a satseupser sal sadot artsarra ,rovaf roP"), ic("secaps etairporppa ot srewsna lla gard ,esaelP")],  // completar arrastrando
		[ic("otxet ed sopmac sol sodot anell ,rovaf roP"), ic("sdleif txet lla tuo llif ,esaelP")],                  // completar escribiendo
		[ic("satnugerp sal sadot atsetnoc ,rovaf roP"), ic("snoitseuq lla rewsna ,esaelP")],                         // verdadero-falso
		[ic("sodaicnune sol sodot anedro ,rovaf roP"), ic("secnetnes lla tros ,esaelP")],                            // ordenar enunciados
		[ic("ordaucer adac arap atseupser anu egile ,rovaf roP"), ic("tsil hcae rof rewsna na esoohc ,esaelP")],     // completar eligiendo
		[ic("setneidnopserroc soicapse sol a satseupser sal sadot artsarra ,rovaf roP"), ic("secaps etairporppa ot srewsna lla gard ,esaelP")],  // arrastrar esquema
		["", ""]
		];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					//msg = ic(maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
					msg = maxIntentos + " :You have reached maximum number of attempts"; // empiezo a quitar los espejos....abril 26 2018
					
					btnOK = ic("KO");
					break;
				default:
					tit = ic("nóicnetA");
					msg = ic(maxIntentos + " :sotnetni ed oremún omixám le odaznacla saH");
					btnOK = ic("ratpecA");
			}
			break;
		case 2: // Contestar TODO
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = msgs[recurso][1]; //recurso,1
					btnOK = ic("KO");
					break;
				default:
					tit = ic("nóicnetA");
					msg = msgs[recurso][0];  //recurso,0
					btnOK = ic("ratpecA");
			}
			break;
		default:
			tipo = ic("rorre");
			tit = ic("ametsis ed rorrE");
			msg = ic("adiconocsed nóicidnoC");
			btnOK = ic("ratpecA");
	}
	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true,confirmButtonColor: "#0069d9" });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function(indice){
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == "ENG") ? tam(retroCal[indice].Mensaje[1], 1) : tam(retroCal[indice].Mensaje[0], 1);
			}
		});
	}
	return mensaje;
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			//var btnOK = ic("KO");
			var btnOK = "OK";
			break;
		default:
			//var btnOK = ic("ratpecA");
			var btnOK = "Aceptar";
	}
	swal({title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function esPortable() {
    if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/Opera Mini/i)
            || navigator.userAgent.match(/IEMobile/i)
            ) {
        return true;
    } else {
		return false;
	}
}


//funcion play para los audios y audios de respuesta
function playAudio(ind) {
	/* TODAS LAS PLAY SE MUESTRAN Y SE DETIENEN */
	/* TODAS LAS PAUSE SE OCULTAN */
intializePlayer(ind);
var total=document.getElementsByClassName("respuesta");

for(var i=0;i<total.length;i++){
	var elemnt=jq321("#resp" + i).get(0);
		var audioovideo=jq321(elemnt).attr("data");
		var possi=audioovideo.indexOf("/");
		audioovideo= audioovideo.substring(0,possi);
		
		if(audioovideo=="audio"){
			jq321("#resp" + i).get(0).pause();	
		}else if(audioovideo=="multimedia"){
			jq321("#resp" + i).get(0).pause();
		}

}
var total1=document.getElementsByClassName("clonado");

for(var k=0;k<total1.length;k++){
	
	var audioovideo1=jq321(total1[k]).attr("data");
	var possi1=audioovideo1.indexOf("/");
	audioovideo1= audioovideo1.substring(0,possi1);
	console.log(audioovideo1);

	if(audioovideo1=="audio"){
		jq321(total1[k]).get(0).pause();	
	}else if(audioovideo1=="multimedia"){
		jq321(total1[k]).get(0).pause();
	}

}
var apaga2=document.getElementsByClassName("botonplpaclon");
apagatodas();
var apaga=document.getElementsByClassName("botonplpa");
for(var j=0; j<apaga.length;j++){
	jq321("#play" + (j+1)).css("display", "");
	jq321("#pause" + (j+1)).css("display", "none");

}	
	jq321('#resp' + ind).get(0).play();
	jq321("#play" + (ind+1)).css("display", "none");
	jq321("#pause" + (ind+1)).css("display", "");
	}


	//FUNCION PARA APAGAR TODOS LOS ADUOS Y VIDEOS

function apagatodas(){
for(var n=0;n<9;n++){
	jq321("#playclon"+0+""+n).css("display", "");
	jq321("#pauseclon"+0+""+n).css("display", "none");

}


	for(var m=10; m<99;m++){
	jq321("#playclon" +m).css("display", "");
	jq321("#pauseclon" +m).css("display", "none");
}
}	


//ESTA FUNCION FUNCIONA PARA AGRANDAR EL VIDEO
function getFullscreen(ele){
var element= document.getElementById("contenedor"+ele);

	if(element.requestFullscreen) {
		element.requestFullscreen();
	  } else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	  } else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	  }

	  document.getElementById("exp"+ele).style.display="none";
	  document.getElementById("comp"+ele).style.display="";
  }

  //ESTA FUNCION ES PARA AGRANDAR EL ELEMENTO EN EL SPAN DE PREGUNTAS
  function getFullscreen1(element,numdi){
	if(element.requestFullscreen) {
		element.requestFullscreen();
	  } else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	  } else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	  }

	  document.getElementById("expclon"+numdi).style.display="none";
	  document.getElementById("compclon"+numdi).style.display="";
	  }

///FUNCION PARA QUITAR EL AMPLIADO DE PANTALLA LO IMPROTANTE ESTA EN EL DISPLAY DE ELEMENTOS
	  function getFullscreenOn1(ele,numd){
		var elemente= document.getElementById("contenedor"+ele);
	
	
		if (document.exitFullscreen) {
			document.exitFullscreen();
		  } else if (document.mozCancelFullScreen) { /* Firefox */
			document.mozCancelFullScreen();
		  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		  } else if (document.msExitFullscreen) { /* IE/Edge */
			document.msExitFullscreen();
		  }	
	
	
			  document.getElementById("compclon"+numd).style.display="none";
			  document.getElementById("expclon"+numd).style.display="";
			}   

  function getFullscreenOn(ele){
	var elemente= document.getElementById("contenedor"+ele);


	if (document.exitFullscreen) {
		document.exitFullscreen();
	  } else if (document.mozCancelFullScreen) { /* Firefox */
		document.mozCancelFullScreen();
	  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	  } else if (document.msExitFullscreen) { /* IE/Edge */
		document.msExitFullscreen();
	  }	


		  document.getElementById("comp"+ele).style.display="none";
		  document.getElementById("exp"+ele).style.display="";
		} 




		//ESTA FUNCION PONE PAUSA A TODOS LOS ELEMENTOS DE RESPUESTAS
function pauseAudio(ind) {
	var esteAudio = document.getElementById('resp' + ind);
	esteAudio.pause();
	document.getElementById('pause' + (ind+1)).style.display = "none";
	document.getElementById('play' + (ind+1)).style.display = "block";
	}
//funcion play para los audios y videos dentro del span

	function playAudio1(ind) {
		/* TODAS LAS PLAY SE MUESTRAN Y SE DETIENEN */
		/* TODAS LAS PAUSE SE OCULTAN */

		console.log(ind);
	var total=document.getElementsByClassName("clonado");
var prefijo="";
	if(ind >= 0 && ind <=9){
prefijo=0+""+ind;

	}else{
		prefijo=ind+"";
	}


	intializePlayer1(prefijo);

	for(var i=0;i<total.length;i++){
	
		var audioovideo=jq321(total[i]).attr("data");
		var possi=audioovideo.indexOf("/");
		audioovideo= audioovideo.substring(0,possi);
		console.log(audioovideo);
	
		if(audioovideo=="audio"){
			jq321(total[i]).get(0).pause();	
		}else if(audioovideo=="multimedia"){
			jq321(total[i]).get(0).pause();
		}

	}


	var total1=document.getElementsByClassName("respuesta");

for(var i=0;i<total1.length;i++){
	var elemnt1=jq321("#resp" + i).get(0);
		var audioovideo1=jq321(elemnt1).attr("data");
		var possi1=audioovideo1.indexOf("/");
		audioovideo1= audioovideo1.substring(0,possi1);
		
		if(audioovideo1=="audio"){
			jq321("#resp" + i).get(0).pause();	
		}else if(audioovideo1=="multimedia"){
			jq321("#resp" + i).get(0).pause();
		}

}


apagatodas();

//PROCESO PARA OCULTAR Y PRESENTAR ELEMENTOS

var apaga=document.getElementsByClassName("botonplpa");

for(var j=0; j<apaga.length;j++){
	jq321("#play" + (j+1)).css("display", "");
	jq321("#pause" + (j+1)).css("display", "none");

}
	
	
	
	jq321("#cloncas" + prefijo).get(0).play();

		
		jq321("#playclon" +prefijo).css("display", "none");
		jq321("#pauseclon" + prefijo).css("display", "");
	
	
		}
		
		function pauseAudio1(ind) {
			var prefijo="";
			if(ind >= 0 && ind <=9){
				prefijo=0+""+ind;
				
					}else{
						prefijo=ind+"";
					}


		var esteAudio = document.getElementById('cloncas'+prefijo);
		esteAudio.pause();
		document.getElementById('pauseclon'+prefijo).style.display = "none";
		document.getElementById('playclon' + prefijo).style.display = "block";
		}
	
