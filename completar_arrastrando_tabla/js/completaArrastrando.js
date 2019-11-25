/* Update JLBG 2017-11-15
completaArrastrando.js utiliza jquery, jquery.ui.touch-punch y jqueryui para su funcionamiento
   update RAAR Febrero-2018, Acepta respuestas sin caja de preguntas por lo que puede haber mas respuestas q preguntas...
   update RAAR Marzo-2018, Acepta n respuestas y salto de linea...
   update RAAR Marzo-2018, Corrección de insertar dos veces el texto en las respuestas, quitar el número de pregunta....
   -RAAR Abril 03,2018, Agrego retro para cada arroba
   -RAAR Abril 04,2018, Creo esta versión para despliegue en tabla e implementando un solo elemento <object> para el despliegue de textos o imagenes..
   -RAAR Mayo 17,2018, v1.1 Se corrige bug, no se insertaba respuesta en pregunta->data-resp por que no se tomaba en cuenta una casilla sin droppable previa a una con droppable
	-LPFR Agosto 27, 2019 se agregan tooltips de retro
	-LPFR Agosto 27, 2019 se agrega version de info movil
   -LPFR Agosto 27, 2019 se genera el recurso dual para movil
   */
var idObjetivo = 0;
var totalCasillas = 0;
var click=0;
var condicion=1;
var 	correctasReactivo=0;


function iniciar() {

if(esMobil==true)
{
	creaelegirtabla();
}else{
	creaArrastrar();

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
	if(esMobil)
	{

	}else{
		var temp = jq321(".reactivos .lista-preguntas span").length; //?
		totalPreguntas = reactivosMostrar //jq321(".reactivos .lista-preguntas span").length; no se porque estaba asi.....
		DragDrop();
	}



	if (ambSCORM) {
		//Inicio carga SCORM
		if (parent.conectividadSCORM === undefined) {
			console.log("Actividad en documento, es con try");
			try {
				var conexion = conectividadSCORM.conectarYComenzar();
				console.log("actividad:: -> ", conexion);
				conectividadSCORM.iniciarObjetivo(idObjetivo);           // inicializa la actividad
				if (barraSCORM) {conectividadSCORM.actualizarBarra()}    // actualiza la barra de avance
				conectividadSCORM.salvar();                              // guarda el status
			} catch(e){
			console.warn("Error con conectividad SCORM");
			}
		}
		else {
			console.log("Actividad en frame, es con parent");
			if (parent.document.readyState === "complete"){
				iniciarSCORM();
				console.log("ya había cargado");
			}
			else {
				console.log("agregó listener");
				parent.addEventListener("load", function(){
					iniciarSCORM();
				});
			}
			function iniciarSCORM(){
				var conexion = parent.conectividadSCORM.conectarYComenzar();
				console.log("actividad:: -> ", conexion);
				parent.conectividadSCORM.iniciarObjetivo(idObjetivo);          // inicializa la actividad
				if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}   // actualiza la barra de avance
				parent.conectividadSCORM.salvar();                             // guarda el status
			}
		}
		//Fin carga SCORM
	}
}



function DragDrop() {
	if (recursoTransformer && esMobil) {
		jq321( ".respuesta .draggable" ).mouseover(function() {	
						  
		});	
		jq321( ".respuesta .draggable" ).mouseleave(function() {
		
		});	



		jq321( ".respuesta .draggable" ).click(function() {
			var numero_total=document.getElementsByClassName("droppable").length;
			var ocupadito= document.getElementsByClassName("correcto").length;
			console.log(ocupadito);
			console.log(numero_total);
			console.log(click);
			numero_total= numero_total-ocupadito;	
					if (seleccionRapida) { 
						if(condicion==1){
							agregaResp(jq321('.reactivos .lista-preguntas .droppable:not(.ocupado):first'), jq321(this),jq321('.cContieneDroppable:not(.ocupado1):first')); // orale...jala...
						
						jq321('.reactivos .lista-preguntas .ocupado').height("auto");
						click++;	
						if(numero_total==click){
	condicion=0;
	click=0;
						}
						}
						}		
		});

	}else{
		jq321( ".respuesta .draggable" ).mouseover(function() {													  
			if (seleccionRapida) { //.droppable:empty:first
			//	jq321( ".mostrar .droppable:not(.ocupado):first" ).css( "background-color", "PaleTurquoise" ); //RAAR Jun 19,18: Para que marque la primer casilla vacia
			jq321( '.cContieneDroppable:not(.ocupado1):first' ).removeClass("avisaFaltante");
			jq321( '.cContieneDroppable:not(.ocupado1):first' ).css( "border", "2px solid #49d5f8" ); // border: 1px solid #AAAAAA;
			
				console.log(jq321( ".reactivos .lista-preguntas .droppable:not(.ocupado):first" ));
			}
		});	
		//regresa al estado normal
		jq321( ".respuesta .draggable" ).mouseleave(function() {
			if (seleccionRapida) { 
					 //jq321( ".droppable" ).css( "background-color", "white" );
					 jq321( ".cContieneDroppable" ).css( "border", "1px solid #000000" ); // border: 1px solid #AAAAAA;
			}
		});	
	
	jq321( ".respuesta .draggable" ).dblclick(function() {
			var numero_total=document.getElementsByClassName("droppable").length;
			var ocupadito= document.getElementsByClassName("correcto").length;
			console.log(ocupadito);
			console.log(numero_total);
			console.log(click);
			numero_total= numero_total-ocupadito;	
					if (seleccionRapida) { 
						if(condicion==1){
							agregaResp(jq321('.reactivos .lista-preguntas .droppable:not(.ocupado):first'), jq321(this),jq321('.cContieneDroppable:not(.ocupado1):first')); // orale...jala...
				
						jq321('.reactivos .lista-preguntas .ocupado').height("auto");
						click++;	
						if(numero_total==click){
	condicion=0;
	click=0;
						}
						}
						}
						//  alert( "Handler for .dblclick() called." );
						//  jq321('.droppable:empty:first').trigger('drop', jq321( ".draggable:first" ));// no furula
				});
	
	

			}


	//hover de seleccion




	jq321(".respuestas .lista-respuestas [data-drag]").draggable({
		
		cursor: 'move', // no percibo que haga algo...
		revert: true, // para que se regrese el elemento a su lugar de origen si no se acepta
        stack: ".draggable"//poner z-index automático, para poner al frente al elemento que se esta moviendo..
	});
//	jq321(".reactivos .lista-preguntas [data-drop] .droppable").droppable({
	jq321(".reactivos .lista-preguntas .droppable").droppable({		// para aislar los droppable pongo las clases superiores..		
		tolerance: 'pointer',
		accept: '.respuestas .lista-respuestas [data-drag]',
		hoverClass: "dragOver",
		drop: function(event, ui) {	
			console.log(this.id);//obtengo el elemento padre para no interferir en la clase del hijo
		var padre=	document.getElementById(this.id).parentNode;
		var numero_total=document.getElementsByClassName("droppable").length;
		var ocupadito= document.getElementsByClassName("correcto").length;
		console.log(ocupadito);
		console.log(numero_total);
		console.log(click);
		numero_total= numero_total-ocupadito;	
			console.log(padre);
			console.log("DRAGDROP ANTES: "+jq321(this).text()+", "+jq321(ui.draggable).text());
			agregaResp(jq321(this), jq321(ui.draggable),jq321(padre));
			console.log("DRAGDROP DESPUES: "+jq321(this).text()+", "+jq321(ui.draggable).text());
			var ocupados = jq321(".ocupado");
			console.log(casillasRespuesta);
			if (ocupados.length == casillasRespuesta) { //en lugar de reactivosMostrar pongo la cantidad de casillas, una respuesta para varias casillas...
			console.log("entraste");
				jq321(".respuestas").css("display", "none");
				if (formatoColumnas) { //Para reacomodar la pantalla al eliminar la columna de respuestas
					jq321("#reactivo").removeClass("col-md-9 col-lg-9 col-sm-9 col-xs-9").addClass("col-md-12 col-lg-12 col-sm-12 col-xs-12"); 
					jq321("#respuesta").removeClass("col-md-3 col-lg-3 col-sm-3 col-xs-3");
				}
				//alert("if ocupados");
			}
            
						jq321(this).height("auto");
						click++;	
						if(numero_total==click){
	condicion=0;
	click=0;
						}
		}  // de la función drop
	});    // de la función droppable
	//alert ("drag drop");
}

function agregaResp(imagen, arrastrable,contenedor) {

	
	if (!(jq321(imagen).hasClass("ocupado"))) {
		var numDrag = arrastrable.attr('data-drag'); //esto identifica la casilla de respuestas
		var numQuedan = arrastrable.attr('data-quedan'); // de origen asigno cuantas veces se usa hasta agotar...
		//var pregId =  imagen.attr('data-idu'); // identifica de origen a que pregunta pertenece la casilla de respuestas
		var casId =  imagen.attr('id'); // El ID es único por casilla de pregunta
		var idUnico = casId + numDrag.toString(); // A partir del 13-03-2018 la identificación no se duplica.
         // alert ((jq321(imagen).text());
		//imagen.append("<span class='clonado' id='clon" + numDrag + "' data-param='" + numDrag + "'>");
		jq321(contenedor).removeClass("avisaFaltante"); // pinta el borde adecuado

		var arrastrableRespuesta = arrastrable.attr('data-resp');
	//	imagen.append("<span class='clonado' id='clon" + idUnico + "' data-param='" + numDrag + "'>"); //data-param es para amarrar respuestas, pero cae en desuso...
	console.log(arrastrableRespuesta);
var buena="";
var mala="";

	for(var i=0;i<reactivos.length;i++){
		for(var j=0;j<reactivos[i].FA.length;j++){
		
			if(reactivos[i].A[j].indexOf(arrastrableRespuesta)!=-1){
		
			buena=reactivos[i].FA[j][0];

			mala=reactivos[i].FA[j][1];
		}
		}
		
		}
	
	imagen.append('<object class="clonado" id="clon"'+ idUnico+'" height="120" width="120" data="'+arrastrableRespuesta+'" type="image/png">'+tam(arrastrableRespuesta,1)+'</object>'+'<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="'+tam(buena,1)+'">' + palomita + '</span><span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="'+tam(mala,1)+'">' + tache + '</span>');
		jq321('[data-toggle="tooltip"]').each(function () {
			var options = {
				html: true };
	console.log("si se ejecuto");
			if (jq321(this)[0].hasAttribute('data-type')) {
				options['template'] =
				'<div class="tooltip ' + jq321(this).attr('data-type') + '" role="tooltip">' +
				'	<div class="tooltip-arrow"></div>' +
				'	<div class="tooltip-inner"></div>' +
				'</div>';
			}
			
			jq321(this).tooltip(options);
			});
		
	//	if (esTexto) {  //texto
			//jq321(imagen).text("");
	//		jq321(".clonado#clon" + idUnico).append(arrastrable.text() + palomita + tache); // Agrego el texto de la respuesta a la caja del reactivo....
			//jq321(".clonado#clon" + numDrag).append(arrastrable.text() + palomita + tache); // Agrego el texto de la respuesta a la caja del reactivo....
	
	//	}
/*		else {  //imagen, hay que modificarlo tambien solo se corrigio TEXTO, ene 1, 18
			jq321(arrastrable).clone(true).appendTo(".clonado#clon" + numDrag);
			jq321(".clonado#clon" + numDrag).append(arrastrable.val()).append(palomita + tache);
			var imgClon = jq321(".clonado#clon" + numDrag).find("img")[0];
			jq321(imgClon).removeAttr("style");
		}*/

		numQuedan--;
		arrastrable.attr('data-quedan',numQuedan);
		imagen.addClass('ocupado');
		contenedor.addClass('ocupado1');
		//console.log("AGREGA RESPUESTA IMAGEN "+imagen.outerHTML;
		contestadas++;
		if (numQuedan<1) {
			arrastrable.css("display", "none");   // si los deshabilito pueden seguirse arrastrando...
			arrastrable.parent().css("display", "none");	
		}
	}
} 

//funcion para revisar en modo movil
function revisatodo(){
	intentos++;

	//busca todos los elementos evitando el numero sup de cada palabra
	jq321(".tablamasterpro").find("select").each(function(ind2) {
		var respCorrecta = jq321(this).attr("data-respuesta");
		var respElegida = jq321(this).val();
		if(crm==0){
			console.log("entraste");
			
			var posi= respElegida.indexOf(String.fromCharCode(160));
			console.log(posi);
			var respElegida= respElegida.substring(0,posi);

		}


//busca primero si hay coincidencias con palabras dobles
		if(respCorrecta.indexOf("|")>-1){
			var pos= respCorrecta.indexOf("|");
			var palabra1=respCorrecta.substring(0,pos);
			var palabra2=respCorrecta.substring(pos+1,respCorrecta.length);
console.log(palabra1+"d"+palabra2);
if (respElegida == palabra1 || respElegida == palabra2) {
		
	jq321(this).addClass("bien");

		jq321(this).nextAll("span").eq(0).find("i.ip").removeClass("ocultar").addClass("mostrar");
		correctas++;
}
else {
	jq321(this).addClass("mal");

		jq321(this).nextAll("span").eq(1).find("i.it").removeClass("ocultar").addClass("mostrar");
	
}


		}else{
//este condicional es  para palabras normales
			if (respElegida == respCorrecta) {
		
				jq321(this).addClass("bien");
				correctas++;
					jq321(this).nextAll("span").eq(0).find("i.ip").removeClass("ocultar").addClass("mostrar");
				
			}
			else {
				jq321(this).addClass("mal");
		
					jq321(this).nextAll("span").eq(1).find("i.it").removeClass("ocultar").addClass("mostrar");
				
			}
		}
	

		jq321(this).prop("disabled", true);
	


	});

	totalCasillas=document.getElementsByClassName("mind2").length;
	revisaBuenas();

	jq321('#btnRevisar').hide();
	jq321('#btnReiniciar').show();

	
}

function revisar() {

	//revision de acuerdo al recurso dual, el primer caso es movil el segundo es desktop
	if(esMobil==true){
		var vacio=0;
		//busca todos los elementos select para determinar si no falta por contestar
		jq321(".tablamasterpro").find("select").each(function(ind2) {
			var respElegida = jq321(this).val();
			console.log(respElegida);
			if(respElegida=="------"){
				jq321(this).addClass("vacio");
				vacio=1;
			}else{
				jq321(this).removeClass("vacio");
			}
	
		});
		//si no encontro vacios pasa a revisar

		if(vacio==0){
			revisatodo();
		}else{
			mostrarMensaje(2, 5);
		}

	}else{
		var ocupados = jq321(".ocupado");
		var casillasPregunta = jq321(".droppable");	
		totalCasillas =  casillasPregunta.length;
	//	if (ocupados.length != casillasRespuesta) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
		if (ocupados.length != casillasPregunta.length) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
			jq321(".cContieneDroppable:not(.ocupado1)").addClass("avisaFaltante");
			mostrarMensaje(2, 1);
		}
		else {
			jq321(".cContieneDroppable").removeClass("avisaFaltante");
			calificar();
			revisaBuenas();
		}

	}

}

function comparaRespuesta (recibeDrop, recibeColocada) {  // Esta funcion es por que hay puede haber multiples respuestas validas....
	var respStringDrop = "|" + quitarAcentos(recibeDrop) +"|";
	var respStringColocada = "|" + quitarAcentos(recibeColocada)+"|";	

	if (respStringDrop.indexOf(respStringColocada)!=-1) {
	   return true; // si existe la respuesta
	} else {
		return false;  
	}
}

function calificar(){	

	jq321('#btnRevisar').hide();
	jq321('#btnReiniciar').show();

	
	var listaContestadas = jq321 (".droppable"); //Leo las cajas drop, esto es solo para poner palomas o taches
	console.log (listaContestadas);
	correctas = 0;
	jq321.each(listaContestadas,function (indice){ 
		//alert (jq321(this).attr("data-resp"));
		//var respReal = jq321(this).attr("data-drop");
		
		var respStringDrop = jq321(this).attr("data-resp");
		//var respStringColocada = jq321(this).find(".clonado").text();
		var respStringColocada = jq321(this).find(".clonado").attr("data"); //en versiones mas nuevas data-respuesta
		//if (respStringDrop == respStringColocada) {
			var padre=	document.getElementById(this.id).parentNode;
		if (comparaRespuesta(respStringDrop, respStringColocada)) {					
			//alert ("Correcta");
			console.log("buena");
			jq321(padre).addClass("correcto1");
			jq321(this).addClass("correcto");
			console.log(jq321(this).find("i.ip"));
			jq321(this).find("i.ip").removeClass("ocultar").addClass("mostrar");;
			// revisar para activar luego, ya no usa respReap
			//if (mostrarRetroIndividual) {jq321(this).children("#retro" + respReal + "0").removeClass("ocultarRetro").addClass("mostrarRetro")};
			//var cuantos = jq321(".doble");
			correctas++;
			
		}
		else {
			console.log("mala");
			jq321(padre).addClass("incorrecto1");
			jq321(this).addClass("incorrecto");
			console.log(jq321(this).find("i.it"));
			jq321(this).find("i.it").removeClass("ocultar").addClass("mostrar");;
			// revisar para activar luego, ya no usa respReap
			//if (mostrarRetroIndividual) {jq321(this).children("#retro" + respReal + "1").removeClass("ocultarRetro").addClass("mostrarRetro")};
		}
	});
//	var listadoPreguntas = jq321(".lista-preguntas");
//	correctas = 0;
//	console.log (listadoPreguntas);
/*	jq321.each(listadoPreguntas, function(indice){  // no aplica por que es para cuando se califica POR pregunta...
	   var tempPregunta = jq321(this).attr("id");
	   var sTemp = ".c"+tempPregunta; //el ID es casi igual a la clase, por eso lo uso para identificar la clase de las casillas
	   var tempCasilla =   jq321 (sTemp);
	   var temCCorrecta = sTemp+'.correcto'; //busco los objetos que tengan las DOS clases....
	   var tempCorrecta = jq321(temCCorrecta);
	   var rTextoBien = jq321(this).children (".retroBien").text();
	   var rTextoMal = jq321(this).children (".retroMal").text();
	   if (tempCasilla.length == tempCorrecta.length) {
		   correctas++;
		   if (mostrarRetroIndividual) { jq321(this).children (".retroBien").removeClass("ocultarRetro").addClass("mostrarRetro") };
	   }
	   else {
		   if (mostrarRetroIndividual) { jq321(this).children (".retroMal").removeClass("ocultarRetro").addClass("mostrarRetro") };
	   }
	  // if (mostrarRetroArroba && (intentos>=maxIntentos)) { jq321(this).children (".retroArroba").removeClass("ocultarRetro").addClass("mostrarRetro") };
	  if (mostrarRetroArroba) { jq321(this).children (".retroArroba").removeClass("ocultarRetro").addClass("mostrarRetro") };
	}); */
	intentos++;
}

function revisaBuenas() {
	var res = Math.floor(10 * correctas/totalCasillas);
	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? "right answer" : "right answers";
			mostrarEval("", "You have gotten ", "" + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			break;
		default:
			var txtResp = (correctas == 1) ? "respuesta correcta " : "respuestas correctas ";
			mostrarEval("", "Obtuviste", "" + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
	}
	totalPreguntas=totalCasillas;
	console.log("evaluacion " + correctas + " " + txtResp + " :--: " + totalPreguntas);
	if (ambSCORM) {
		//califica SCORM
		if (parent.conectividadSCORM === undefined) {
			console.log("Actividad en documento, es con try");
			try {
				conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0);   // envia los datos a la base de datos
				conectividadSCORM.finalizarObjetivo(idObjetivo);	                             // finaliza la actividad en estatus passed
				conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
				if (barraSCORM) {conectividadSCORM.actualizarBarra()}	                         // actualiza al nuevo estatus la barra de avance
				conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
			} catch(e){
			console.warn("Error al calificar en conectividadSCORM");
			}
		}
		else {
			console.log("Actividad en frame, es con parent");
			parent.conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0); // envia los datos a la base de datos
			parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	                              // finaliza la actividad en estatus passed
			parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
			if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
			parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
		}
		//fin califica SCORM
	}
}

function reiniciar() {  //se invoca en el boton Next Atempt

if(esMobil){
	if (intentos < maxIntentos) {
	
	jq321(".tablamasterpro").find("select").each(function(ind2) {
	
//desabilita las palabras erroneas volviendolas a su estado normal
		var contieneclase=jq321(this).attr("class");
		console.log(contieneclase);
		if(contieneclase.indexOf("mal")>-1){
			console.log("holi");
			jq321(this).val("------");
			jq321(this).prop("disabled", false);
	
		}else{
	
		}

jq321(this).removeClass("mal");
jq321(this).nextAll("span").eq(1).find("i.it").removeClass("mostrar").addClass("ocultar");


	});


	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
correctas=0;}
	else{
		mostrarMensaje(1);
	}
	
}
else{
	condicion=1;
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
		if ((correctas != totalCasillas) || (mostrarRetroIndividual && !(mostrarRetroFinal))) {
			jq321(".respuestas").css("display", "block");
			if (formatoColumnas) {
				jq321("#reactivo").removeClass("col-md-12 col-lg-12 col-sm-12 col-xs-12").addClass("col-md-9 col-lg-9");
				jq321("#respuesta").addClass("col-md-3 col-lg-3");
		/*		if (!(esTexto)) {
					jq321("#reactivo").addClass("col-sm-9 col-xs-9");
					jq321("#respuesta").addClass("col-sm-3 col-xs-3");
				}*/
			}
		}

		
		var listadoPreguntas = jq321(".cContieneDroppable");
	//	var respMal = [];		
		jq321.each(listadoPreguntas, function(indice,valor) {
		//	alert( indice + ": " + valor + this );

//	      var casilla1 = jq321(this).find("#cas1").hasClass("correcto");
        //  var casilla2 = jq321(this).find("#cas2").hasClass("correcto");
	//		if (!casilla1) {
				//respMal.push(respColocada);
		//		jq321(this).find("#cas1").find("img.tache").css("display", "none");


				var incorrecto = jq321(this).find(".incorrecto");
				var incorrectopadre = jq321(this).attr("class");
				var incorrectovalue= jq321(this);
				jq321(incorrecto).removeClass("incorrecto ocupado");
				if(incorrectopadre=="cContieneDroppable ocupado1 incorrecto1"){
					jq321(incorrectovalue).removeClass("incorrecto1 ocupado1");
				}
				
				jq321(incorrecto).empty();
			
				jq321(incorrecto).css("height", "34px");
		//	}
		/*	if (!casilla2) {
				//respMal.push(respColocada);
				jq321(this).find("#cas2").find("img.tache").css("display", "none");
				var incorrecto = jq321(this).find(".incorrecto");
				jq321(incorrecto).removeClass("incorrecto ocupado");
				jq321(incorrecto).empty();
				jq321(incorrecto).css("height", "34px");
			}*/
		});
	//	if (esTexto) {
			var respInc = jq321(".lista-respuestas .sub-item div");
	/*	}
		else {
			var respInc = jq321(".lista-respuestas .sub-item img");
		}*/
		jq321.each(respInc, function(indice) {
/*			for (i = 0; i < respMal.length; i++) {
				if (respMal[i] == jq321(this).attr("data-drag")) {
					jq321(this).attr("style", "position: relative;").css("display", "");
					jq321(this).parent().css("display", "");
				}
			}*/
			jq321(this).attr("style", "position: relative;").css("display", "");
			jq321(this).parent().css("display", "");
		});
	}
	else {
		mostrarMensaje(1);
	}
	contestadas = correctas;

}
	
}
