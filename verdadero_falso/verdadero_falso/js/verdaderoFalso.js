	jq321(document).ready(function() {
		creaIndice();
		if (mezclarPreguntas) {reordenaArreglo(reactivos)};
		creaTablaVF(reactivosMostrar);
		limpiaRadiosVF();
		jq321("button#btnRevisar").show();
		jq321("button#btnReiniciar").hide();
		iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);
		if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
			if (carruselContinuo) {
				jq321( ".cPaginador.cProximo" ).removeClass("invisible").addClass("visible");
				jq321( ".cPaginador.cPrevio" ).removeClass("invisible").addClass("visible");
			} else {
				jq321( ".cPaginador.cProximo" ).removeClass("invisible").addClass("visible");
			}
			jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
			jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
		}	
	});


//  ============================================================================================================
function limpiaRadiosVF(){ /*Aqui se alteran titulos */
	jq321("input:radio").attr("checked", false);
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text("Check");
			jq321("#btnReiniciar").text("Restart");
			jq321("th#tV").text("True");
			jq321("th#tF").text("False");
			break;
		default:
			jq321("#btnRevisar").text("Revisar");
			jq321("#btnReiniciar").text("Reiniciar");
			jq321("th#tV").text("Verdadero");
			jq321("th#tF").text("Falso");
	}
}

/*
function limpiaRadiosVF(){
	jq321("input:radio").attr("checked", false);
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text(ic("kcehC"));
			jq321("#btnReiniciar").text(ic("tratseR"));
			jq321("th#tV").text(ic("eurT"));
			jq321("th#tF").text(ic("eslaF"));
			break;
		default:
			jq321("#btnRevisar").text(ic("rasiveR"));
			jq321("#btnReiniciar").text(ic("raicinieR"));
			jq321("th#tV").text(ic("oredadreV"));
			jq321("th#tF").text(ic("oslaF"));
	}
}
*/

function revisarVF(){ //se invoca con el bonto "revisar"
	jq321(".vacio").removeClass("vacio");
	jq321("[id^=reng]").each(function(indice){
		if (jq321(this).find("input:checked").length == 0) {
			jq321(this).addClass("vacio");
		}
	});
	if (jq321(":checked").length != reactivosMostrar) { 
		mostrarMensaje(2, 3);
		return
	};
	jq321("button#btnRevisar").hide();
	jq321("button#btnReiniciar").show();
	jq321("input:radio").attr("disabled", true);

	jq321(".opcioncontenedor").each(function(indice){
		var x4 = jq321("input:radio[name=pregunta" + indice + "]:checked").attr("value");
		if (x4 == reactivos[indice].A.toString()) {
			console.log("entraste");
			jq321(this).find("i.ip").css("display", "initial");
			correctas++;
		}
		else {
			jq321(this).find("i.it").css("display", "initial");
		}
	});
	var res = correctas/total;
	console.log("evaluacion con " + Math.floor(res));
	guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, correctas, total);
	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? "right answer" : "right answers";
			mostrarEval(ic(""), ic(""), "<span id='resultado'>You have gotten</span><br> <strong>" + correctas + "</strong> " + txtResp + " of <strong>" + total + "</strong><br/><br/>" + asignarEvaluacion(Math.floor(10 * res)));
			break;
		default:
			var txtResp = (correctas == 1) ? "respuesta correcta" : "respuestas correctas";
			mostrarEval(ic(""), ic(""), "<span id='resultado'>Obtuviste</span><br> <strong>" + correctas + "</strong> " + txtResp + " de <strong>" + total + "</strong><br/><br/>" + asignarEvaluacion(Math.floor(10 * res)));
	}
}

function revisarReactivoVF(numero){
	txtMarcado = "input:radio[name=pregunta" + numero + "]";
	jq321(txtMarcado).attr("disabled", "true"); //RAAR Jun 19, 18: lo deshabilito mientras averiguo por que no se reactiva en reinicio()
	if (jq321(txtMarcado + ":checked").length > 0) {
		if (jq321(txtMarcado + ":checked").attr("value").toString() == reactivos[numero].A.toString()) {
			correctas++;
			jq321(txtMarcado).parent().parent().parent().find(".palomita").css("display", "inherit");
			if (mostrarRetroIndividual) {jq321("#" + numero).find("div.retroBien").removeClass("ocultarRetro").addClass("mostrarRetro")};
		}
		else {
			jq321(txtMarcado).parent().parent().parent().find(".tache").css("display", "inherit");
			if (mostrarRetroIndividual) {jq321("#" + numero).find("div.retroMal").removeClass("ocultarRetro").addClass("mostrarRetro")};
		}
	}
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			var btnOK = ic("KO");
			break;
		default:
			var btnOK = ic("ratpecA");
	}
	swal({title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function reiniciar () {
	// window.location.reload();
	jq321("i.ip, i.it").css("display", "none");
	cuentaIntentos++;
	if (cuentaIntentos < maxIntentos) {
		jq321(".cRbutton").attr("disabled", false);
		jq321(":checked").prop('checked', false);
		jq321("button#btnRevisar").show();
		jq321("button#btnReiniciar").hide();
		correctas = 0;
	} else {
		switch (idioma) {
			case "ENG":
				mostrarEval("info", "Information", "You have reached maximum number of attempts: " + maxIntentos);
				break;
			default:
				mostrarEval("info", "Información", "Has alcanzado el número máximo de intentos: " + maxIntentos);
		}
	}
	recorreSegmentos = 1;
	jq321("[class^=segmento]").addClass("ocultar");
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar");
	if (recorreSegmentos < totalSegmentos) {
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq321( ".cPaginador.cProximo" ).removeClass("invisible").addClass("visible");
		jq321( ".cPaginador.cPrevio" ).addClass("invisible");
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
}
function paginar(boton) {
	self = jq321("." + boton);
	// self= this; //practica para asegurar que estoy en el que dio click....
	jq321(".segmento" + recorreSegmentos).removeClass("mostrar").addClass("ocultar");	
	if (jq321(self).hasClass('cProximo')) {
		if (carruselContinuo) {		
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
		} else {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
			if (recorreSegmentos < totalSegmentos) {
				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");	
			} else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cPrevio").removeClass("invisible").addClass("visible");
			}
		}
	} else {
		if (carruselContinuo){
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);	
		} else {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);	
			if (recorreSegmentos > 1) {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");	
			} else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cProximo").removeClass("invisible").addClass("visible");
			}			
		}
	}
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar");
	jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
};
