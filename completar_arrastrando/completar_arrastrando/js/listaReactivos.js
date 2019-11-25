/* 
FA: {correcta:"respuesta correcta",incorrecta:"respuesta incorrecta"} Una por arroba....
A: Para q una casilla permita mas de una respuesta correcta indicarlas dividiendolas con un barra vertical (pipe), |, 
A: ejem... ["respuesta casilla A","respuesta 1 casilla B|respuesta 2 casilla B","multimedia/img01.png" ],  
A: Para dar FORMATO con CSS a los arrastrables de respuesta toma la primera palabra del texto de respuesta, o en el caso de archivos el nombre del mismo SIN extension ,y se declara como CLASE en estilos.css....
*/

var reactivos = [
	{Q:"Se integra por un alcalde o presidente municipal y varios concejiles. @, como se reunen recursos? @", 
	A: ['ejemplo/rio.jpg', 'ejemplo/autoconocimiento.png'], 
   FA: [ 
	   {correcta:"Correcta",incorrecta:"Incorrecta"},
	   {correcta:"Correcta",incorrecta:"Incorrecta"}
	  ], 
	F: [
	  "reactivo correcto",														//Retro bien
	  "reactivo incorrecto"														//Retro mal
	 ]}
  ,
   {Q: "Facultad del municipio. @", 
	A: ["ejemplo/esquema_unidad_03.png"], //Gustave Courbe
	FA: [
		{correcta:"Correcta",incorrecta:"Incorrecta"}
	],     //retro por arroba		  
	F: [
		"reactivo correcto",														//Retro bien
		"reactivo incorrecto"														//Retro mal
	   ]}
  ,
   {Q: "Funciones y servicios públicos. @", 
	A: ["Agua y recolección de residuos."],  //multimedia/audio1.mp3
	FA: [		
		{correcta:"Correcta",incorrecta:"Incorrecta"}
		],     //retro por arroba	
	F: [
	  "Correcta",														//Retro bien
	  "incorrecta"	
	 ]}
	 ,
   {Q: "Los órganos de representación del municipio. @", 
	A: ["El secretario el tesorero y el síndico"],  //multimedia/audio1.mp3
	FA: [
		{correcta:"Correcta",incorrecta:"Incorrecta"}		
	],     //retro por arroba	
	F: [
	  "Correcta",														//Retro bien
	  "incorrecta"	
	 ]}	
	 ,
   {Q: "Es una persona jurídica integrada por una asociación de vecindad.  @", 
	A: ["Municipio"],  //multimedia/audio1.mp3
	FA: [
		{correcta:"Correcta",incorrecta:"Incorrecta"}		
	],     //retro por arroba	
	F: [
	  "Correcta",														//Retro bien
	  "incorrecta"	
	 ]}	 
	 ,
   {Q: "Conforman el sector paramunicipal. @", 
	A: ["Organismo descentralizado y empresas públicas"],  //multimedia/audio1.mp3
	FA: [
		{correcta:"Correcta",incorrecta:"Incorrecta"}		
	],     //retro por arroba	
	F: [
	  "Correcta",														//Retro bien
	  "incorrecta"	
	 ]}	 
	 ,
   {Q: "Fundó el primer municipio en la Villa Rica de la Veracruz. @", 
	A: ["Hernán Cortés"],  //multimedia/audio1.mp3
	FA: [
		{correcta:"Correcta",incorrecta:"Incorrecta"}		
	],     //retro por arroba	
	F: [
	  "Correcta",														//Retro bien
	  "incorrecta"	
	 ]}	 	
	 ,
   {Q: "Tiene el mando de policía. @", 
	A: ["Presidente municipal"],  //multimedia/audio1.mp3
	FA: [
		{correcta:"Correcta",incorrecta:"Incorrecta"}		
	],     //retro por arroba	
	F: [
	  "Correcta",														//Retro bien
	  "incorrecta"	
	 ]}	 
	 ,
   {Q: "Conforman el sector central. @", 
	A: ["Presidente municipal y el ayuntamiento"],  //multimedia/audio1.mp3
	FA: [
		{correcta:"Correcta",incorrecta:"Incorrecta"}		
	],     //retro por arroba	
	F: [
	  "Correcta",														//Retro bien
	  "incorrecta"	
	 ]}	 	 	 
	 	 	  
 
];