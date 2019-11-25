/* NOTAS
	-LPFR Agosto 27, 2019 se agregan tooltips de retro
	-LPFR Agosto 27, 2019 se agrega version de info movil
   -LPFR Agosto 27, 2019 se genera el recurso dual para movil
*/
var incentivo=0;
var idObjetivo = 0;

function iniciar() {
//verifica si es movil o no para partir en la creacion de alguna de las dos
	if(esMobil){
		creaesquema();
	}else{
		creaArrastrar();

	}

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
	
	if(esMobil){}
	else{

		if (elementosPorSegmento<reactivosMostrar) { // los botones de paginas...
			jq321( ".cPaginador" ).removeClass("ocultar").addClass("mostrar");
		}	
	//	var temp = jq321(".reactivos .lista-preguntas span").length; //?
		 //jq321(".reactivos .lista-preguntas span").length; no se porque estaba asi.....
		if (calificaPregunta) {
			totalPreguntas = reactivosMostrar;
		} else {
			totalPreguntas = jq321(".droppable").length;
		}
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
			if (seleccionRapida) { 
				//  alert( "Handler for .dblclick() called." );
				//  jq321('.droppable:empty:first').trigger('drop', jq321( ".draggable:first" ));// no furula
				agregaResp(jq321('.mostrar .droppable:not(.ocupado):first'), jq321(this)); // orale...jala...
				limpiaRespuestas(); 
			}
		});

	}else{
		jq321( ".respuesta .draggable" ).mouseover(function() {													  
			if (seleccionRapida) { //.droppable:empty:first
			//	jq321( ".mostrar .droppable:not(.ocupado):first" ).css( "background-color", "PaleTurquoise" ); //RAAR Jun 19,18: Para que marque la primer casilla vacia
				jq321( ".mostrar .droppable:not(.ocupado):first" ).css( "border", "2px solid PaleTurquoise" ); // border: 1px solid #AAAAAA;
			}
		});	
		jq321( ".respuesta .draggable" ).mouseleave(function() {
			if (seleccionRapida) { 
				   //jq321( ".droppable" ).css( "background-color", "white" );
				   jq321( ".mostrar .droppable" ).css( "border", "1px solid #AAAAAA" ); // border: 1px solid #AAAAAA;
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
		recorreSegmentos = (recorreSegmentos<totalSegmentos? ++recorreSegmentos: 1);
		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
	//	alert('paginador cProximo'+this.innerText+ ' HTML '+self.innerHTML );
	} else {
		jq321(".segmento"+recorreSegmentos).removeClass("mostrar").addClass("ocultar");			
		recorreSegmentos = (recorreSegmentos>1? --recorreSegmentos: totalSegmentos);	
		jq321(".segmento"+recorreSegmentos).removeClass("ocultar").addClass("mostrar");
//		alert('paginador cPrevio'+this.innerText+ ' HTML '+self.innerHTML );		
	}
});

	

	
	jq321(".draggable").draggable({
	//	 hover: ,

		cursor: 'move', // no percibo que haga algo...
		revert: true, // para que se regrese el elemento a su lugar de origen si no se acepta
      stack: ".draggable"//poner z-index automático, para poner al frente al elemento que se esta moviendo..
		
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
	/*	if (formatoColumnas) { //Para reacomodar la pantalla al eliminar la columna de respuestas
			jq321("#reactivo").removeClass("col-md-9 col-lg-9 col-sm-9 col-xs-9").addClass("col-md-12 col-lg-12 col-sm-12 col-xs-12");
			jq321("#respuesta").removeClass("col-md-3 col-lg-3 col-sm-3 col-xs-3");
		}*/
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
 } else { // Si el arrastre es desde zona de respuestas...

	if (!(jq321(imagen).hasClass("ocupado"))) {
		if (admitirErronea) {
			jq321(".mostrar .droppable").removeClass("avisaFaltante").addClass("bordeDrop"); // pinta el borde adecuado

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
		//	arrastrable.parent().css("display", "none");	// RAAR Nov 20,18: Para que?? no parece afectar
		}
	}
 }//end if (jq321(imagen).hasClass("clonado"))
} 
//funcion para revisar cuando se trate de apartado movil
function revisatodo(){
	intentos++;

	//revisa si hay un concordancia entre el valor del select y el data respuesta
	jq321(".reactivos").find("select").each(function(ind2) {
		var respCorrecta = jq321(this).attr("data-respuesta");
		var respElegida = jq321(this).val();
		if(crm==0){
			console.log("entraste");
			
			var posi= respElegida.indexOf(String.fromCharCode(160));
			console.log(posi);
			var respElegida= respElegida.substring(0,posi);

		}
		console.log(respElegida);
		jq321(this).prop("disabled", true);
		if(respCorrecta.indexOf("|")>-1){
			var pos= respCorrecta.indexOf("|");
			var palabra1=respCorrecta.substring(0,pos);
			var palabra2=respCorrecta.substring(pos+1,respCorrecta.length);
console.log(palabra1+"d"+palabra2);
if (respElegida == palabra1 || respElegida == palabra2) {
		
	jq321(this).addClass("bien");

		jq321(this).nextAll("span").eq(0).find("i.ip").removeClass("ocultar").addClass("mostrar");
		incentivo++;
}
else {
	jq321(this).addClass("mal");

		jq321(this).nextAll("span").eq(1).find("i.it").removeClass("ocultar").addClass("mostrar");
	
}


		}else{

			if (respElegida == respCorrecta) {
		
				jq321(this).addClass("bien");
				incentivo++;
					jq321(this).nextAll("span").eq(0).find("i.ip").removeClass("ocultar").addClass("mostrar");
				
			}
			else {
				jq321(this).addClass("mal");
		
					jq321(this).nextAll("span").eq(1).find("i.it").removeClass("ocultar").addClass("mostrar");
				
			}
		}
	


	});
	totalPreguntas=reactivos[0].A.length;
correctas=incentivo;
	revisaBuenas();

	jq321('#btnRevisar').hide();
	jq321('#btnReiniciar').show();
incentivo=0;
	
}


function revisar() {

	if(esMobil==true){
		var vacio=0;
		jq321(".reactivos").find("select").each(function(ind2) {
			var respElegida = jq321(this).val();
			console.log(respElegida);
			if(respElegida=="------"){
				jq321(this).addClass("vacio");
				vacio=1;
			}else{
				jq321(this).removeClass("vacio");
			}
	
		});

		if(vacio==0){
			revisatodo();
		}else{
			mostrarMensaje(2, 5);
		}

	}else{


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
		
	//	if (respStringDrop == respStringColocada) { // OJO con la funcion regex!!! y aunque no esta aqui hay que estudiarla....	
		if (comparaRespuesta(respStringDrop, respStringColocada)) {
			//alert ("Correcta");
			jq321(this).addClass("correcto");
		var buena=document.getElementById(idDrop);
			console.log(buena.dataType);
			document.getElementById(idDrop).setAttribute('data-toggle','tooltip');
			document.getElementById(idDrop).setAttribute('data-type','success');
			document.getElementById(idDrop).setAttribute('data-placement','auto left');
			document.getElementById(idDrop).title="success";

			jq321(this).find(".palomita").css("display", "inherit");
				
			if (mostrarRetroArroba) { //RAAR Ago 16,18: El next es endeble, pero funciono....
				//var temp =jq321(this).next(".retroArroba.retroBien");
				//jq321(this).next(".retroArroba.retroBien").removeClass("ocultarRetro").addClass("mostrarRetro") 
				jq321('.'+idDrop+'.retroBien').removeClass("ocultarRetro").addClass("mostrarRetro") 				

			
			}
	
		}
		else {
			jq321(this).addClass("incorrecto");
			document.getElementById(idDrop).dataType="danger";
			jq321(this).find("img.tache").css("display", "inline");
			if (mostrarRetroArroba) { 
				//var temp =jq321(this).next(".retroArroba.retroBien").next(".retroArroba.retroMal");
				jq321('.'+idDrop+'.retroMal').removeClass("ocultarRetro").addClass("mostrarRetro") 
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
		   if (mostrarRetroIndividual) { jq321(this).children (".retroBien").removeClass("ocultarRetro").addClass("mostrarRetro") };
	   }
	   else {
		   if (mostrarRetroIndividual) { jq321(this).children (".retroMal").removeClass("ocultarRetro").addClass("mostrarRetro") };
			casillasCorrectas += (calificaPregunta===true? 0: tempCorrecta.length);
	   }
	});
	if (calificaPregunta) {
		correctas = preguntasCorrectas;
	} else {
		correctas = casillasCorrectas;
	}
	
	intentos++;
	if (intentos == maxIntentos) {
		jq321('#btnReiniciar').hide();
		mostrarMensaje(1); //has alcanzado el numero maximo de intentos...no se ve, lo encima la retro...
	}

}

function revisaBuenas() {
	var res = Math.floor(10 * correctas/totalPreguntas);
	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? "right answer" : "right answers";
			mostrarEval("", "You have gotten ", "" + correctas + " " + txtResp + " of " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
			break;
		default:
			var txtResp = (correctas == 1) ? "respuesta correcta " : "respuestas correctas ";
			mostrarEval("", "Obtuviste", "" + correctas + " " + txtResp + " de " + totalPreguntas + ".<br/><br/>" + asignarEvaluacion(res));
	}
	console.log("evaluacion " + correctas + " " + txtResp + " :--: " + totalPreguntas);
	if (ambSCORM) {
		console.log("Inicia scorm");
		//califica SCORM
		if (parent.conectividadSCORM === undefined) {
			console.log("Actividad en documento, es con try");
			try {
			//	conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0);   // envia los datos a la base de datos
			// conectividadSCORM.desconectarConCalificacion(buenas, total); esta se usa en el recurso viejo, no uso esta por que hay rutinas de salvado abajo...
				conectividadSCORM.calificar(correctas,totalPreguntas); //RAAR Oct 10,18: Esta y la linea anterior salvan a diferentes rutas...debe ser uno u otra..
				conectividadSCORM.finalizarObjetivo(idObjetivo);	                             // finaliza la actividad en estatus passed
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
			parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	                              // finaliza la actividad en estatus passed
			parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
			if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
			parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
			parent.conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
		}		
		//fin califica SCORM
		console.log("Fin scorm");
	}
}

function reiniciar() {  //se invoca en el boton Next Atempt, quito taches y activo casillas de respuesta....
	//reinicio para version movil
	if(esMobil){
		if (intentos < maxIntentos) {

		jq321(".reactivos").find("select").each(function(ind2) {
		//oculamos todas las respuestas erroneas 
		//damos por defento el valor -------
	var contieneclase=jq321(this).attr("class");
	console.log(contieneclase);
	if(contieneclase.indexOf("mal")>-1){

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
		
	}else{
		jq321('#btnRevisar').show();
		jq321('#btnReiniciar').hide();
		if (intentos < maxIntentos) {
			//if ((correctas != reactivosMostrar) || siguienteIntentoBlanco) {
			if ((correctas != jq321('.droppable').length) || siguienteIntentoBlanco) {
				jq321(".respuestas").css("display", "block");
				if (formatoColumnas) {
					jq321("#reactivo").removeClass("col-md-12 col-lg-12 col-sm-12 col-xs-12").addClass("col-md-9 col-lg-9");
					jq321("#respuesta").addClass("col-md-3 col-lg-3");
		/*			if (!(esTexto)) {
						jq321("#reactivo").addClass("col-sm-9 col-xs-9");
						jq321("#respuesta").addClass("col-sm-3 col-xs-3");
					}*/
				}
			}
	
			
			var listadoPreguntas = jq321(".lista-preguntas .sub-item");
		//	var respMal = [];	
			jq321.each(listadoPreguntas, function(indice) { //Recorro cada reactivo....
				//jq321(this).find(".mostrarRetro").removeClass("mostrarRetro").addClass("ocultarRetro");
				jq321(".mostrarRetro").removeClass("mostrarRetro").addClass("ocultarRetro");
				jq321(this).find(".tache").css("display", "none");		
				var incorrecto = jq321(this).find(".incorrecto");
				var correcto = jq321(this).find(".correcto");
				jq321(incorrecto).removeClass("incorrecto ocupado");
			//	jq321(incorrecto).css("height", "34px");
			//	jq321(incorrecto).find(".draggable").empty(); // limpio el draggable anidado
				var dataRespuestaTemp = '';
				dataRespuestaTemp = jq321(incorrecto).find(".draggable").attr("data-respuesta");
				dataRespuestaTemp = dataRespuestaTemp === undefined ? '':dataRespuestaTemp; // valido por que truena.. en el quitarAcentos
				jq321(incorrecto).find(".draggable").attr("data",'img/blanco.png').attr("data-respuesta",'').text('').removeClass(quitarAcentos(dataRespuestaTemp)); //.addClass(quitarAcentos(dataRespuestaArrastrable))
	
	
				if (siguienteIntentoBlanco) {
					var dataRespuestaTemp2 = '';
					dataRespuestaTemp2 = jq321(incorrecto).find(".draggable").attr("data-respuesta");
					dataRespuestaTemp2 = dataRespuestaTemp2 === undefined ? '':dataRespuestaTemp2; // valido por que truena.. en el quitarAcentos
					jq321(correcto).find(".draggable").attr("data",'img/blanco.png').attr("data-respuesta",'').text('').removeClass(quitarAcentos(dataRespuestaTemp2)); //.addClass(quitarAcentos(dataRespuestaArrastrable))
		
	
					jq321(this).find(".palomita").css("display", "none");		
				//	var correcto = jq321(this).find(".correcto");
					jq321(correcto).removeClass("correcto ocupado");
				//	jq321(correcto).empty();
				//pero no en ESQUEMA	jq321(correcto).css("height", "34px");	// en el segundo intento eso ajusta las casillas al tamanio correcto			
				} else {
							
					jq321(correcto).find(".draggable").draggable('disable');	
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