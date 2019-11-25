	/* PROGRAMMING: PENDIENTE DE REVISAR
No leia el maxIntentos si estaba al inicio de este archivo...


pendiente....        bodyOriginal = document.body.innerHTML; y para reestablecer... document.body.innerHTML = bodyOriginal;
file:///G:/Mi%20unidad/DesarrolloMultimedia/FabiolaCorreccionesDeInglesI_programacion/list/index.html
y ojo    with(oDragItem.style){
        zIndex = 1000;
        position="absolute";
        left=x+"px";
        top=y+"px";
    }

  revisar mecnismo para insertar video
<div class="video">
     <img class="maintainaspectratio" src="maintainaspectratio.png" />
     <object>
          <param ... /><param ... />...
          <embed src="..." ...</embed>
     </object>
</div>
https://stackoverflow.com/questions/1495407/maintain-the-aspect-ratio-of-a-div-with-css

*/

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
var esMobil = false;

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
//var palomita = "<img class='palomita' style='display:none' src='img/palomita.png' />";
//var tache = "<img class='tache' style='display:none' src='img/tache.png' />";

jq321(document).ready(function() {//RAAR Sep 13,18: Aqui arrancamos, me traigo esto de index.html
	//esMobil = esPortable();		
	console.log("ready(), es un aparato mobil? "+esMobil);
	console.log("ready(), modo debug? "+debug);

    if (window.name=="movil") { // validacion para el portal en DIONE
        esMobil = true;
        // alert ("indexbis.html window.name: "+window.name);
    }
    else {
        esMobil = esPortable();     
    }


	//if (esMobil && recursoTransformer) {	
	if (esMobil) {
	/*		var texto = jq321("#textoInstrucciones").text();
		jq321("#textoInstrucciones").removeClass("mostrar").addClass("ocultar");	
		jq321("#toolTipInstrucciones").attr("title",texto);
		jq321("#toolTipInstrucciones").removeClass("ocultar").addClass("mostrar");*/
		elementosPorSegmento =1;
		jq321("#textoInstrucciones").addClass("estilosinstruccion");
		jq321(".info").removeClass("ocultar");
		 jq321("#textoInstrucciones").slideUp(10);
	 	jq321("#textoInstrucciones").addClass("mostrarinfo");
	}
	if (mezclarPreguntas) {	reactivos.sort(function(a, b){return 0.5 - Math.random()}); }
	if (mezclarRespuestas) {
		for (i = 0; i < reactivos.length; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
			reactivos[i].A.sort(function(a, b){return 0.5 - Math.random()});
		}		
	};
	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
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
/*function ic(c) {
	var x = c.length;
	var ci = "";
	while (x >= 0) {
		ci+=c.charAt(x);
		x--;
	}
	return ci;
}*/

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
		/*preguntas[i].esRespuesta = reactivos[i].esRespuesta;
		preguntas[i].listaFA = reactivos[i].FA;		*/
	}
	
	var enlaza="";
	for (var i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join("|");
	   if (i<numReactivos-1) { enlaza += "|"; }
	}	
/*	listaTodas = enlaza.split("|");
	for (var i = 0; i < listaTodas.length; i++) { 
		if (listaRespuestas.indexOf (listaTodas[i])==-1) {  //si no esta incluyelo...	
		   listaRespuestas.push(listaTodas[i]);
		}
	}*/

/*	listaRespuestas.sort();
	listaTodas.sort();
	for (i=0; i<listaRespuestas.length;i++){ // translado a la variable global respuestas....
		tantos = cuentaElemento(listaTodas,listaRespuestas[i]); // en listaTodas leo cuantas incidencias tiene una respuesta....
		respuestas.push({txt: listaRespuestas[i], ind:0, incidencia:tantos});
		//console.log ("RESPUESTAS "+respuestas[i].txt,"incidencia "+respuestas[i].incidencia);
	}*/
 
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

function creaArrastrar() { // Se arman las textos con sus correspondientes cajas...
	var idCas = 0; //para cololar un ID unica a cada casilla droppable....
	//var textoRetro = '';
//	var palomita = "<img class='palomita' style='display:' src='img/palomita.png' />"; //pendiente quitar el display y usar .mostrar
//	var tache = "<img class='tache' style='display:' src='img/tache.png' />";
	var palomita = "<i class='ip far fa-check-circle blink ocultar'></i>"; //no imagen...es libreria...
	var tache = "<i class='it far fa-times-circle blink ocultar'></i>";

	//var palomitaReactivo = "<img class='palomitaReactivo' style='display:none' src='img/palomita.png' />";
	//var tacheReactivo = "<img class='tacheReactivo' style='display:none' src='img/tache.png' />";
	var palomitaReactivo = '';//"<i class='ipReactivo far fa-check-circle blink ocultar'></i>"; //no imagen...es libreria...
	var tacheReactivo = ''; //"<i class='itReactivo far fa-times-circle blink ocultar'></i>";



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
		var longPreg = calculaLong(preguntas[i]);   // JLBG 16 mzo, 2019  Funcion para calcular la longitud de la pregunta mas sus respuestas, para que muestre al final de la pregunta
		var preg = preguntas[i].txt1.split("@");
		var HTMLArmado = "";
		var HTMLArmadoNew ="";
		var HTMLDroppable ="";
		//var cuantasArrobas = preg.length-1; // Para formar las casillas droppable de respuesta, puede haber respuestas dummy o sea de mas asi evito casillas de mas.
		//var res = (ponerNumeralResp ? String.fromCharCode(j + 97) + ') ':'');
		var numeralPregunta;
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas)?'.&nbsp;&nbsp;':'');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		} else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas? '/'+reactivosMostrar:'') + ((ponerNumeral || ponerNumeroPreguntas)?'.&nbsp;&nbsp;':'');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		}
		if (cuentaPreguntasSegmento==elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			cuentaSegmentos++;
		
		} else {
			cuentaPreguntasSegmento++;
		}
		var enlaza ='';
		//var textoTem='';
		for (var k=0;k<preguntas[i].listaResp.length;k++) { //Para que una pregunta sepa todas las respuestas de sus casillas
			enlaza += "|";
			textoTemp = preguntas[i].listaResp[k];
			enlaza += textoTemp;
		}
		enlaza += "|";
		var test = i % 2;
		var fondoAlternadoColor = ((i % 2) == 0?"fondoAlternado ":"");
		var pClases = fondoAlternadoColor+"sub-item pregunta ocultar segmento"+cuentaSegmentos;
var h1 ='<div class="incontestada '+pClases+'" id="preg' + preguntas[i].ind + '" data-listaResp="'+enlaza+'">';
		var h2 = '<p>' + numeralPregunta + preg[0];
		//var h2 = '<span>' + numeralPregunta + preg[0];           // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		if (verLongitud==false){
			var h10 = '</p>';    // JLBG, 2019, mzo 16: arreglé la colocaciónn del tamaño del texto de la pregunta 
		}
		else {
			var h10 = '&nbsp;<sup>' + longPreg + '</sup></p>';    // JLBG, 2019, mzo 16: arreglé la colocaciónn del tamaño del texto de la pregunta 
		}		
		var h11 ='</div>';

		textoRetroReactivoCorrecta = preguntas[i].txt2[0]; //RAAR Ago 16,18: uso clase retroBien para desplegar retro por arroba, puede colisionar
		textoRetroReactivoIncorrecta = preguntas[i].txt2[1];
		var rCorrecta = '<span class="ttRetroReactivo preg'+preguntas[i].ind+'" data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(textoRetroReactivoCorrecta, 1) + '">' + palomitaReactivo + '</span>'; // Esto así por que si no es tooltip, el funcionamiento cambia y solo se inserta la imagen...
		var rIncorrecta = '<span class="ttRetroReactivo preg'+preguntas[i].ind+'" data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(textoRetroReactivoIncorrecta, 1) + '">' + tacheReactivo + '</span>';
		HTMLArmadoNew = h1+rCorrecta+rIncorrecta+h2+HTMLDroppable+h10+h11;
		jq321("#reactivo .lista-preguntas").append(HTMLArmadoNew);

	/*	jq321("#reactivo .lista-preguntas").append("<div class='respuestas ocultar segmento"+cuentaSegmentos+"'>RESPUESTAS</div>");*/
		var cuentaResp = preguntas[i].listaResp.length;
		var longRespuesta = 0;
		var numeralRespuesta;
		for (var j=0;j<cuentaResp;j++){ // ahora aqui pongo las RESPUESTAS...
			//	console.log("genero resp en ciclo j :"+preguntas[i].listaResp[j]);
			if (numeralRespuestaAlfabetico) {
				numeralRespuesta = (ponerNumeralRespuesta ? String.fromCharCode(j + 97) : '') + ((ponerNumeralRespuesta ) ? '.&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
			} else {
				numeralRespuesta = (ponerNumeralRespuesta ? (j + 1) : '') + ((ponerNumeralRespuesta) ? '.&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
			}
			if (longRespuesta<preguntas[i].listaResp[j].opcion.length) {
				longRespuesta=preguntas[i].listaResp[j].opcion.length;
			}
			var textValidaRetro = (preguntas[i].listaResp[j] == undefined?'':preguntas[i].listaResp[j].retro);	
			var retroCasilla = '<span class="preg'+preguntas[i].ind+'-'+j+'" data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(textValidaRetro, 1) + '">' + palomita + '</span>'+'<span class="preg'+preguntas[i].ind+'-'+j+'" data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(textValidaRetro, 1) + '">' + tache + '</span>';
			//var rArrIncorrecta = (esMobil?'<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(textValidaInc, 1) + '">' + tache + '</span>':tache);
			var debugRespuesta = (debug?'<sup>'+preguntas[i].listaResp[j].correcta+'</sup>':"");
			var claseRespuestas='';
			var tagInterno = '<input class="casillaRespuesta preg'+preguntas[i].ind+'" id="preg'+preguntas[i].ind+'-'+j+'" type="button" data-es-respuesta="'+preguntas[i].listaResp[j].correcta+ '" data-respuesta="'+preguntas[i].listaResp[j].opcion+ '"  data-reactivo="preg' + preguntas[i].ind+'" value="'+numeralRespuesta+tamInputValue(preguntas[i].listaResp[j].opcion,1)+'">';
			if (esMobil) {
				claseRespuestas ="itemRespuestaMobil ocultar segmento"+cuentaSegmentos;
			} else {
				claseRespuestas ="itemRespuesta ocultar segmento"+cuentaSegmentos;
			}
			HTMLArmado = HTMLArmado + '<span class="'+claseRespuestas+'" >'+ tagInterno +retroCasilla+'</span>'+debugRespuesta;	// RAAR Jun 12,18: El despliegue se separa de lo que se considera LA RESPUESTA, 
		}
		//jq321("#reactivo .lista-preguntas").append(HTMLArmado);		
		jq321('#preg' + preguntas[i].ind).append(HTMLArmado);		
		//alert(longRespuesta);
		jq321("."+"preg"+preguntas[i].ind).parents(".itemRespuesta").css("width",((longRespuesta+10)*8.5)+'px'); //le agrego el 6 por el numeral y el tooltip
	//jq321("."+"preg"+preguntas[i].ind).parents(".itemRespuesta").css("backgroundColor","red");
		//jq321("."+"preg"+preguntas[i].ind).css("width",'100%');
		//jq321(".claseRespuestas").css("width",(longRespuesta*8.5)+'px');

	} // for i, //armo las preguntas...


	totalSegmentos = cuentaSegmentos;
	recorreSegmentos = 1; // el primer segmento a desplegar...
	jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	if (totalSegmentos>recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
		jq321("#btnPaginador").text("Pag. "+recorreSegmentos+"/"+totalSegmentos);
		jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
	

}

function calculaLong(pregunta) {     // JLBG 2019, 16 mzo: funcion para construir la pregunta con todas sus respuestas, y poner su valor al final de la misma
	var x = pregunta.txt1.split("@");
	var nuevo = "";
	for (var i = 0; i < x.length - 1; i++) {
		nuevo += x[i];
		// if (pregunta.listaResp[i].toUpperCase() !== "DISTRACTOR") {
			nuevo += pregunta.listaResp[i];
		// }
	}
	nuevo += x[x.length - 1];
	return nuevo.length;
}

function tam(cad, n) {// 1T, 0ele.esc.ord Es para imprimir la longitud del texto indicado, crm=var global de impresion, n para apagar en caso particular...
	var txt = "";
	if (verLongitud==false) {txt = (n == 1) ? cad : ""} // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {txt = cad + txt}
	}
	return txt;
}
function tamInputValue(cad, n) {// 1T, 0ele.esc.ord Es para imprimir la longitud del texto indicado, crm=var global de impresion, n para apagar en caso particular...
	var txt = ""; //&lt; por "<"   &gt; por ">"
	if (verLongitud==false) {txt = (n == 1) ? cad : ""} // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;(" + cad.length + ")";
		if (n == 1) {txt = cad + txt}
	}
	return txt;
}

function mostrarMensaje(clase, recurso) { //RAAR ago 18,18: quito funcion reversa
	if (!recurso) {recurso = -1}
	var msgs = [,
		["Por favor, arrastra todas las respuestas a los espacios correspondientes", "Please, drag all answers to appropriate spaces"],  // completar arrastrando
		["Por favor, llena todos los campos de texto", "Please, fill out all text fields"],                  // completar escribiendo
		["Por favor, contesta todas las preguntas", "Please, answer all questions"],                         // verdadero-falso
		["Por favor, ordena todos los enunciados", "Please, sort all sentences"],                            // ordenar enunciados
		["Por favor, elige una respuesta para cada recuadro", "Please, choose an answer for each list"],     // completar eligiendo
		["Por favor, arrastra todas las respuestas a los espacios correspondientes", "Please, drag all answers to appropriate spaces"],  // arrastrar esquema		["", ""]
		["Por favor, elija la opción apropiada", "Please, choose the right option"],  // opcion multiple radiobutton		
		];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos;
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = "You have reached maximum number of attempts: "+maxIntentos; // empiezo a quitar los espejos....abril 26 2018
					
					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = "Has alcanzado el máximo número de intentos: "+maxIntentos;
					btnOK = "Aceptar";
			}
			break;
		case 2: // Contestar TODO
			tipo = "warning";
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = msgs[recurso][1]; //recurso,1
					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = msgs[recurso][0];  //recurso,0
					btnOK = "Aceptar";
			}
			break;
		default:
			tipo = "error";
			tit = "Error de sistema";
			msg = "Condición desconocida";
			btnOK = "Aceptar";
	}

	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
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
	mensaje = mensaje +'<br>' +textoRetroGeneral;
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

// JavaScript Document
var min=10;
var max=18;
function increaseFontSize() {
   var p = document.getElementsByTagName('p');
   for(i=0;i<p.length;i++) {
      if(p[i].style.fontSize) {
         var s = parseInt(p[i].style.fontSize.replace("px",""));
      } else {
         var s = 12;
      }
      if(s!=max) {
         s += 1;
      }
      p[i].style.fontSize = s+"px"
	
	
	 localStorage.tamano=s;	  
	 //alert(localStorage.getItem('tamano'));	  
   }
}


function decreaseFontSize() {
   var p = document.getElementsByTagName('p');
   for(i=0;i<p.length;i++) {
      if(p[i].style.fontSize) {
         var s = parseInt(p[i].style.fontSize.replace("px",""));
      } else {
         var s = 12;
      }
      if(s!=min) {
         s -= 1;
      }
      p[i].style.fontSize = s+"px"
   }   

	 localStorage.tamano=s;	  
	 //alert(localStorage.getItem('tamano'));   
}

function soloAbecedario(str) { // solo permito letras minusculas y guion medio sin caracteres especiales....
	//str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
/*	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
	var to   = "aaaaeeeeiiiioooouuuunc------"; 
	for (var i = 0, l = from.length ; i < l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}*/
	str = str.replace(/[^a-z0-9 -]/g, '') // quito todo lo que no sea minusculas, espacio y guion
		.replace(/\s+/g, '-') // los espacios los cambio a guion
		.replace(/-+/g, '-'); // las series de guion por un solo guion
	return str;
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