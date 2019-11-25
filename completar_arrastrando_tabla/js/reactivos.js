// JavaScript Document
var preguntas = [];
var respuestas = [];
var casillasRespuesta;
var colores=1;
var conteno=1;
var retro = [];
var indices = [];
var arregloeligiendo=[];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip  far fa-check-circle blink ocultar' ></i>";
var tache = "<i class='it  far fa-times-circle blink ocultar' ></i>";
jq321(document).ready(function(){
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


	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
	if (mezclarPreguntas) {reordenaArreglo(preguntas)};
	if (mezclarRespuestas) {reordenaArreglo(respuestas)};
	iniciar();
	console.log("casi");
	
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
/*
function divideReactivosQF_A(numReactivos) {  //  RA-01, RA-03,   QF-A
	var listaRespuestas =[]; // Para generar un listado de respuestas sin repetidos
	var listaTodas = [];
	var tantos = 0;
	for (i = 0; i < numReactivos; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
	//	preguntas.push({txt1: "", txt2: "", ind: 0, respA:"", respB:"", listaResp:""});
	preguntas.push({txt1: "", txt2: "", ind: 0, listaResp:"", listaFA:""});	
		preguntas[i].txt1 = reactivos[i].Q;  //Esto por compatibilidad lo dejo como tal, pero txt1 es un arreglo en esta version
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		preguntas[i].listaResp = reactivos[i].A;
		preguntas[i].listaFA = reactivos[i].FA;		
	}

	for (i = 0; i < numReactivos; i++) { // genero la lista de respuetas recorriendo la matriz y pondiendola en una lista continua sin duplicados
		for (var j = 0; j < reactivos[i].A.length; j++) {
			if (reactivos[i].A[j] != undefined) //Si en listaReactivos.js hay una respusta vacia seguida por una respuesta a una droppable hay un undefined
			{
				if (!listaRespuestas.includes (reactivos[i].A[j])) { 
			 	  listaRespuestas.push(reactivos[i].A[j]);
				}
				listaTodas.push(reactivos[i].A[j]);
			}
		}
	}
	listaRespuestas.sort();
	listaTodas.sort();
	for (i=0; i<listaRespuestas.length;i++){ // translado a la variable global respuestas....
		tantos = cuentaElemento(listaTodas,listaRespuestas[i]); // en listaTodo leo cuantas incidencias tiene una respuesta....
		respuestas.push({txt: listaRespuestas[i], ind:0, incidencia:tantos});
		//console.log ("RESPUESTAS "+respuestas[i].txt,"incidencia "+respuestas[i].incidencia);
	}
    casillasRespuesta = listaTodas.length;
	//console.log (listaRespuestas instanceof Array); // respuestas es un array, por que instancesof da true por que respuestas fue creado por el constructor array
}
*/

//RAAR Sep 3,18: Implemento doble respuesta
function divideReactivosQF_A(numReactivos) {  //  RA-01, RA-03,   QF-A
	var listaRespuestas =[]; // Para generar un listado de respuestas sin repetidos
	var listaTodas = [];
	var tantos = 0;
	for (i = 0; i < numReactivos; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
	//	preguntas.push({txt1: "", txt2: "", ind: 0, respA:"", respB:"", listaResp:""});
		preguntas.push({txt1: "", txt2: "", ind: 0, listaResp:"", listaFA:""});	//se genera en blanco y luego lo encimas...
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		preguntas[i].listaResp = reactivos[i].A;
		preguntas[i].listaFA = reactivos[i].FA;		
	}

	var enlaza="";
	for (var i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		if (reactivos[i].A.length>0) { // el encabezado tiene en blanco la respuesta, esto es para elmininar
			enlaza += reactivos[i].A.join("|");
			console.log ("reactivo " + reactivos[i].A+ " longitud: "+reactivos[i].A.length);
		
	   if (i<numReactivos-1) { enlaza += "|"; }
		}
	}	
//	enlaza = enlaza.replace(/[|]/gi, ","); // Cambios los pipes por comas, por que en las casillas de respuesta no importa...encierro en [] para que lo tome como caracter...
	listaTodas = enlaza.split("|");
	for (var i = 0; i < listaTodas.length; i++) { 
		if (!listaRespuestas.includes (listaTodas[i])) { 
		   listaRespuestas.push(listaTodas[i]);
		}
	}

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
}
*/
//FUNCION PARA CREAR TABLA EN MODO MOVILE
function creaelegirtabla(){

	//REVISA SI HAY PALABRAS CON | para no agregar la palabra por error
	for (var i = 0; i < reactivos.length; i++ ) {
		for(var j=0 ;j < reactivos[i].A.length;j++){
			var cadenacomp=reactivos[i].A[j]; 
			if(cadenacomp.indexOf("|")>-1){
				var pos= cadenacomp.indexOf("|");
				var primeracad=cadenacomp.substring(0,pos);
				var segundacad= cadenacomp.substring(pos+1,cadenacomp.length);
				arregloeligiendo.push(primeracad);
				arregloeligiendo.push(segundacad);
				
			}else{
				arregloeligiendo.push(reactivos[i].A[j]);

			}

		}
	}

//creamos la estructura con  un acumulado de string
	var ta1 = '<table class="tablamasterpro" >';
	var ta11 = '</table>';
var armadopre="";
var armadofinal="";


for(var o=0; o<reactivos[0].Q.length;o++){
for(var m=0; m<reactivos.length;m++){
	var numalter="";
	var contenido="";
	if(m==0){
contenido='<p class="simildroppabled">'+ tam(reactivos[m].Q[o],1)+'</p>';
numalter="1";	
}
	else{
		arregloeligiendo = arregloeligiendo.sort(function() {return Math.random() - 0.5});
//agregamos todos las opciones y la opcion por default con su data respuesta
		var selector="";
		var sel1 = '<select class="opi" data-respuesta="'+reactivos[m].A[o]+'">';
		var sel2 ='</select>';
		var op='';
		op+="<option>------</option>";	

		for(var s=0;s<arregloeligiendo.length;s++){

				op+="<option>"+tam(arregloeligiendo[s],1)	+"</option>";	

			
		}

	contenido=sel1+op+sel2;
		numalter="2";
	}
	var t1='<tr class="mind'+numalter+'">';
	var t2='</tr>';
	var td1='<td>';
	var td2='</td>';
var retros="";
	if(m==0){
		retros='';

	}else{
		//retros generales para todos los elementos excepto el default
		retros='<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[m].FA[o][0], 1) + '">' + palomita + '</span><span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[m].FA[o][1], 1, 1) + '">' + tache + '</span>';

	}

	//agregamos al contenedor maestro
	armadopre+= t1+td1+contenido+retros+td2+t2;}

}
	
armadofinal=ta1+armadopre+ta11;
jq321(".reactivos ").append(armadofinal); //anexo al HTML
console.log("hola");
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
/*		if (!(esTexto)) {
			jq321("#reactivo").addClass("col-sm-9 col-xs-9");
			jq321("#respuesta").addClass("col-sm-3 col-xs-3");
		}*/
	}
	else {
		jq321("#reactivo").addClass("center");
		jq321("#respuesta").addClass("center");
	}

var HTMLArmado = "";
var t1 = '<table class="tablamaster" id="iTabla1">';
var t11 = '</table>';
	for (var i = 0; i < preguntas.length; i++ ) { // Armo las preguntas.....
		var preg = preguntas[i].txt1;
	//	
		var HTMLArmadoNew ="";
		var HTMLDroppable ="";
		//var segmentos = preg.length;
		var cuantasArrobas = preg.length-1; // Para formar las casillas droppable de respuesta, puede haber respuestas dummy o sea de mas asi evito casillas de mas.
		//var numeralPregunta = ponerNumeral ? (i + 1) + '.' : ''; NO SE USA en esta version
		
		//console.log ("length: "+ segmentos +" "+preg[0]+"-SPLIT-"+preg[1])
	

	var t2 = '<tr class="alter'+colores+'">';
	var t10 = '</tr>';

		if(colores==1){
			colores=2;
		}
		//	var h1 ='<div class="sub-item" id="preg' + preguntas[i].ind + '" data-drop=' + preguntas[i].ind + '>';
	//	var h2 = '<p>' + numeralPregunta + '&nbsp;&nbsp;';
	//	var h10 = '</p>';
	//	var h11 ='</div>';

		if(colores==2){
			colores=3;
		}else if(colores==3){
			colores=2;
		}

		var cuentaResp = 0;
		//jq321(".lista-preguntas").append(HTMLArmadoNew); //checar, esta en blanco...
		for (var j=0;j<preg.length;j++){ //preguntas[i].listaResp.length, da casillas de mas por las respuetas dummy

			if (preg[j].indexOf('@')==-1) { // sino hay arroba....
			

			/*	if (preguntas[i].txt1[j]=="Neumocócica conjugada" ||  preguntas[i].txt1[j]=="Infecciones por neumococo" ||  preguntas[i].txt1[j]=="Influenza" || preguntas[i].txt1[j]=="SRP") {
					//alert (preguntas[i].txt1[j]);				
					HTMLDroppable +='<td rowspan="3"><p class="simildroppable cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="">'+preg[j]+'</p></td>';
				}
				else  {	*/	
					



	

					HTMLDroppable +='<th><p class="simildroppable cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="">'+tam(preg[j],1)+'</p></th>';    // JLBG mzo 16, 2019; cambio para poner la primera fila como TH
					cuentaResp++; //si hay una casilla sin dropppable antes de una droppable es importante esto....
				//}

			} 
			else {
				//alert(preguntas[i].txt1[j]);
				//console.log (preguntas[i].txt1[j]);
			//	if (preg[j].indexOf('?')==-1) {
					// data-placeholder se establece en estilos.css es un truco para emular un placeholder en un parrafo...
					if(idCas==0){
						idCas++;
					}
					conteno=2;
					
					HTMLDroppable +='<td class="cContieneDroppable   "><p data-placeholder="'+preg[j].replace("@","")+'" class="droppable cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[cuentaResp++]+'"></p></td>';					
		/*		} 
				else {
					HTMLDroppable +='<td rowspan="2" class="cContieneDroppable"><p class="droppable cpreg'+preguntas[i].ind+'" id="cas'+idCas+'" data-resp="'+preguntas[i].listaResp[cuentaResp++]+'">'+"-"+'</p></td>'; //dejo en blanco el campo...
				}*/


			idCas++;			
			}
		}	
		HTMLArmadoNew = t2+HTMLDroppable+t10;
		HTMLArmado =  HTMLArmado + HTMLArmadoNew; //Armo las celdas....
/*		jq321('#preg' + preguntas[i].ind).append('<BR><BR><div class="retroArroba ocultarRetro" id="retro' + preguntas[i].ind + '0">' + preguntas[i].listaFA ); //RETRO ARROBA
		textoRetro = tam(preguntas[i].txt2[0], 1);
		jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroBien ocultarRetro" id="retro' + preguntas[i].ind + '0">' + textoRetro );
		textoRetro = tam(preguntas[i].txt2[1], 1);
		jq321('#preg' + preguntas[i].ind).append('<BR><div class="retroMal ocultarRetro" id="retro' + preguntas[i].ind + '1">' + textoRetro );
		jq321('#preg' + preguntas[i].ind).after('<hr/>');*/
	}
	HTMLArmado =  t1+HTMLArmado+t11;
	jq321("#reactivo .lista-preguntas").append(HTMLArmado); //anexo al HTML
//	jq321('div.sub-item:last + hr').remove(); //Para que?

	for (var i = 0; i < respuestas.length; i++ ) { //armo respuestas....
		var HTMLArmado ="";
	//	if (esTexto) {             // texto

			//alert ('<img src="'+respuestas[i].txt+'">');

//var t ="this.src='img/palomita.png'";
//var t ="this.src=''";
//var t ="this.alt='prueba'";
//var t ="this.src='img/palomita.png'; this.alt='prueba';";
//var t ="this.alt='prueba'; this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';  alert('hola'); ";
//var t ="jq321(this).hide();";
//var t="this.style.opacity='0.4'; ;alert('hola');";
var t =""; //+tam(respuestas[i].txt,1)

// RAAR, may 16, 18; de aqui...<object> https://stackoverflow.com/questions/22051573/how-to-hide-image-broken-icon-using-only-css-html-without-js
			HTMLArmado = '<div class="sub-item respuesta" ><div data-resp="'+respuestas[i].txt+'" data-quedan="'+respuestas[i].incidencia+'" class="draggable" data-drag="' + i + '">' + '<object height="120" width="120" data="'+respuestas[i].txt+'" type="image/png">'+tam(respuestas[i].txt, 1)+'</object>' + '</div></div>';
 			//may 14, 2018, creo data-resp para separar el despliegue de la respuesta, esto por que incorporo imagenes como respuesta....
		//	HTMLArmado = '<div class="sub-item respuesta" ><div data-quedan="'+respuestas[i].incidencia+'" class="draggable" data-drag="' + i + '">' + tam(respuestas[i].txt, 1) + '</div></div>';	
			jq321(".respuestas .lista-respuestas").append(HTMLArmado);
			
//		}//if texto
		//  may 14, 2018, inhibo esta seccion por que ya no era funcional, ya se manejan multiples respuetas y se necesita una rutina que maneje textos e imagenes...
/*		else {                   // imagen, hay que actualizar para que maneje n casillas de pregunta ene 31,2018 RAAR
			jq321(".respuestas .lista-respuestas").append('<div class="sub-item respuesta "id="resp' + respuestas[i].ind + '"><img data-intentos="1" class="draggable" data-drag="' + respuestas[i].ind + '" src="' + respuestas[i].txt + '"></div>');
		}*/
		console.log("RESPUESTA: "+HTMLArmado);
	}
}



function creaOrdenar() {
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
}

//  ============================================================================================================
/*
function creaTablaVF(numReactivos){
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
	console.log("c"+cad);
	
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
					msg = ic(maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
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
	msg= tam(msg,1);
	swal({title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function(indice){
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == ic("GNE")) ? retroCal[indice].Mensaje[1] : retroCal[indice].Mensaje[0];
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
	cadena=tam(cadena,1);
	swal({title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function quitarAcentos(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; //Le tengo que quitar que elimine la coma, para que la comparacion funcione	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
	var to   = "aaaaeeeeiiiioooouuuunc------"; // RAAR, Ago13,18, le agrego de nuevo la coma, funcionara?, por las clases para las casillas de respuesta....
	for (var i = 0, l = from.length ; i < l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -|]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
	return str;
}//

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