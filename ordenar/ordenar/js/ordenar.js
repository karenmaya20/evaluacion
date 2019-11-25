/*
Created by Adib on 18/12/15.
Modified by Adib on 01/02/17.
 * Update: 2017-0821 @marco_caloch
 * By CUAED
Added:
    - Multiple sentences
    - Horizontal scroll
 * Update: 2017-11-15 @juan_becerril
    - number of attempts
	- display feedback
	- windows messages standard
*/
var marcado = false;
jq321(document).ready(function () { // RAAR Jun 28,18: Lo traigo de index, es chocosa la dispersion....
	if (mezclarPreguntas) { reordenaArreglo(reactivos) };
	creaOrdenar(reactivosMostrar);
	creaRespuestas(respDesordenadas1);
	jq321("button#btnRevisar").show();
	jq321("button#btnReiniciar").hide();
	mobilepro();
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

function creaRespuestas(arreglo) {
	jq321(".lista > .sortable").each(function() {
		var piezas = "";
		jq321(this).children("li").each(function(){
			piezas += jq321(this).attr("data-txt");
			// piezas += jq321(this).attr("data-orden");
		});
		arreglo.push(piezas);
	});
}

jq321(function() {
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text(ic("kcehC"));
			jq321("#btnReiniciar").text(ic("tpmetta txeN"));
			break;
		default:
			jq321("#btnRevisar").text(ic("rasiveR"));
			jq321("#btnReiniciar").text(ic("otnetni omixórP"));
	}
    var eScormActividad = false; // true si se toma en cuenta como objetivo del scorm, false si no
    var listas = jq321(".lista > .sortable");
    var bRevisor = jq321("button#btnRevisar");
    var intTotal = 0;
    var totalOr = 0;
    var intentosRealizadosOr = 0;
    var indiceActividad = 8; // 
    iniciarOrdenar();

    var objetoOrdenar = {
        stop: alDetener
    };


//jq321( ".ui-state-default" ).mouseup(function() { //RAAR Jun 28, 18: para capturar cuando suelte el objeto...
/*jq321(".sortable").mouseleave(function() {
	 self = this;
//  jq321( ".droppable" ).css( "background-color", "white" );
   // alert ("cambio");
	 var dDespliegue = jq321(this).attr("data-despliegue");
	 var indice = jq321(self).index();
	 if (debug) {jq321(self).parent().css( "background-color", "lightblue" );}
});*/

        jq321(".sortable").sortable({ //checar el $ a la larga puede funcionar, pero aqui nojala con jq321
            change: function(event, ui) {
                var movement = ui.position.left - ui.originalPosition.left > 0 ? "derecha" : "izquierda";
					//  if (debug) {jq321(this).parent().css( "background-color", "lightblue" );}
					// alert (movement);
            }
        });

    function iniciarOrdenar() { 
		jq321('#btnReiniciar').hide();
		jq321('#btnRevisar').show();
      //  
    }//fin init

    bRevisor.click(function() {
        var contador = 0;
		var enunciados = jq321(".lista > .sortable");
		jq321(".lista.vacio").removeClass("vacio");
		respDesordenadas2 = [];
		creaRespuestas(respDesordenadas2);  
		var sinOrdenar = false;
		jq321.each(respDesordenadas1, function(i){ //RAAR Ago 20,18: Deshabilito validacion....da lata por que se desodena al azar  y a veces queda correcta y hay que moverle...
			console.log ('i = ' + i + ', respDesordenadas1['+ i +'] '+ respDesordenadas1[i] + ' respDesordenadas2[' + i + '] ' + respDesordenadas2[i]);
			if (respDesordenadas1[i] == respDesordenadas2[i]) { //RAAR Jun 28,18: esto esta mal, hay que comparar por textos, y si hay dos articulos iguales?
				console.log ('----> igual ' + respDesordenadas1[i] + '  ' + respDesordenadas2[i]);
				sinOrdenar = true;
				jq321("#ulId" + i).parent().addClass("vacio");
			}
		});
		if (sinOrdenar){
			mostrarMensaje(2, 4);
			return;
		}
		enunciados.each(function(index) {
			jq321(this).sortable("option", "disabled", true);
			var respuestaCorrecta = obtenerEnunciado(jq321(this));
			if (respuestaCorrecta === respOriginales[index]) {
				jq321(this).closest(".lista").removeClass("mal").addClass("bien");
				if (mostrarRetroIndividual) {
					jq321(this).parent().find(".retroBien").removeClass("ocultarRetro").addClass("mostrarRetro");
					jq321(this).find("i.ip").removeClass("ocultar").addClass("mostrar");
				}
                contador++;
			}
			else {
                jq321(this).closest(".lista").removeClass("bien").addClass("mal");
				if (mostrarRetroIndividual) {
					jq321(this).parent().find(".retroMal").removeClass("ocultarRetro").addClass("mostrarRetro")
					jq321(this).find("i.it").removeClass("ocultar").addClass("mostrar");
				}
			}
		});

		var res = Math.floor(10 * contador/total);
		switch (idioma) {
			case "ENG":
				var txtResp = (contador == 1) ? ic("rewsna thgir") : ic("srewsna thgir");
				mostrarEval(ic("ofni"), ic("tluseR"), ic(" nettog evah uoY") + contador + " " + txtResp + ic(" fo ") + total + "<br/><br/>" + asignarEvaluacion(res));
				break;
			default:
				var txtResp = (contador == 1) ? ic("atcerroc atseupser") : ic("satcerroc satseupser");
				mostrarEval(ic("ofni"), ic("odatluseR"), ic(" etsivutbO") + contador + " " + txtResp + ic(" ed ") + total + "<br/><br/>" + asignarEvaluacion(res));
			}

		intentosRealizadosOr++;
		if (intentosRealizadosOr == maxIntentos) {
			var lista = jq321(".lista");
			lista.each(function(indice){
				if (jq321(this).hasClass("mal")) {
					var tmp = respOriginales[indice];
					if (tmp.indexOf('/') > 0) {
						var tmp2 = tmp.split("@");
						var txt = "";
						for (i = 0; i < tmp2.length; i++ ) {
							txt += "<img src='" + tmp2[i] + "' alt='" + tmp2[i] + "' class='imagenResp'>";
						}
						jq321(this).append(txt);
					}
					else {
						jq321(this).append('<span class="resp">' + respOriginales[indice].replace(/@/g, " "));
					}
				}
			});

			// var malas = jq321('.mal');
			// if (!(marcado)){
			// 	malas.each(function(indice){
			// 		var tmp = reactivos[jq321(this).attr("id").substr(5)].Q;
			// 		tmp = tmp.join(" ");
			// 		if (tmp.indexOf('/') > 0) {
			// 			jq321(this).append("IMAGEN");
			// 		}
			// 		else {
			// 			jq321(this).append('<span class="resp">' + tmp);
			// 		}
			// 		// jq321(this).append(reactivos[parseInt(jq321(this).attr("id").substr(5))].Q);
			// 	});
			// 	marcado = true;
			// }
		}
	//save eScormActividad
		var correctas = contador;
		var totalPreguntas = total;

		guardaCalificacionScorm (ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);

		jq321('#btnRevisar').hide();
		jq321('#btnReiniciar').show();
/*		if (eScormActividad) {
			almacenarDatosSCORM(indiceActividad, contador, totalOr);//
			enviarDatosSCORM();//
		}//fin eScormActividad 
		*/
    });

    function obtenerEnunciado(lista) {
		var listado = lista;
		var l1 = lista.children("li");
		var resp = [];
		lista.children("li").each(function(index){
			resp.push(jq321(this).attr("data-txt"));
		});
		return resp.join("@");

        return lista.children("li").toArray().map(function(elemento) {
            return elemento.innerText;
        }).join("@");
    }

    function alDetener(event, ui) {
        //console.log(ui.item[0]);
    }

    jq321("button#btnReiniciar").click(function() {
		listas = jq321(".lista > .sortable");
        if (intentosRealizadosOr < maxIntentos) {
			respDesordenadas1 = [];
			listas.each(function(index) {
				var estaLista = jq321(this);
				if (mostrarRetroIndividual && !(mostrarRetroFinal)) {
					estaLista.parent().removeClass("bien").addClass("mal")
				}					
				if (estaLista.parent().hasClass("mal")) {
					jq321(this).sortable("option", "disabled", false);
					tmp = respOriginales[index].split("@");
					preg1 = [];
					jq321.each(tmp, function(indice1) {
						preg1.push([tmp[indice1], indice1]);
					});
					do {
						preg = [];
						jq321.each(tmp, function(indice1) {
							preg.push([tmp[indice1], indice1]);
						});
						reordenaArreglo(preg);
					}
					while (preg.join() == preg1.join());
					estaLista.empty();
					var valorInicial = respOriginales[index];
					do {
						reordenaArreglo(preg);
						var pregCheck = preg[0][0];
						for (j = 1; j < preg.length; j++) {
							pregCheck += "@" + preg[j][0]
						}
					} while (valorInicial == pregCheck);  // RAAR Jun 28,18: para asegurarnos que no salga igual la lista inicial despues de sortearla, pasa con los pequeños 

					var txt = "";
					for (j = 0; j < preg.length; j++) { // RAAR Jun 28,18:data-orden es para evaluar, data-despliegue es para saber si ha movido algo, debugguear
						var tmp = preg[j][0];
						tmp = tmp.split("/");
						if (tmp.length > 1) {
							console.log("HAY UNA RUTA INVOLUCRADA");
							txt += "<li class='ui-state-active ui-sortable-handle listaImagen' data-txt='" + preg[j][0] + "' data-orden=" + preg[j][1] + " data-despliegue=" + j + "><i class='fas fa-search-plus lupa blink'></i><img src='" + preg[j][0] + "' alt='" + preg[j][0] + "' class='imagen'></li>";
						}
						else {
							console.log("Seguro que es un texto");
							txt += "<li class='ui-state-active ui-sortable-handle' data-txt='" + preg[j][0] + "' data-orden=" + preg[j][1] + " data-despliegue=" + j + ">" + preg[j][0] + "</li>";
						}
					}
					jq321(estaLista).append(txt + tam(valorInicial, 0) + '<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[index].F[0], 1) + '">' + palomita + '</span><span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[index].F[1], 1) + '">' + tache + '</span>');
				}
				jq321(estaLista).sortable();
				jq321(estaLista).disableSelection();
				jq321(estaLista).find("i.ip, i.it").removeClass("mostrar").addClass("ocultar");
			});
            jq321(".ordenar .lista").removeClass('mal');   
				creaRespuestas(respDesordenadas1);
				listas.each(function(index) {
					if (jq321(this).parent().hasClass("bien")) {
						var tmp = respDesordenadas1[index];
						tmp += "*";
						respDesordenadas1[index] = tmp;
					}
				});
        }//fin if
        else {
			mostrarMensaje(1);
        }//fin else
		jq321('#btnRevisar').show();
		jq321('#btnReiniciar').hide();
		mobilepro();

		jq321(document).ready(function(){
            jq321('[data-toggle="tooltip"]').each(function () {
			var options = {
				html: true };
	
			if (jq321(this)[0].hasAttribute('data-type')) {
				options['template'] =
				'<div class="tooltip ' + jq321(this).attr('data-type') + '" role="tooltip">' +
				'	<div class="tooltip-arrow"></div>' +
				'	<div class="tooltip-inner"></div>' +
				'</div>';
			}
			jq321(this).tooltip(options);
			});
		});
    });

	function mostrarEval(tipo, titulo, cadena) {
		switch (idioma) {
			case "ENG":
				var btnOK = ic("KO");
				break;
			default:
				var btnOK = ic("ratpecA");
		}
		swal({title: "", text: cadena, type: "", confirmButtonText: btnOK, closeOnConfirm: true, html: true });
	}
});
;

function mobilepro(){
	var imagenes= document.getElementsByClassName("fa-search-plus");
	for (var i = 0; i < imagenes.length; i++) {
		console.log(i);
		var padre=imagenes[i].parentNode;
		padre.setAttribute('id','wrap' + (i + 1));
	}
	for(var i = 0 ; i < imagenes.length; i++){
		var viewer = new ViewBigimg()
		var wrap = document.getElementById('wrap' + (i + 1))
		// console.log(viewer)
		wrap.onclick = function (e) {
			if (e.target.nodeName === 'IMG') {
				viewer.show(e.target.src)
			}
		}
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
