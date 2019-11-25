// JavaScript Document
var preguntas = [];
var respuestas = [];
//var casillasRespuesta; RAAR Ago 18,18: en desuso, las respuestas no equivalen a casillas droppable
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
// RAAR Estas las migre de configRecurso.js
var intentos = 0;
var correctas = 0;
//var contestadas = 0;
var totalPreguntas = 0;
var totalSegmentos = 0;
var recorreSegmentos =1; // por lo menos existe el primer segmento o sea el unico


var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<img class='palomita blink' style='display:none' src='img/palomita.png' />"; //NO FUNCIONAN EN ESQUEMA...
var tache = "<img class='tache blink' style='display:none' src='img/tache.png' />";
var palomita1 = "<i class='ip  far fa-check-circle blink ocultar' ></i>";
var tache1 = "<i class='it  far fa-times-circle blink ocultar' ></i>";

jq321(document).ready(function() {//RAAR Sep 13,18: Aqui arrancamos, me traigo esto de index.html
	if (window.name=="movil") {
		esMobil = true;
		// alert ("indexbis.html window.name: "+window.name);
	}
	else {
		esMobil = esPortable();		
	}
	if (esMobil) {
		elementosPorSegmento =1;
		//var texto = jq321("#textoInstrucciones").html();
		jq321("#textoInstrucciones").addClass("estilosinstruccion");
	jq321(".info").removeClass("ocultar");
	 jq321("#textoInstrucciones").slideUp(10);
	 jq321("#textoInstrucciones").addClass("mostrarinfo");
	}
	
	
	if (mezclarPreguntas) {	reactivos.sort(function(a, b){return 0.5 - Math.random()}); }
	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
	if (mezclarRespuestas) {reordenaArreglo(respuestas)};
	iniciar();

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
	for (var i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join("|");
	   if (i<numReactivos-1) { enlaza += "|"; }
	}	
//	enlaza = enlaza.replace(/[|]/gi, ","); // Cambios los pipes por comas, por que en las casillas de respuesta no importa...encierro en [] para que lo tome como caracter...
	listaTodas = enlaza.split("|");
	for (var i = 0; i < listaTodas.length; i++) { 
		if (!listaRespuestas.includes (listaTodas[i])) { 
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
    //casillasRespuesta = listaTodas.length;
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
/*
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
}*/

//funcion para crear esquema en movil con crea escribiendo
function creaesquema(){

var arregloop=[];
var armadopro="";
var prearmado="";
for(var j=0;j<reactivos[0].A.length;j++){
arregloop.push(reactivos[0].A[j]);
}



//construccion de la tabla 
for(var i=0;i<reactivos[0].A.length;i++){
	var p1="<p class='perf'>";
	var p2="</p>";
	var retros="";
	var numero=(i+1)+".-";
	var sel1='<select data-respuesta="'+reactivos[0].A[i]+'">';
	var sel2="</select>";
	arregloop = arregloop.sort(function() {return Math.random() - 0.5});
	armadopro+="<option>------</option>";

	for(var m=0;m<arregloop.length;m++){

	armadopro+="<option>"+tam(arregloop[m],1)+"</option>";

	

	}
retros='<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[0].FA[i].correcta, 1) + '">' + palomita1 + '</span><span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[0].FA[i].incorrecta, 1) + '">' + tache1 + '</span>';
prearmado+=p1+numero+sel1+armadopro+sel2+retros+p2;
armadopro="";
}
var cont1="<div class='preguntas'>";
	var cont2="</div>";
	var todoall=cont1+prearmado+cont2;
var imagen= reactivos[0].Q;
var pos=imagen.indexOf("@");
console.log(pos);
imagen=imagen.substring(0,pos);
var todoimagen= "<div id='wrap'>"+imagen+"</div>";
//se inicializa el zoom para la imagen 
var viewer = new ViewBigimg();
jq321(".reactivos ").append(todoall);
jq321(".reactivos ").append(todoimagen);



var wrap = document.getElementById('wrap');
wrap.onclick = function (e) {
  if (e.target.nodeName === 'IMG') {
 viewer.show(e.target.src);

  }
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
		var numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas? '/'+reactivosMostrar:'') + ((ponerNumeral || ponerNumeroPreguntas)?'.-':'');
		if (cuentaPreguntasSegmento==elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			cuentaSegmentos++;
		
		} else {
			cuentaPreguntasSegmento++;
		}
		var enlaza ='';
		var textoTemp=''; //var textoTem=''; asi estaba al nov 20,18
		for (var k=0;k<preguntas[i].listaResp.length;k++) { //Para que una pregunta sepa todas las respuestas de sus casillas
			enlaza += "|";
			textoTemp = preguntas[i].listaResp[k];
			enlaza += textoTemp;
		}
		enlaza += "|";
		var pClases = "sub-item content_todo pregunta ocultar segmento"+cuentaSegmentos;
		
		var h1 ='<div class="'+pClases+'" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + ' data-listaResp="'+enlaza+'">';
	//	var h2 = '<p>' + numeralPregunta + '&nbsp;&nbsp;' + tam(preg[0], 1);
	//	var h10 = '</p>';
		// var h2 = tam(preg[0], 1);
		var h2 = preg[0];     // JLBG mzo 16, 2019; quité el número que se mostraba debajo de la imagen
		var h10 = '';	
		var h11 ='</div>';
        //HTMLArmadoNew = h1+h2+h10+h11;
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
	//	for (var i = 0; i < respuestas.length; i++ ) { //asi estaba en la version 2.3
		var elemObjeto = '';
		var retroArrobaCorrecta ='';
		var retroArrobaIncorrecta='';
		var tipotool="";
		var tipotool2="";
		var retroArrobaEsquema =''; // En esquema las retros por arroba las pongo despues de la imagen
		for (var j=0;j<cuantasArrobas;j++){ //Creo una casilla por arroba,
			// RAAR Sep 4,18: Esto valida cuando no se pongan todas las retros por arroba
			var textValidaCorr = (preguntas[i].listaFA[j] == undefined?'':preguntas[i].listaFA[j].correcta);	
			var textValidaInc = (preguntas[i].listaFA[j] == undefined?'':preguntas[i].listaFA[j].incorrecta);	
			// copiate la validacion de retroIndividual, es mas simple...
			if (textValidaCorr.length>0) {
				console.log("");
				retroArrobaCorrecta = '<div class="cas'+idCas+' retroArroba retroBien ocultarRetro">'+textValidaCorr+'</div>' ;
				retroArrobaEsquema += retroArrobaCorrecta;
				tipotool="success";
			}
			if (textValidaInc.length>0) {
				console.log("BUENA");
				retroArrobaIncorrecta = '<div class="cas'+idCas+' retroArroba retroMal ocultarRetro">'+textValidaInc+'</div>' ;
				retroArrobaEsquema += retroArrobaIncorrecta;
				tipotool2="danger";
			}		
			
			//data="img/blanco.png"
			elemObjeto = '<object class="draggable clonado" data="" data-respuesta="" ></object>'; // Creo los atributos para el enroque de datos en el drop, blanco.png es un truco para q se active para imagenes, hay que quitarlo luego...
			//HTMLDroppable +='<span class="droppable cpreg'+preguntas[i].ind+' cas'+idCas+'" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[j]+'">'+elemObjeto+palomita+tache+'</span>'+retroArrobaCorrecta+retroArrobaIncorrecta + preg[j+1]
			HTMLDroppable +='<span class=" droppable cpreg'+preguntas[i].ind+' cas'+idCas+' buena" id="cas'+idCas+'"   data-resp="'+preguntas[i].listaResp[j]+'" >'+'<span data-toggle="tooltip" class=" toolsti adaptable" data-placement="auto left" data-type="success" title="'+tam(preguntas[i].listaFA[j].correcta,1)+'">' + palomita + '</span><span data-toggle="tooltip" class="toolsti adaptable" data-placement="auto left" data-type="danger" title="'+tam(preguntas[i].listaFA[j].incorrecta,1)+'">' + tache + '</span>'+elemObjeto+'</span>' + preg[j+1];			
		
			console.log(preguntas[i].listaFA[j].correcta);
			console.log(preguntas[i].listaFA[j].incorrecta);
			idCas++;
			//console.log ("HTMLDroppable: "+HTMLDroppable);
		}
		console.log(retroArrobaEsquema);
		HTMLArmadoNew = h1+h2+HTMLDroppable+h10+h11;
		
		//console.log("HTMLArmadoNew: "+HTMLArmadoNew);
		jq321("#reactivo .lista-preguntas").append(HTMLArmadoNew);
		
//	jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroArroba ocultarRetro" id="retro' + preguntas[i].ind + '0">' + preguntas[i].listaFA ); //RETRO ARROBA
		textoRetro = tam(preguntas[i].txt2[0], 1); //RAAR Ago 16,18: uso clase retroBien para desplegar retro por arroba, puede colisionar
		
		
		if (textoRetro.length>0) { // RAAR Nov 20,18: Aqui pongo la retro arroba para que vaya despues de la imagen...
			jq321('#preg' + preguntas[i].ind).append('<div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + textoRetro +'</div>');
		}
		textoRetro = tam(preguntas[i].txt2[1], 1);
		if (textoRetro.length>0) {
			jq321('#preg' + preguntas[i].ind).append('<div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + textoRetro +'</div>');
		}
	//	jq321('#preg' + preguntas[i].ind).after('<hr/>'); RAAR jun 13,18: inhabilito no detecto para que....
	}
	//jq321('div.sub-item:last + hr').remove(); //RAAR jun 13,18: inhabilito no detecto para que....

	for (var i = 0; i < respuestas.length; i++ ) { //armo respuestas....
		var HTMLArmado ="";
			// RAAR Ago 13,18: El pipe es un truco para que me de el texto exacto y no encuentre una parte...
			// listaResp esta en la PREGUNTA no en las casillas, es para obtener el segmento....
			var listaDroppables = jq321('[data-listaResp*="|'+respuestas[i].txt+'|"]');		//ojo que una respuesta puede pertenecer a mas de una pregunta/casilla,* que contenga... por los casos de doble casilla de respuesta
			var acumulaSegmento='';
			listaDroppables.each( function( index, elemento ) {
			   // jq321( el ).attr('class');				
				//console.log(respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class'));				
				//var clasesPregunta = respuestas[i].txt+' - '+jq321( el ).parents('.pregunta').attr('class');
				var guardaSegmento='';				
				for (var j=1; j<=cuentaSegmentos ;j++) {
					guardaSegmento = 'segmento'+j;
					console.log(respuestas[i].txt+' - '+'segmento'+j+' '+ jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento));
				//	if (jq321( elemento ).parents('.pregunta').hasClass(guardaSegmento)) {
					if (jq321( elemento ).hasClass(guardaSegmento)) {
						acumulaSegmento += ' '+guardaSegmento; //por ahora dejo que se dupliquen si es que estan en el mismo segmento....
					}
					//jq321( elemento ).parents('.pregunta').hasClass('segmento'+j);
				}
			});

			//RAAR Jun 22,18: recuerda, fuen cuando se agrego acumulaSegmento que al restringir la elementosPorSegmento se volvio mas pequeña la casilla de una respuesta que correspondia dos preguntas del mismo segmento...no se que fue....
			HTMLArmado = '<div class="sub-item respuesta ocultar'+acumulaSegmento+'" ><object data-respuesta="'+respuestas[i].txt+ '" data-quedanInicial="'+respuestas[i].incidencia+'" data-quedan="'+respuestas[i].incidencia+'" class="draggable '+quitarAcentos(respuestas[i].txt)+'" data-drag="' + i + '" data="'+respuestas[i].txt+'">'+tam(respuestas[i].txt, 1)+'</object>' +'</div>';	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 
			jq321(".respuestas .lista-respuestas").append(HTMLArmado);

	}
	totalSegmentos = cuentaSegmentos;
	recorreSegmentos = 1; // el primer segmento a desplegar...
	jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
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
	if (cad == "") {return ""};
	var txt = "";
	if (crm) {txt = (n == 1) ? cad : ""} // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {txt = cad + txt}
	}
	return txt;
}



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
//function mostrarMensaje(tipo, titulo, cadena) {
/*
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
	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}*/

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) { 
		jq321.each(retroCal, function(indice){
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == "ENG") ? retroCal[indice].Mensaje[1] : retroCal[indice].Mensaje[0];
			}
		});
	}
	mensaje = tam(mensaje, 1) +'<br>' + tam(textoRetroGeneral, 1);
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

	swal({title:titulo, text: cadena, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
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

