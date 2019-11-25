/*
-RAAR 03/04/2018, Agrego retro para cada arroba
-RAAR 14/05/2018, Agrego insertado de imagenes en respuestas....

Q: indicar con una arroba la casilla droppable, debe tener por lo menos un caracter aparte por lo menos un guin "-"
A: poner un texto o la direccion de la imagen, si el sistema detecta imagen la pone, si no, lo pone como texto...
*/

var reactivos = [
	{Q: ["Densidad","Tamaño", "Composición", "Ubicación", "Otras características"],  //El primero se puede usar como encabezado, pero es funcional para incluir arrobas....
	 A: [],   	   
	 FA: [],     //retro por arroba
	 F: [
	 "retro 1 ",														//Retro bien
	 "retro 2 "														//Retro mal
		]}
 ,
	{Q: ["-@","-@", "-@", "-@","-@"], 
	 A: ["Alta densidad", "Pequeños","Principalmente por silicatos", "Más cercanos al sol", "Con núcleo metálico y un manto rico en silicatos"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
	 FA: [["buena1","mala1"],["buena2","mala2"],["buena3","mala3"],["buena4","mala4"],["buena5","mala5"]],     //retro por arroba		  
	 F: [
	 " ",
	 " "
		]}
 ,		
	{Q: ["-@","-@", "-@", "-@","-@"], 
	 A: ["Baja densidad", "Gran tamaño", "Hidrógeno y helio", "Parte externa del sistema solar", "Con anillos|Con sistemas de satélites"], 
	 FA: [["buena6","mala6"],["buena7","mala7"],["buena8","mala8"],["buena9","mala9"],["buena10","mala10"]],     //retro por arroba			  
	 F: [
	 " ",
	 " "
		]},
			  
];


/*
// RAAR Sep 3,18: Va a ser caso ejemplo..
var reactivos = [
		 {Q: ["GRUPO","EQUIPO"],  //El primero se puede usar como encabezado, pero es funcional para incluir arrobas....
		  A: [],   	   
		  FA: [],     //retro por arroba
		  F: [
			"retro 1 ",														//Retro bien
			"retro 2 "														//Retro mal
		   ]}
		,
		 {Q: ["-@","Metas claras"], 
		  A: ["Objetivos difusos|respuesta2"],  //CORCHETES ARRAY, SIN CORCHETE ES STRING
		  FA: [],     //retro por arroba		  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["Trabajo y responsabilidad individuales","-@"], 
		  A: ["Responsabilidad compartida"],
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["-@","Actividades conjuntas"], 
		  A: ["Actividades individuales"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["Resultados individuales","-@"], 
		  A: ["Resultados colectivos"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		 {Q: ["-@","Liderazgos referenciales compartidos"], 
		  A: ["Decisiones de jefaturas. Líderes formales"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,		
		 {Q: ["Sin empoderamiento (no se otorga poder al grupo)","@-"], 
		  A: ["Con empoderamiento (la organización otorga poder a los equipos)"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		
		 {Q: ["-@","Se miden y evalúan los resultados obtenidos"], 
		  A: ["No se miden los resultados del grupo"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,
		
		 {Q: ["Sin premios por los resultados obtenidos","-@"], 
		  A: ["Con premios por los resultados obtenidos"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,		
		 {Q: ["-@","Se toman decisiones en conjunto"], 
		  A: ["No se toman decisiones en conjunto"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}
		,		
		 {Q: ["Las normas y la cultura no tienen relación con la tarea","-@"], 
		  A: ["Las normas y la cultura están relacionadas con los objetivos de la tarea"], 
		  FA: [],     //retro por arroba			  
		  F: [
			" ",
			" "
		   ]}		  
];
*/

