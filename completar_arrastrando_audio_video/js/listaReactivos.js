/*
-RAAR 03/04/2018, Agrego retro para cada arroba
FA: ["retro arroba 1","retro arroba 2"] Para indicar retro para cada arroba.....
A: Para q una casilla permita mas de una respuesta correcta indicarlas dividiendolas con un barra vertical (pipe), |, 
A: ejem... ["respuesta casilla A","respuesta 1 casilla B|respuesta 2 casilla B","multimedia/img01.png" ],  
*/

var reactivos = [
		 {Q:"audio @", 
		  A: ["audio/6.mp3"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [""],     //retro por arroba
		  F: [
			"Muy bien audio correcto",														//Retro bien
			"Mal audio mal"														//Retro mal
		   ]},
		   {Q:"audio @", 
		  A: ["audio/3.mp3"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [""],     //retro por arroba
		  F: [
			"Muy bien audio correcto",														//Retro bien
			"Mal audio mal"														//Retro mal
		   ]}

			 ,{Q:"video @", 
			 A: ["multimedia/introduccion.mp4"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
			 FA: [""],     //retro por arroba
			 F: [
			 "Muy bien video correcto",														//Retro bien
			 "Mal video incorrecto"														//Retro mal
				]},

				{Q:"Artículo 3: Toda persona tiene derecho a la vida, a la libertad y a la seguridad de su persona. @", 
				A: ["multimedia/caso_iguala02.mp4"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
				FA: [""],//retro por arroba
				F: [
				  "Muy bien. Los policías municipales, al haber lanzado gas lacrimógeno y granadas al interior del autobús, pusieron en riesgo la seguridad personal de los normalistas; lo cual constituye un derecho, también protegido por el <b>párrafo 9º del artículo 21 constitucional</b, que prevé que la actuación de las instituciones de seguridad pública se regirá por el respeto a los derechos humanos.",//Retro bien
				  "Recuerda que es importante identificar dónde se encuentran establecidos los derechos humanos a nivel nacional e internacional, para exigir su cumplimiento a las autoridades responsables. "//Retro mal
				 ]}
		  ,
			   {Q: "Artículo 5: Ninguna persona será sometida a torturas ni penas o tratos crueles, inhumanos o degradantes. @", 
				A: ["multimedia/caso_iguala03.mp4"], //Gustave Courbe
				FA: [""],//retro por arroba
				F: [
				  "Muy bien. Los policías sometieron a los normalistas a tratos degradantes, al agredirlos físicamente, esposarlos y lanzarlos contra el piso; esto a su vez contravino lo dispuesto en el <b>primer párrafo del artículo 22 constitucional</b>, que establece entre otros, la prohibición del tormento de cualquier especie, así como otras penas inusitadas y trascendentales. ",//Retro bien
				  "Recuerda que es importante identificar dónde se encuentran establecidos los derechos humanos a nivel nacional e internacional, para exigir su cumplimiento a las autoridades responsables. "//Retro mal
				 ]}
		  ,
			   {Q: "Artículo 9: Ninguna persona podrá ser arbitrariamente detenida, presa ni desterrada. @", 
				A: ["multimedia/caso_iguala04.mp4"], 
				FA: [""],//retro por arroba
				F: [
				  "Muy bien. Cómo pudiste observar en el vídeo, los policías detuvieron arbitrariamente a los estudiantes, con lo cual a su vez vulneraron lo dispuesto en los <b>artículos 14 y 16</b> constitucionales, pues el acto privativo de la libertad se efectuó sin que hubiera una orden de aprehensión, expedida por la autoridad jurisdiccional o ministerial competente, además de que tampoco se actualizó la hipótesis de flagrancia ni de caso urgente.",//Retro bien
				  "Recuerda que es importante identificar dónde se encuentran establecidos los derechos humanos a nivel nacional e internacional, para exigir su cumplimiento a las autoridades responsables. "//Retro mal
				 ]}
		  ,

		  {Q: "Artículo 11(1): Toda persona acusada de delito tiene derecho a que se presuma su inocencia mientras no se pruebe su culpabilidad, conforme a la ley y en juicio público donde se le hayan asegurado todas las garantías necesarias para su defensa. @", 
		  A: ["multimedia/caso_iguala05.mp4"], 
		  FA: [""],     //retro por arroba
		  F: [
			"Muy bien. Los policías transgredieron el derecho de los normalistas a la presunción de inocencia, al imputarles el homicidio de “uno de los suyos”, y además violentaron su derecho a un juicio público, con todas las garantías necesarias para su defensa, al decidir llevarlos con “el patrón”, en lugar de presentarlos ante una autoridad competente, para que se formularan los cargos correspondientes. Los derechos especificados, se encuentran reconocidos por los artículos <b>14, párrafo segundo, 16, párrafo primero, 19, párrafo primero, 21, párrafo primero, y 102, apartado A, párrafo segundo, de la Constitución Política de los Estados Unidos Mexicanos.</b> ",//Retro bien
			"Recuerda que es importante identificar dónde se encuentran establecidos los derechos humanos a nivel nacional e internacional, para exigir su cumplimiento a las autoridades responsables. "//Retro mal
		   ]}
	,

				




];


// Ejemplo, para ejemplificar capacidades

/*
var reactivos = [
		 {Q:"audio @", 
		  A: ["audio/6.mp3"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [""],     //retro por arroba
		  F: [
			"",														//Retro bien
			""														//Retro mal
		   ]}
			 ,{Q:"video @", 
			 A: ["multimedia/introduccion.mp4"],//"Delacroix","prueba2","prueba3","prueba4","prueba5"],   	//CORCHETES ARRAY, SIN CORCHETE ES STRING
			 FA: [""],     //retro por arroba
			 F: [
			 "",														//Retro bien
			 ""														//Retro mal
				]}	
];
*/