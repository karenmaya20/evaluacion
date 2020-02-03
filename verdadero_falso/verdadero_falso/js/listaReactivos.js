/* Reactivos a desplegar...*/

var reactivos = [
	{Q: "El centro no cuenta con profesionales de la salud, es de ayuda mutua.", 
	 A: false, 
	 F: [
		"¡Muy bien! el centro no incumple con la norma ya que, en su aparatado 9.2, señala que el tratamiento bajo la modalidad residencial puede llevarse a cabo en los establecimientos de ayuda mutua.",
		"En realidad, el centro no incumple con la norma, ya que en su aparatado 9.2 señala que el tratamiento bajo la modalidad residencial, puede llevarse a cabo en los establecimientos de ayuda mutua."
		],
	 }
	,{Q: "El único modelo que utilizan son los 12 pasos.", 
	  A: false, 
	  F: [
		"Efectivamente, el centro no incumple con la norma, ya que en su apartado 9.1 señala que el tratamiento bajo la modalidad no residencial podrá llevarse  a cabo a través de la atención ambulatoria de ayuda mutua.",
		"El centro no está incumpliendo con la norma, ya que en su apartado 9.2 señala que el tratamiento bajo la modalidad no residencial podrá llevarse a cabo a través de la atención ambulatoria de ayuda mutua."
		],
	 }
	 ,{Q: "El centro no realiza un examen clínico al ingreso de las personas que están en recuperación. ", 
	  A: true, 
	  F: [
		"Muy bien! El centro está incumpliendo, ya que el apartado 9.2 de la norma señala que se debe realizar un  examen clínico.",
		"En realidad, el centro está incumpliendo, ya que el apartado 9.2 de la norma señala que se debe realizar un  examen clínico."
		],
	 }
	 ,{Q: "El lugar es pequeño y se comparten muchas veces las camas.", 
	  A: true, 
	  F: [
		"Efectivamente, el centro está incumpliendo, ya que apartado 9.2.2.2.3 señala que los dormitorios deben estar separados con camas independientes.",
		"El centro está incumpliendo, ya que el apartado 9.2.2.2.3 señala que los dormitorios deben estar separados con camas independientes."
		],
	 }
	 ,{Q: "El centro no cuenta con espacios para que las personas guarden cosas personales. ", 
	  A: true, 
	  F: [
		"Efectivamente el Centro está incumpliendo, ya que el apartado 9.2.2.2.3 señala que los dormitorios deben tener espacios individuales para guardar objetos personales.",
		"El centro está incumpliendo, ya que el apartado 9.2.2.2.3 señala que los dormitorios deben tener espacios individuales para guardar objetos personales."
		],
	 }
	 ,{Q: "Se permite el ingreso a personas con comorbilidad médica.", 
	  A: false, 
	  F: [
		"¡Muy bien! El centro no está incumpliendo con la norma, ya que el apartado 9.2.2.3.8 menciona que no se negará el ingreso a personas con algunas comorbilidades que ingieran medicamentos y tengan una condición médica o psiquiátrica controlada.",
		"El centro no está incumpliendo con la Norma, ya que el apartado 9.2.2.3.8 menciona que no se negará el ingreso a personas con algunas comorbilidades que ingieran medicamentos y tengan una condición médica o psiquiátrica controlada."
		],
	 }
	 ,{Q: "Para menores de edad, cuenta con la firma de conformidad del tutor.", 
	  A: false, 
	  F: [
		"Así es. El centro no incumple con lo establecido en la norma, ya que el apartado 9.2.2.3.7 señala que si es un menor de edad quien ingresa, se debe obtener adicionalmente el consentimiento por escrito de quienes ejerzan la patria potestad, el representante legal o tutor.",
		"El centro no incumple con lo establecido en la norma, ya que el apartado 9.2.2.3.7 señala que si es un menor de edad quien ingresa, se debe obtener adicionalmente el consentimiento por escrito de quienes ejerzan la patria potestad, el representante legal o tutor."
		],
	 }
	 ,{Q: "El centro no cuenta con valoración médica de sus pacientes en el momento que ingresan.", 
	  A: true, 
	  F: [
		"Efectivamente, el centro incumple con la norma, ya que, de acuerdo con su apartado 9.2.2.2, al momento del ingreso debe realizarse una valoración médica.",
		"El centro incumple con la norma, ya que, de acuerdo con su apartado 9.2.2.2, al momento del ingreso debe realizarse una valoración médica."
		],
	 }
	 	
];


/*var reactivos = [
	{Q: "La norma moral, al ser heterónoma, coercible y coactiva, busca una aplicación directa sobre todos los sujetos de la sociedad.", 
	 A: false, 
	 F: [
		"Buen trabajo, has reafirmado tu aprendizaje.",
		"La teoría de sistemas o teoría general de sistemas (TGS) no proviene de las matemáticas, sino de la biología; su autor sí fue Ludwig Von Bertalanffy (1901-1972), pero no era matemático, sino biólogo."
		],
	 }
	,{Q: "La norma jurídica tiene como características ser coercible, coactiva, heterónoma, bilateral y externa.", 
	  A: true, 
	  F: [
		"Buen trabajo, has reafirmado tu aprendizaje.",
		"Recuerda que, según Bertalanffy, un sistema sí es un complejo de elementos que interactúan, permitiendo que se comporte como un todo."
		],
	 }
	,{Q: "La norma técnica sirve para regular la forma de conducirse de un producto en la sociedad, atendiendo a los hábitos de consumo de cada sociedad.", 
	  A: false, 
	  F: [
		"Buen trabajo, has reafirmado tu aprendizaje.",
		"Recuerda que en los sistemas sí existe un intercambio de energía entre el sistema mismo y su entorno; y en los sistemas abiertos y no aislados, efectivamente el intercambio no sólo es de energía, sino también de materia."
		],
	 }
	,{Q: "Las normas de trato social son aquéllas en las que el rechazo no viene dado por el individuo, sino por la sociedad misma, al exteriorizar una conducta, siendo heterónomas, externas, incoercibles y unilaterales.", 
	  A: true, 
	  F: [
		"Buen trabajo, has reafirmado tu aprendizaje.",
		"Recuerda que Boulding enumera sólo nueve diferentes niveles de complejidad en el comportamiento, crecimiento y estructura de los sistemas, creando una jerarquía de la complejidad, no de la simplicidad."
		],
	 }
	,{Q: "Se entiende al supuesto jurídico como el acontecimiento de posible realización futura, que se encuentra regulado por la Ley y cuya actualización entraña la imposición de una sanción jurídica.", 
	  A: true, 
	  F: [
		"Buen trabajo, has reafirmado tu aprendizaje.",
		"Recuerda que sí se llama sistema abierto cuando hay intercambio de energía y materia."
		],
	 }
];*/
