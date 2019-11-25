
/* NOTAS
*/


function iniciar() {
	identificaPlataforma(); 
	creaArrastrar();
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text("Check"); //ic("Check"
			jq321("#btnReiniciar").text("Next attempt"); //ic("Next attempt")
			break;
		default:
			jq321("#btnRevisar").text("Revisar"); //ic("Revisar")
			jq321("#btnReiniciar").text("Próximo intento"); //ic("Próximo intento"
	}
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (elementosPorSegmento<reactivosMostrar) { // los botones de paginas...
		if (carruselContinuo) {
			jq321( ".cPaginador.cProximo" ).removeClass("invisible").addClass("visible");
			jq321( ".cPaginador.cPrevio" ).removeClass("invisible").addClass("visible");
		} else {
			jq321( ".cPaginador.cProximo" ).removeClass("invisible").addClass("visible");
		}
	}	


//	var temp = jq321(".reactivos .lista-preguntas span").length; //?
	 //jq321(".reactivos .lista-preguntas span").length; no se porque estaba asi.....
	if (calificaPregunta) { // RAAR oct 14,18: para despues...al desarrollar para AGN el recurso scormu2_act1 se observa...
							// reactivosMostrar funciona con calificaPregunta=true pero si hay preguntas dummy?, por que se necesita que se pueda forzar las preguntas a cierta cantidad...
							// esto implica que no todas las preguntas cuentan para calificacion, esto no tiene problema si solo hay una arroba-casilla por pregunta, pero si es mas de una...no funciona
		totalPreguntas = reactivosMostrar;
	} else {
		totalPreguntas = jq321(".droppable").length;
	}
	DragDrop();
//	conectividadSCORM.iniciaAmbienteScorm(ambSCORM,barraSCORM,idObjetivo);
iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);
}
function identificaPlataforma() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = '' + parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;/*
	jq321("#watermark").append("<b>appVersion:</b> " + nVer);
	jq321("#watermark").append("<br><b>userAgent:</b> " + nAgt);
	jq321("#watermark").append("<br><b>appName:</b> " + browserName);
	jq321("#watermark").append("<br><b>fullVersion:</b> " + fullVersion);
	jq321("#watermark").append("<br><b>majorVersion:</b> " + majorVersion);
	jq321("#watermark").append("<br><b>platform:</b> " + platform + "<br>");*/
	vBrowser = versionBrowser(); // la declaro global
	//alert (vBrowser.name + " " + vBrowser.version);
	if ("ontouchstart" in document.documentElement) {
		jq321("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo es Touch Screen<br>");
	}
	else {
		jq321("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo NO es Touch Screen<br>");
	}	
}



function DragDrop() {
	jq321( ".dropup-content .fa-search-plus" ).click(function() {
		var self = this;
	//	alert ("Zoom "+jq321(self).parents(".respuesta").find(".draggable").attr("data"));
		var imagen =jq321(self).parents(".respuesta").find(".draggable").attr("data");
		//https://www.w3schools.com/howto/howto_css_modal_images.asp
		var modal = document.getElementById("modalZoom");
		var modalImg = document.getElementById("imgZoom");
		// Get the <span> element that closes the modal
		///var span = document.getElementsByClassName("close")[0];
		var span = document.getElementById("closeZoom");
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() { 
		modal.style.display = "none";
		}
		modal.style.display = "block";
		//modalImg.src = this.src;
	
		modalImg.src = imagen;
	 });


	if (esMobil) {
		jq321( ".respuesta .draggable" ).mouseover(function() {		

														  
			jq321( ".mostrar .droppable:not(.ocupado):first" ).removeClass("bordeDrop").addClass("objetivoSeleccionRapida");
		});	
		jq321( ".respuesta .draggable" ).mouseleave(function() {
				jq321(".mostrar .droppable").removeClass("objetivoSeleccionRapida").addClass("bordeDrop");
		});	
		jq321( ".respuesta .draggable" ).click(function() {
			agregaResp(jq321('.mostrar .droppable:not(.ocupado):first'), jq321(this)); // orale...jala...
			limpiaRespuestas(); 
		});

	} else {	
		jq321( ".respuesta .draggable" ).mouseover(function() {	
			console.log("data"+jq321(this).attr("data"));	


	/*		//https://www.w3schools.com/howto/howto_css_modal_images.asp
			var modal = document.getElementById("modalZoom");
			var modalImg = document.getElementById("imgZoom");
			// Get the <span> element that closes the modal
			///var span = document.getElementsByClassName("close")[0];
			var span = document.getElementById("closeZoom");
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() { 
			modal.style.display = "none";
			}
			modal.style.display = "block";
			//modalImg.src = this.src;
			//modalImg.src = 'ejemplo/autoconocimiento.png';*/
 
			if (seleccionRapida) { //.droppable:empty:first
			//	jq321( ".mostrar .droppable:not(.ocupado):first" ).css( "background-color", "PaleTurquoise" ); //RAAR Jun 19,18: Para que marque la primer casilla vacia
			//	jq321( ".mostrar .droppable:not(.ocupado):first" ).css( "border", "2px solid PaleTurquoise" ); // border: 1px solid #AAAAAA;
				jq321( ".mostrar .droppable:not(.ocupado):first" ).removeClass("bordeDrop").addClass("objetivoSeleccionRapida");
			}
		});	
		jq321( ".respuesta .draggable" ).mouseleave(function() {
			if (seleccionRapida) { 
				//jq321( ".droppable" ).css( "background-color", "white" );
				//   jq321( ".mostrar .droppable" ).css( "border", "1px solid #AAAAAA" ); // border: 1px solid #AAAAAA;
				jq321(".mostrar .droppable").removeClass("objetivoSeleccionRapida").addClass("bordeDrop");
			}
		});	
		jq321( ".respuesta .draggable" ).dblclick(function() {
			if (seleccionRapida) { 
				//  alert( "Handler for .dblclick() called." );
				//  jq321('.droppable:empty:first').trigger('drop', jq321( ".draggable:first" ));// no furula
				agregaResp(jq321('.mostrar .droppable:not(.ocupado):first'), jq321(this)); // orale...jala...
				limpiaRespuestas(); 
			}
		});
/*		jq321( ".respuesta .draggable .not(ui-draggable-dragging)" ).click(function() { //colisiona en click sensillo con el draggable
			if (seleccionRapida) { 
				//  alert( "Handler for .dblclick() called." );
				//  jq321('.droppable:empty:first').trigger('drop', jq321( ".draggable:first" ));// no furula
				agregaResp(jq321('.mostrar .droppable:not(.ocupado):first'), jq321(this)); // orale...jala...
				limpiaRespuestas(); 
			}
		});		*/
	}

jq321( ".cPaginador" ).mouseover(function() {													  

/*	self= this; //practica para asegurar que estoy en el que dio click.... 
 	if (jq321(self).hasClass('cProximo')) {
		if (recorreSegmentos==totalSegmentos) {
			jq321(self).css( "background-color", "red" );
		//	jq321(self).prop( "disabled", "true" )
		}	
	} else {
		if (recorreSegmentos==1) {
			jq321(self).css( "background-color", "red" );
		//	jq321(self).prop( "disabled", "true" )
		}		
		
	}*/
});	
jq321( ".cPaginador" ).click(function() {
//  alert( "Handler for .dblclick() called." );
//  jq321('.droppable:empty:first').trigger('drop', jq321( ".draggable:first" ));// no furula
//  agregaResp(jq321('.droppable:empty:first'), jq321(this)); // orale...jala...
	self= this; //practica para asegurar que estoy en el que dio click....

	if (jq321(self).hasClass('cProximo')) {
		jq321(".segmento"+recorreSegmentos).removeClass("mostrar").addClass("ocultar");	
		if (carruselContinuo)	{		
			recorreSegmentos = (recorreSegmentos<totalSegmentos? ++recorreSegmentos: 1);
		} else {
			recorreSegmentos = (recorreSegmentos<totalSegmentos? ++recorreSegmentos: recorreSegmentos);
			if (recorreSegmentos<totalSegmentos) {
				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");	
			} else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cPrevio").removeClass("invisible").addClass("visible");
			}
		}
		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	//	alert('paginador cProximo'+this.innerText+ ' HTML '+self.innerHTML );
	} else {
		jq321(".segmento"+recorreSegmentos).removeClass("mostrar").addClass("ocultar");	
		if (carruselContinuo){
			recorreSegmentos = (recorreSegmentos>1? --recorreSegmentos: totalSegmentos);	
		} else {
			recorreSegmentos = (recorreSegmentos>1? --recorreSegmentos: 1);	
			if (recorreSegmentos>1) {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");	
			} else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cProximo").removeClass("invisible").addClass("visible");
			}			
		}
		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
//		alert('paginador cPrevio'+this.innerText+ ' HTML '+self.innerHTML );		
	}
/*	if (recorreSegmentos<totalSegmentos) {
		jq321(self,".cProximo").addClass("mostrar");
	} else {
		jq321(self,".cProximo").addClass("ocultar");
		jq321(self,".cPrevio").addClass("mostrar");
	}
	if (recorreSegmentos>1) {
		jq321(self,".cPrevio").addClass("mostrar");
	} else {
		jq321(self,".cPrevio").addClass("ocultar");
	}*/

	jq321("#btnPaginador").text("Pag. "+recorreSegmentos+"/"+totalSegmentos);
});

	

	
	jq321(".draggable").draggable({
	//	 hover: ,

		cursor: 'move', // no percibo que haga algo...
		revert: true, // para que se regrese el elemento a su lugar de origen si no se acepta
      stack: ".draggable",//poner z-index automático, para poner al frente al elemento que se esta moviendo..
	  drag: function(){					// <<<<<<<<<<<============== JLBG Oct 16, 2019, función para ocultar la lupa al iniciar el arrastre
		// console.log("Durante DRAG");
		jq321(this).parent().find(".iconoLupa").css("display", "none");
	},
	stop: function(){					// <<<<<<<<<<<============== JLBG Oct 16, 2019, función para mostrar la lupa al terminar el arrastre
		// console.log("Terminando DRAG");
		jq321(this).parent().find(".iconoLupa").css("display", "initial");
	}
	
	});
	
	jq321(".reactivos .lista-preguntas [data-drop] .droppable").droppable({
		tolerance: 'pointer',
		accept: '.draggable',
		hoverClass: "dragOver",
		drop: function(event, ui) {	 // esto es solo un evento que se dispara..al ACEPTAR

			agregaResp(jq321(this), jq321(ui.draggable));

			limpiaRespuestas();
        //    jq321(this).width("auto"); RAAR Jun 20, 18, Esto para que? si hay width y height minimo en css . droppable....
         //   jq321(this).height("auto");
			
		}  // de la función drop
	});    // de la función droppable
	//alert ("drag drop");
}

function limpiaRespuestas() {
	var casillasRespuesta = jq321(".pregunta .draggable").length;
	var ocupados = jq321(".ocupado").length;
	if (ocupados == casillasRespuesta) { //en lugar de reactivosMostrar pongo la cantidad de casillas, una respuesta para varias casillas...
		jq321(".respuestas").css("display", "none");
		if (formatoColumnas) { //Para reacomodar la pantalla al eliminar la columna de respuestas
			jq321("#reactivo").removeClass("col-md-9 col-lg-9 col-sm-9 col-xs-9").addClass("col-md-12 col-lg-12 col-sm-12 col-xs-12");
			jq321("#respuesta").removeClass("col-md-3 col-lg-3 col-sm-3 col-xs-3");
		}
		//alert("if ocupados");
	}
}

function agregaResp(imagen, arrastrable) { // imagen es un apuntador, un receptor de this....del droppable
	var numDrag = arrastrable.attr('data-drag'); //esto identifica la casilla de respuestas
	var numQuedan = arrastrable.attr('data-quedan'); // de origen asigno cuantas veces se usa hasta agotar...

	//var pregId =  imagen.attr('data-idu'); // identifica de origen a que pregunta pertenece la casilla de respuestas
	//var casId =  imagen.attr('id'); // El ID es único por casilla de pregunta
	var dataRespuestaReceptor = imagen.attr('data-resp'); // esto es de la pregunta no de casillas....
//	var dataRespuestaReceptor2 = jq321(imagen).attr('data-resp');		
//	var idUnico = 'clon' + casId + numDrag.toString(); // A partir del 13-03-2018 la identificación no se duplica. Combino receptor y arrastrable por que puede usarse una respuesata para mas de un receptor...
//.attr("id",idUnico)
	// podría tomar -data- para obtener la respuesta sin duplicar en data-respuesta, creo que si, pero por ahora los separo conceptualmente....
	var dataRespuestaArrastrable = arrastrable.attr('data-respuesta');
	var dataArrastrable = arrastrable.attr('data');
	var textoArrastrable = arrastrable.text();
	if (jq321(arrastrable).hasClass("clonado")){ //permutas en zona de preguntas, varias validaciones
		if (yaUsada(jq321(imagen).parents(".pregunta").attr("id"),jq321(arrastrable).html())==false) { //podría ser text()... para que no tome dos casillas iguales en el mismo reactivo
			jq321(".mostrar .droppable").removeClass("avisaFaltante").addClass("bordeDrop"); // pinta el borde adecuado
			var dataTemp = jq321(imagen).find(".draggable").attr("data");
			var dataRespuestaTemp = jq321(imagen).find(".draggable").attr("data-respuesta");
			var textoTemp = jq321(imagen).find(".draggable").text();
			jq321(imagen).find(".draggable").text(textoArrastrable).attr("data",dataArrastrable).attr("data-respuesta",dataRespuestaArrastrable).removeClass(quitarAcentos(dataRespuestaTemp)).addClass(quitarAcentos(dataRespuestaArrastrable)); 
			jq321(arrastrable).text(textoTemp).attr("data",dataTemp).attr("data-respuesta",dataRespuestaTemp).removeClass(quitarAcentos(dataRespuestaArrastrable)).addClass(quitarAcentos(dataRespuestaTemp)); //.addClass(quitarAcentos(dataRespuestaArrastrable))

			if (jq321(imagen).hasClass("ocupado") != jq321(arrastrable).parent().hasClass("ocupado")) { // es un XOR
				var imClass = jq321(imagen).hasClass("ocupado") ? 'ocupado': '';
				var arrClass = jq321(arrastrable).parent().hasClass("ocupado")? 'ocupado' : '';
				jq321(imagen).removeClass('ocupado').addClass(arrClass);
				jq321(arrastrable).parent().removeClass('ocupado').addClass(imClass);
			}
		}
	} else { // Si el arrastre es desde zona de respuestas...
		
		if (yaUsada(jq321(imagen).parents(".pregunta").attr("id"),jq321(arrastrable).html())==false) { //podría ser text()...
			if (!(jq321(imagen).hasClass("ocupado"))) {
				jq321(".mostrar .droppable").removeClass("avisaFaltante").addClass("bordeDrop"); // pinta el borde adecuado
				if (admitirErronea) {
					jq321(imagen).find(".draggable").attr("data",dataArrastrable).text(textoArrastrable).attr("data-respuesta",dataRespuestaArrastrable).addClass(quitarAcentos(dataRespuestaArrastrable)); 
					numQuedan--;
					arrastrable.attr('data-quedan',numQuedan);// '+quitarAcentos(arrastrableRespuesta)+'"
					imagen.addClass('ocupado');
				} else {
					if (comparaRespuesta(dataRespuestaReceptor, dataRespuestaArrastrable)) {
						jq321(imagen).find(".draggable").attr("data",dataArrastrable).text(textoArrastrable).attr("data-respuesta",dataRespuestaArrastrable).addClass(quitarAcentos(dataRespuestaArrastrable)); 
						numQuedan--;
						arrastrable.attr('data-quedan',numQuedan);
						imagen.addClass('ocupado');				
					}
				}

				if (numQuedan<1) {
					arrastrable.css("display", "none");   // si no los deshabilito pueden seguirse arrastrando...
					arrastrable.parent().css("display", "none");	
				}
			}
		}
	}//end if (jq321(imagen).hasClass("clonado"))
} 

function yaUsada(tPregunta,tTexto){ //Para verficiar que si la respuestas ya está en alguna casilla de la pregunta...
	//alert (tPregunta);
	//var tRespuesta= jq321 ('.c' + tPregunta+' object');
	var respuestaYaUsada= jq321 ('.c' + tPregunta+' object'+':contains('+tTexto+')');	//:contains('Hola')
	if (respuestaYaUsada.length>0) {
		return true;
	} else{
		return false;
	}
}

function revisar() {
	var ocupados = jq321(".ocupado");
	var casillasPregunta = jq321(".droppable");	
//	if (ocupados.length != casillasRespuesta) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
	if (ocupados.length != casillasPregunta.length) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
		mostrarMensaje(2, 1);
		jq321(".droppable:not(.ocupado)").addClass("avisaFaltante");
	}
	else {
		jq321(".droppable").removeClass("avisaFaltante");
		calificar();
		revisaBuenas();
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
	jq321.each(listaContestadas,function (indice){ 
		//alert (jq321(this).attr("data-resp"));
		//var respReal = jq321(this).attr("data-drop");
		
		var respStringDrop = jq321(this).attr("data-resp");
		var idDrop = jq321(this).attr("id");
		var respStringColocada = jq321(this).find(".clonado").attr("data-respuesta");	
		//jq321(this).find(".draggable").draggable('disable'); //y deshabilito para que no pueda permutar respuestas...
	//	jq321(this).droppable('disable');	// deshabilitando el droppable basta... por ahora....
	jq321(this).find(".draggable").draggable('disable'); 
	//	if (respStringDrop == respStringColocada) { // OJO con la funcion regex!!! y aunque no esta aqui hay que estudiarla....	
		if (comparaRespuesta(respStringDrop, respStringColocada)) {
			//alert ("Correcta");
			jq321(this).addClass("correcto");
			if (mostrarRetroArroba && calificaPregunta==false) { 
				jq321('#'+idDrop).find('.palomita').removeClass("ocultar").addClass("mostrar") 
			}
	
		}
		else {
			jq321(this).addClass("incorrecto");
		//	if (calificaPregunta==false) {jq321(this).find("img.palomita").css("display", "inline");}
			if (mostrarRetroArroba && calificaPregunta==false) { 
				jq321('#'+idDrop).find('.tache').removeClass("ocultar").addClass("mostrar") 
			}

		}
	});
	var listadoPreguntas = jq321(".lista-preguntas .sub-item");
	var preguntasCorrectas = 0; // Para contar por cada pregunta correcta
	var casillasCorrectas = 0;  // Cuenta todas las casillas correctas
	correctas = 0;
	console.log (listadoPreguntas);
	jq321.each(listadoPreguntas, function(indice){
	   var tempPregunta = jq321(this).attr("id");
	   var sTemp = ".c"+tempPregunta; //el ID es casi igual a la clase, por eso lo uso para identificar la clase de las casillas
	   var tempCasilla =   jq321 (sTemp);
	   var temCCorrecta = sTemp+'.correcto'; //busco los objetos que tengan las DOS clases....
	   var tempCorrecta = jq321(temCCorrecta);
	  // var rTextoBien = jq321(this).children (".retroBien").text();
	 //  var rTextoMal = jq321(this).children (".retroMal").text();
	   if (tempCasilla.length == tempCorrecta.length) {
		   preguntasCorrectas++;
			casillasCorrectas += tempCorrecta.length;
		   if (mostrarRetroIndividual) { 
			   if (calificaPregunta) {
				   jq321(this).find (".palomitaReactivo").removeClass("ocultar").addClass("mostrar");
			   }
			}
	   }
	   else {
		   if (mostrarRetroIndividual) { 
			   if (calificaPregunta) {
				jq321(this).find (".tacheReactivo").removeClass("ocultar").addClass("mostrar");
				}			   
			}
			casillasCorrectas += (calificaPregunta===true? 0: tempCorrecta.length);
	   }
	});
	if (calificaPregunta) {
		correctas = preguntasCorrectas;
	} else {
		correctas = casillasCorrectas;
	}
	
	intentos++;
}

function revisaBuenas() {
	var res = Math.floor(10 * correctas/totalPreguntas);
	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? "right answer" : "right answers";
			// mostrarEval((esMobil?"":"info"), "Result", "You have gotten " + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			mostrarEval("", "", "You have gotten " + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			break;
		default:
			var txtResp = (correctas == 1) ? "respuesta correcta " : "respuestas correctas ";
			// mostrarEval((esMobil?"":"info"), "Resultado", "Obtuviste " + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			mostrarEval("", "", "Obtuviste " + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
	}
	console.log("evaluacion " + correctas + " " + txtResp + " :--: " + totalPreguntas);
	guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
}

function reiniciar() {  //se invoca en el boton Next Atempt, quito taches y activo casillas de respuesta....
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {

		var cuentaCorrectas=0;
		if (calificaPregunta == true) {
			cuentaCorrectas = reactivosMostrar;
		} else {
			cuentaCorrectas = jq321(".droppable").length;
		}		
		if ((correctas != cuentaCorrectas) || siguienteIntentoBlanco) {
			jq321(".respuestas").css("display", "block"); //RAAR Feb 20,19: Revisar, doble ocultamiento contra renglon 452 jq321.each(respInc, function(indice) {
			if (formatoColumnas) {
				jq321("#reactivo").removeClass("col-md-12 col-lg-12 col-sm-12 col-xs-12").addClass("col-md-9 col-lg-9");
				jq321("#respuesta").addClass("col-md-3 col-lg-3");
	/*			if (!(esTexto)) {
					jq321("#reactivo").addClass("col-sm-9 col-xs-9");
					jq321("#respuesta").addClass("col-sm-3 col-xs-3");
				}*/
			}
		}

		//jq321('.ocupado.incorrecto').droppable('enable');	
		var listadoPreguntas = jq321(".lista-preguntas .sub-item");
	//	var respMal = [];	
		jq321.each(listadoPreguntas, function(indice) { //Recorro cada reactivo....
			//jq321(this).find(".mostrarRetro").removeClass("mostrarRetro").addClass("ocultarRetro");
	/*		jq321(this).find(".tache").css("display", "none");
			jq321(this).find(".tacheReactivo").css("display", "none");
			jq321(this).find(".palomita").css("display", "none");
			jq321(this).find(".palomitaReactivo").css("display", "none");	*/
			jq321('.tache').removeClass("mostrar").addClass("ocultar");
			jq321('.tacheReactivo').removeClass("mostrar").addClass("ocultar");
			jq321('.palomita').removeClass("mostrar").addClass("ocultar");
			jq321('.palomitaReactivo').removeClass("mostrar").addClass("ocultar");

			var incorrecto = jq321(this).find(".incorrecto");
			var correcto = jq321(this).find(".correcto");
			jq321(incorrecto).removeClass("incorrecto ocupado");
		//	jq321(incorrecto).css("height", "34px");
		//	jq321(incorrecto).find(".draggable").empty(); // limpio el draggable anidado
			var dataRespuestaTemp = '';
			dataRespuestaTemp = jq321(incorrecto).find(".draggable").attr("data-respuesta");
			dataRespuestaTemp = dataRespuestaTemp === undefined ? '':dataRespuestaTemp; // valido por que truena.. en el quitarAcentos
			jq321(incorrecto).find(".draggable").attr("data","img/blanco.png").attr("data-respuesta",'').text('').removeClass(quitarAcentos(dataRespuestaTemp)); //.addClass(quitarAcentos(dataRespuestaArrastrable))


			if (siguienteIntentoBlanco) {
				var dataRespuestaTemp2 = '';
				dataRespuestaTemp2 = jq321(incorrecto).find(".draggable").attr("data-respuesta");
				dataRespuestaTemp2 = dataRespuestaTemp2 === undefined ? '':dataRespuestaTemp2; // valido por que truena.. en el quitarAcentos
				jq321(correcto).find(".draggable").attr("data","img/blanco.png").attr("data-respuesta",'').text('').removeClass(quitarAcentos(dataRespuestaTemp2)); //.addClass(quitarAcentos(dataRespuestaArrastrable))
	

				jq321(this).find(".palomita").css("display", "none");		
			//	var correcto = jq321(this).find(".correcto");
				jq321(correcto).removeClass("correcto ocupado");
			//	jq321(correcto).empty();
				jq321(correcto).css("height", "34px");	// en el segundo intento eso ajusta las casillas al tamanio correcto			
			} else {
				//jq321(correcto).droppable('disable');			
				//jq321(correcto).find(".draggable").draggable('disable');	
			}
												  
		});
		var respInc = jq321(".lista-respuestas .sub-item object"); // eso se pude reducir poniendo una clase RESPUESTA en el object..., s
		jq321.each(respInc, function(indice) { 
			var numQuedan = jq321(this).attr('data-quedanInicial'); // Al debuggear Inicial aparece con minuscula inicial, ojo con esto....
			jq321(this).attr('data-quedan',numQuedan); //RAAR Ago 3,18: reinicio el contador de uso de las casillas respuesta....											
			jq321(this).attr("style", "position: relative;").css("display", "");
			jq321(this).parent().css("display", "");
		});
	}
	else {
		mostrarMensaje(1);
	}
	//contestadas = correctas; RAAR Jun 13, 18: no se usa....
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

function versionBrowser(){
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = '' + parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;
	var minorVersion, nameOffset, verOffset, ix, cad1, cad2;
	
//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) OPiOS/14.0.0.104835 Mobile/13G36 Safari/9537.53";  //OPERA
//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) FxiOS/8.1.1b4948 Mobile/13G36 Safari/601.1.46";  //Firefox
//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) CriOS/60.0.3112.89 Mobile/13G36 Safari/601.1.46";  //Chrome
//	
//	platform = "iPad";
	if (platform == "iPad"){
		// firefox - FxiOS substring de userAgent FxiOS/8.1.1b4948
		// chrome  - CriOS substring de userAgent CriOS/60.0.3112.89
		// opera   - OPiOS substring de userAgent OPiOS/14.0.0.104835
		cad1 = nAgt.substring(nAgt.lastIndexOf("iOS") - 2);
		cad2 = cad1.split(" ");
		browserName = cad2[0].substring(0, cad2[0].lastIndexOf("/"));
		if (browserName == "CriOS") {browserName = "Chrome"};
		if (browserName == "FxiOS") {browserName = "Firefox"};
		if (browserName == "OPiOS") {browserName = "Opera"};
		fullVersion = cad2[0].substring(cad2[0].lastIndexOf("/") + 1);
	}
	else {
		cad1 = nAgt.substring(nAgt.lastIndexOf(" ") + 1);
		// Edge, Firefox, Opera
		if (((cad1.indexOf("Edge")) != -1) || ((cad1.indexOf("Firefox")) != -1) || ((cad1.indexOf("OPR")) != -1)){
			browserName = cad1.substring(0, cad1.indexOf("/"));
			if(browserName == "OPR") browserName = "Opera";
			fullVersion = cad1.substring(cad1.indexOf("/") + 1);
		}
		else{
			// Safari
			cad2 = nAgt.substring(nAgt.indexOf("Version"));
			if(((cad2.indexOf("Version")) != -1)){
				browserName = cad2.substring(cad2.lastIndexOf(" ") + 1, cad2.lastIndexOf("/"));
				fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
			}
			else{
				// Chrome
				cad2 = nAgt.substring(nAgt.indexOf("Chrome"));
				if(((cad2.indexOf("Chrome")) != -1)){
					browserName = cad2.substring(cad2.indexOf("Chrome"), cad2.indexOf("/"));
					fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
				}
				else{
					// Internet Explorer
					browserName = "Internet Explorer";
					fullVersion = cad2.substring(cad2.indexOf("rv") + 3, cad2.lastIndexOf(")"));
				}
			}
		}
		
		majorVersion = parseInt('' + fullVersion, 10);
		minorVersion = fullVersion.substring(fullVersion.indexOf(".") + 1);
		if (isNaN(majorVersion)) {
			fullVersion  = '' + parseFloat(navigator.appVersion); 
			majorVersion = parseInt(navigator.appVersion, 10);
			minorVersion = "";
		}
	}

//	document.write(''
//	 + '<p align="left">'
//	 + browserName + '&nbsp' + fullVersion
////	 + '<b>Browser name</b>  = ' + browserName + '<br>'
////	 + '<b>Full version</b>  = ' + fullVersion + '<br>'
////	 + '<b>Major version</b> = ' + majorVersion + '<br>'
////	 + '<b>Minor version</b> = ' + minorVersion + '<br>'
////	 + '<b>navigator.appVersion</b> = ' + nVer + '<br>'
////	 + '<b>navigator.userAgent</b> = ' + nAgt + '<br>'
////	 + '<b>Ultima cadena en userAgent</b> = ' + cad1 + '<br>'
////	 + '<b>navigator.appName</b> = ' + navigator.appName + '<br>'
//	)
//	var OSName = "Unknown OS";
//	if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
//	if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
//	if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
//	if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
//	
////	document.write('<b>OS:</b> ' + OSName + '<br>');
////	document.write('<b>Platform:</b> ' + platform + '</p>');
////document.title = browserName + ' ' + fullVersion;
//	 + '</p><br>';
	var objSalida = {name: browserName, version: fullVersion};
	return objSalida;
}