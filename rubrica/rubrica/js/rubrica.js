	jq341(document).ready(function() {
		// creaIndice();
		// if (mezclarPreguntas) {reordenaArreglo(reactivos)};
		creaRubrica(reactivosMostrar);
		limpiaRadiosVF();
		jq341("button#btnRevisar").show();
		jq341("button#btnReiniciar").hide();
		iniciaAmbienteScorm  (ambSCORM, barraSCORM, idObjetivo);
	});

//  ============================================================================================================
function limpiaRadiosVF(){ /*Aqui se alteran titulos */
	jq341("input:radio").attr("checked", false);
	switch (idioma) {
		case "ENG":
			jq341("#btnRevisar").text("Check");
			jq341("#btnReiniciar").text("Restart");
			jq341("th#tV").text("True");
			jq341("th#tF").text("False");
			break;
		default:
			jq341("#btnRevisar").text("Revisar");
			jq341("#btnReiniciar").text("Reiniciar");
			jq341("th#tV").text("Verdadero");
			jq341("th#tF").text("Falso");
	}
}

function revisarRubrica(){ //se invoca con el boton "Revisar"
	jq341("div.grupo").each(function() {
		jq341(this).parent().parent().removeClass("vacio");
		if (jq341(this).children("label.active").length == 0) {
			jq341(this).parent().parent().addClass("vacio");
		}
	});
	if (jq341("div.grupo").parent().parent().hasClass("vacio") ) {
		mostrarMensaje(2, 3);
		return
	}
	jq341("input[type='radio']").parent().parent().prop('disabled',true);
	var suma = 0.0;
	jq341("label.active").each(function() {
		var valor = parseFloat(jq341(this).children("input").val());
		suma += valor;
	});
	suma = Math.round(suma*100)/100;
	
	jq341("button#btnRevisar").hide();
	jq341("button#btnReiniciar").show();
	console.log("evaluacion con " + Math.floor(suma));
	guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, suma, suma);
	switch (idioma) {
		case "ENG":
			var txtResp = (suma == 1) ? "point" : "points";
			mostrarEval(ic(""), ic(""), "You have gotten " + suma + " " + txtResp + ".<br/><br/>" + asignarEvaluacion(suma));
			break;
		default:
			var txtResp = (suma == 1) ? "punto" : "puntos";
			mostrarEval(ic(""), ic(""), "Obtuviste " + suma + " " + txtResp + ".<br/><br/>" + asignarEvaluacion(suma));
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
	 window.location.reload();
		// cuentaIntentos++;
		// if (cuentaIntentos < maxIntentos) {
		// 	jq341(".cRbutton").attr("disabled", false);
		// 	jq341(":checked").prop('checked', false);
		// 	jq341("img.tache").css("display", "none");
		// 	jq341("img.palomita").css("display", "none");   
		// 	jq341("button#btnRevisar").show();
		// 	jq341("button#btnReiniciar").hide();
		// 	jq341(".retroMal").removeClass("mostrarRetro").addClass("ocultarRetro");
		// 	jq341(".retroBien").removeClass("mostrarRetro").addClass("ocultarRetro");
		// 	correctas = 0;
		// } else {
		// 	switch (idioma) {
		// 		case "ENG":
		// 			mostrarEval("info", "Information", "You have reached maximum number of attempts: " + maxIntentos);
		// 			break;
		// 		default:
		// 			mostrarEval("info", "Información", "Has alcanzado el número máximo de intentos: " + maxIntentos);
		// 	}
		// }
}

/*function reiniciar () {
//	window.location.reload();
	cuentaIntentos++;
	if (cuentaIntentos<maxIntentos) {
			txtMarcado = "input[type:'radio']";
	//jq341(".cRbutton").attr("disabled", "false");	RAAR Jun 19,18:		 por que no funciona?
		jq341(":checked").prop('checked', false);
		jq341("img.tache").css("display", "none");
		jq341("img.palomita").css("display", "none");	
		jq341("button#btnRevisar").show();
		jq341("button#btnReiniciar").hide();
	
		correctas = 0;
	} else {
		mostrarEval(ic("ofni"), ic("nóicamrofnI"), "Has alcanzado el número máximo de intentos" );
	}
}*/