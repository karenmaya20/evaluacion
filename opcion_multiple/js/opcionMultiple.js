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
//	if (calificaPregunta) { // RAAR oct 14,18: para despues...al desarrollar para AGN el recurso scormu2_act1 se observa...
							// reactivosMostrar funciona con calificaPregunta=true pero si hay preguntas dummy?, por que se necesita que se pueda forzar las preguntas a cierta cantidad...
							// esto implica que no todas las preguntas cuentan para calificacion, esto no tiene problema si solo hay una arroba-casilla por pregunta, pero si es mas de una...no funciona
		totalPreguntas = reactivosMostrar;
//	} else {
//		totalPreguntas = jq321(".droppable").length;
//	}
	detectaSeleccion();
//	conectividadSCORM.iniciaAmbienteScorm(ambSCORM,barraSCORM,idObjetivo);
	if (ambSCORM) {		
		if (parent.conectividadSCORM === undefined) { //Inicio carga SCORM
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
		} // if (parent.conectividadSCORM Fin carga SCORM		
	} //if (ambSCORM) 
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

function detectaSeleccion() { // esto es por que es derivado de un completar arrastrando...

	jq321("input.casillaRespuesta").click(function () {
		self = this; //practica para asegurar que estoy en el que dio click....
		var reactivo = jq321(self).attr("data-reactivo");
		var idCasilla = jq321(self).attr("id");
		var leeResp = jq321(self).attr("data-es-respuesta");
		var esRespuesta = (leeResp == "true" ? true : false);
		jq321("#" + reactivo).removeClass("correcta").removeClass("incorrecta");
		var tSearch = '[data-reactivo="' + reactivo + '"]';  //para deshabilitar las opciones de una pregunta...
		jq321(tSearch).removeClass("elegidaCorrecta").removeClass("elegida").removeClass("correcta").removeClass("incorrecta");
		jq321(self).addClass("elegida");
		if (esRespuesta) { //correcta
			//jq321(self).parent().find(".ip").removeClass("ocultar").addClass("mostrar");
		/*	jq321("." + idCasilla).find(".ip").removeClass("ocultar").addClass("mostrar");
			jq321("." + reactivo).find(".ip").removeClass("ocultar").addClass("mostrar");*/
			
			jq321("#" + reactivo).addClass("correcta");
			if (calificarEnTiempoReal) {
				jq321("." + idCasilla).find(".ip").removeClass("ocultar").addClass("mostrar");
				jq321("." + reactivo).find(".ip").removeClass("ocultar").addClass("mostrar");
				jq321(".casillaRespuesta"+"." + reactivo).prop("disabled", true);
			}

		} else { //incorrecta
/*			jq321("." + idCasilla).parent().find(".it").removeClass("ocultar").addClass("mostrar");
			jq321("." + reactivo).find(".it").removeClass("ocultar").addClass("mostrar");*/

			jq321("#" + reactivo).addClass("incorrecta");
			if (calificarEnTiempoReal) {
				jq321("." + idCasilla).parent().find(".it").removeClass("ocultar").addClass("mostrar");
				jq321("." + reactivo).find(".it").removeClass("ocultar").addClass("mostrar");
				jq321(".casillaRespuesta"+"." + reactivo).prop("disabled", true);
			}

		}
		jq321("#" + reactivo).removeClass("incontestada").addClass("contestada");

	//	var tSearch = '[data-reactivo="' + reactivo + '"]';  //para deshabilitar las opciones de una pregunta...
	//	jq321(tSearch).prop("disabled", true);
	//	jq321(tSearch).css("background-color", "yellow");

		console.log(reactivo);
		console.log(esRespuesta);

	});		
		
//	}

	jq321( ".cPaginador" ).mouseover(function() {													  


	});	
	jq321( ".cPaginador" ).click(function() {

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

	

	


}



function revisar() {
	var ocupados = jq321(".contestada").length;
	var casillasPregunta = totalPreguntas;	
	jq321(".avisaFaltante").removeClass("avisaFaltante");	// Aqui por que si hay dos faltantes en un página quita la que ya se eligió....
//	if (ocupados.length != casillasRespuesta) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
	if (ocupados != casillasPregunta) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta....
		mostrarMensaje(2, 3);
	//	jq321(".droppable:not(.ocupado)").addClass("avisaFaltante");
		jq321(".incontestada").addClass("avisaFaltante");
	}
	else {
	//	jq321(".avisaFaltante").removeClass("avisaFaltante");		
		calificar();
		revisaBuenas();
	}
}

/*function comparaRespuesta (recibeDrop, recibeColocada) {  // Esta funcion es por que hay puede haber multiples respuestas validas....
	var respStringDrop = "|" + quitarAcentos(recibeDrop) +"|";
	var respStringColocada = "|" + quitarAcentos(recibeColocada)+"|";	

	if (respStringDrop.indexOf(respStringColocada)!=-1) {
		return true; // si existe la respuesta
		} else {
			return false;  
		}
}*/

function calificar(){	

	jq321('#btnRevisar').hide();
	jq321('#btnReiniciar').show();
	var listaContestadas = jq321 ("input.casillaRespuesta.elegida"); 
	jq321.each(listaContestadas,function (indice){ 
		self = this; //practica para asegurar que estoy en el que dio click....
		var reactivo = jq321(self).attr("data-reactivo");
		var idCasilla = jq321(self).attr("id");
		var leeResp = jq321(self).attr("data-es-respuesta");
		var esRespuesta = (leeResp == "true" ? true : false);
		if (esRespuesta) { //correcta
			//jq321(self).parent().find(".ip").removeClass("ocultar").addClass("mostrar");
			
			jq321("." + idCasilla).find(".ip").removeClass("ocultar").addClass("mostrar");
			jq321("." + reactivo).find(".ip").removeClass("ocultar").addClass("mostrar");
		//	jq321(self).addClass("elegida");
		//	jq321("#" + reactivo).addClass("correcta");
		} else { //incorrecta

			jq321("." + idCasilla).parent().find(".it").removeClass("ocultar").addClass("mostrar");
			jq321("." + reactivo).find(".it").removeClass("ocultar").addClass("mostrar");
		//	jq321(self).addClass("elegida");
		//	jq321("#" + reactivo).addClass("incorrecta");
			

		}
		//jq321("#" + reactivo).removeClass("incontestada").addClass("contestada");
		//q321('[data-listaResp*="|'+respuestas[i].txt+'|"]');		
	/*	var tSearch = '[data-reactivo="' + reactivo + '"]';
		jq321(tSearch).prop("disabled", true);*/
	//	jq321(tSearch).css("background-color", "yellow");

		console.log(reactivo);
		console.log(esRespuesta);

	});	
	jq321("input.casillaRespuesta").prop("disabled", true);

	
	intentos++;
}

function revisaBuenas() {
	correctas = jq321(".correcta").length;
	var res = Math.floor(10 * correctas/totalPreguntas);
	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? "right answer" : "right answers";
			mostrarEval((esMobil?"":"info"), "Result", "You have gotten " + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(correctas));
			break;
		default:
			var txtResp = (correctas == 1) ? "respuesta correcta " : "respuestas correctas ";
			mostrarEval((esMobil?"":"info"), "Resultado", "Obtuviste " + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(correctas));
	}
	console.log("evaluacion " + correctas + " " + txtResp + " :--: " + totalPreguntas);
	if (ambSCORM) {
		if (barraSCORM){ //RAAR Mar 31,18: si la barra esta prendinda entonces la califiacion se gurda en objetives por que se va a generar una calificación compesta que se guarda en cmi.core
			console.log("Inicia scorm objetives");
			//califica SCORM
			if (parent.conectividadSCORM === undefined) {
				console.log("Actividad en documento, es con try");
				try {
					conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0);   // envia los datos a la base de datos			
					conectividadSCORM.finalizarObjetivo(idObjetivo); //para ponerle passed..
				//	conectividadSCORM.desconectarConCalificacion(buenas, total); //esta se usa en el recurso viejo, no uso esta por que hay rutinas de salvado abajo...
					conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
					if (barraSCORM) {conectividadSCORM.actualizarBarra()}	                         // actualiza al nuevo estatus la barra de avance
					conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
					conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
				} catch(e){
				console.warn("Error al calificar en conectividadSCORM");
				}
			}
			else {
				console.log("Actividad en frame, es con parent");
				parent.conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0); // envia los datos a la base de datos
				parent.conectividadSCORM.finalizarObjetivo(idObjetivo); //para ponerle passed..
				//parent.conectividadSCORM.desconectarConCalificacion(buenas, total); //esta se usa en el recurso viejo, no uso esta por que hay rutinas de salvado abajo...
				//parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	                              // finaliza la actividad en estatus passed
				parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
				if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
				parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
				parent.conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
			}		
			//fin califica SCORM
			console.log("Fin scorm objetives");
		} else { //si el recurso es autocalificable
			console.log("Inicia scorm cmi.core");
			//califica SCORM
			if (parent.conectividadSCORM === undefined) {
				console.log("Actividad en documento, es con try");
				try {
					conectividadSCORM.calificar(correctas,totalPreguntas); //RAAR Oct 10,18: Esta y la linea anterior salvan a diferentes rutas...debe ser uno u otra..
					//conectividadSCORM.finalizarObjetivo(idObjetivo); // esto no creo que vaya
					//conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
					//if (barraSCORM) {conectividadSCORM.actualizarBarra()}	                         // actualiza al nuevo estatus la barra de avance
					//conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
					conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
				} catch(e){
				console.warn("Error al calificar en conectividadSCORM");
				}
			}
			else {
				console.log("Actividad en frame, es con parent");
				parent.conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0); // envia los datos a la base de datos
				//parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	  // esto no creo que vaya
				//parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
				//if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
				//parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
				parent.conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
			}		
			//fin califica SCORM
			console.log("Fin scorm cmi.core");
		}
	} //if (ambSCORM) 
}

function reiniciar() {  //se invoca en el boton Next Atempt, quito taches y activo casillas de respuesta....
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
		//jq321(".incorrecta").find(".it").removeClass("mostrar").addClass("ocultar");
		//var idCasilla = jq321(".incorrecta").attr("id");
	//	jq321("."+idCasilla).find(".it").removeClass("mostrar").addClass("ocultar");
	jq321(".it.mostrar").removeClass("mostrar").addClass("ocultar");
	jq321(".ip.mostrar").removeClass("mostrar").addClass("ocultar");
	var listadoIncorrectas = jq321(".incorrecta");
	jq321.each(listadoIncorrectas, function(indice) {
		var idIncorrecta = jq321(this).attr("id");
		jq321("."+idIncorrecta).prop("disabled", false);
	});
	var listadoCorrectas = jq321(".pregunta.correcta");
	jq321.each(listadoCorrectas, function(indice) {
		var idCorrecta = jq321(this).attr("id");
		jq321("."+idCorrecta+".elegida").addClass("opcionCorrecta");
	});

	jq321(".incorrecta").find(".casillaRespuesta").removeClass("elegida")
	jq321(".incorrecta").removeClass("contestada").addClass("incontestada").removeClass("incorrecta");
	
	
		

	} else {  //if (intentos < maxIntentos)
		mostrarMensaje(1);
	} //if (intentos < maxIntentos)
	
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