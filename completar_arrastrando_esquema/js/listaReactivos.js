/*
-RAAR 03/04/2018, Agrego retro para cada arroba
FA: {correcta:"respuesta correcta",incorrecta:"respuesta incorrecta"} UNA por arroba....
A: Para q una casilla permita mas de una respuesta correcta indicarlas dividiendolas con un barra vertical (pipe), |, 
A: ejem... ["respuesta casilla A","respuesta 1 casilla B|respuesta 2 casilla B","multimedia/img01.png" ],  
*/
var reactivos = [
	{Q:'<img class="img_fondo" src="img/esquema_unidad_03.png" />@ @ @ @</div>', 
		A: ["London","Cardiff","Edinburgh","Belfast"],//"Delac
   FA: [ 
		 {correcta:"1. Correct! London is the capital of both England and the United Kingdom.",incorrecta:"1. Incorrect!"}
		 ,{correcta:"2. Correct! Cardiff is the capital of Wales.",incorrecta:"2. Incorrect!"}
		 ,{correcta:"3. Correct! Edinburgh is the capital of Scotland.",incorrecta:"3. Incorrect!"}		 
		 ,{correcta:"4. Correct! Belfast is the capital of Northern Ireland.",incorrecta:"4. Incorrect!"}		 		 
	  ], 
	F: [
	  "retro bien",														//Retro bien
	  "retro mal"														//Retro mal
	 ]}
 ];
// RAAR Sep 3, 18:Va a ser ejemplo general...
/*
var reactivos = [
	{Q:'<img class="img_fondo" src="img/esquema_unidad_03.png" />@ @ @ @</div>', 
		A: ["London","Cardiff","Edinburgh","Belfast"],//"Delac 
   FA: [ 
		 {correcta:"1. Correct! London is the capital of both England and the United Kingdom.",incorrecta:"1. Incorrect!"}
		 ,{correcta:"2. Correct! Cardiff is the capital of Wales.",incorrecta:"2. Incorrect!"}
		 ,{correcta:"3. Correct! Edinburgh is the capital of Scotland.",incorrecta:"3. Incorrect!"}		 
		 ,{correcta:"4. Correct! Belfast is the capital of Northern Ireland.",incorrecta:"4. Incorrect!"}		 		 
	  ], 
	F: [
	  "retro bien",														//Retro bien
	  "retro mal"														//Retro mal
	 ]}
 ];

*/
