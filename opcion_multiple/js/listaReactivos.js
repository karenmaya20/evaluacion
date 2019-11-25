 
/* Instrucciones

    imagen: "img/formula.png" ó "" si no hay imagen....
	 QIMG:"img/formula.png" ó "" si no hay imagen....
*/
var reactivos = [
	{Q:"El acto jurídico es..."
	, A: [
		{opcion: "Una manifestación de la voluntad humana que genera consecuencias jurídicas.", correcta: false, retro: "Incorrecto. Recuerde que el acto jurídico siempre debe contar con el ánimo de generar consecuencias jurídicas.", imagen: ""},
		{opcion: "Una manifestación de voluntad encaminada (con la intención) a generar consecuencias de derecho.", correcta: true, retro: "Correcto", imagen: ""},
		{opcion: "Un acto humano.", correcta: false, retro: "Incorrecto. Recuerde que el acto jurídico siempre debe contar con el ánimo de generar consecuencias jurídicas.", imagen: ""},
        {opcion: "Una manifestación de la voluntad.", correcta: false, retro: "Incorrecto. Recuerde que el acto jurídico siempre debe contar con el ánimo de generar consecuencias jurídicas.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
		  {Q:"Los delitos son actos jurídicos."
	, A: [
		{opcion: "Falso, porque son hechos jurídicos lícitos ya que hay voluntad, mas no ánimo, de asumir las consecuencias jurídicas.", correcta: false, retro: "Incorrecto. Recuerde que en el hecho jurídico ilícito nunca existirá el ánimo de generar consecuencias jurídicas.", imagen: ""},
		{opcion: "Verdadero, pues son ejecutados por los seres humanos y producen consecuencias jurídicas.", correcta: false, retro: "Incorrecto.Recuerde que en el hecho jurídico ilícito nunca existirá el ánimo de generar consecuencias jurídicas.", imagen: ""},
		{opcion: "Falso, porque son hechos jurídicos ilícitos ya que hay voluntad, más no ánimo, de asumir las consecuencias jurídicas.", correcta: true, retro: "Correcto.", imagen: ""},
        {opcion: "Verdadero, pues producen consecuencias jurídicas.", correcta: false, retro: "Incorrecto.Recuerde que en el hecho jurídico ilícito nunca existirá el ánimo de generar consecuencias jurídicas.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
	{Q:"Los elementos de existencia son: "
	, A: [
		{opcion: "Sujeto, consentimiento y forma.", correcta: false, retro: "Incorrecto. Recuerde que sin sujeto, voluntad o consentimiento, objeto ni solemnidad, el acto no nace a la vida jurídica.", imagen: ""},
		{opcion: "Sujeto, voluntad o consentimiento, objeto y solemnidad.", correcta: true, retro: "Correcto.", imagen: ""},
		{opcion: "Voluntad o consentimiento, capacidad y licitud.", correcta: false, retro: "Incorrecto.Recuerde que sin sujeto, voluntad o consentimiento, objeto ni solemnidad, el acto no nace a la vida jurídica.", imagen: ""},
        {opcion: "Voluntad o consentimiento, objeto y solemnidad.", correcta: false, retro: "Incorrecto.Recuerde que sin sujeto, voluntad o consentimiento, objeto ni solemnidad, el acto no nace a la vida jurídica.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
	{Q:"El objeto directo de un acto jurídico consiste en..."
	, A: [
		{opcion: "Crear, extinguir, modificar y transmitir derechos y obligaciones.", correcta: true, retro: "Correcto. ", imagen: ""},
		{opcion: "La conducta positiva o negativa.", correcta: false, retro: "Incorrecto.Recuerde que el objeto directo consiste en crear, extinguir, modificar y transmitir derechos y obligaciones.", imagen: ""},
		{opcion: "Un bien mueble o inmueble.", correcta: false, retro: "Incorrecto.Recuerde que el objeto directo consiste en crear, extinguir, modificar y transmitir derechos y obligaciones.", imagen: ""},
        {opcion: "Crear y extinguir.", correcta: false, retro: "Incorrecto.Recuerde que el objeto directo consiste en crear, extinguir, modificar y transmitir derechos y obligaciones.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
	{Q:"Los convenios, a diferencia de los contratos..."
	, A: [
		{opcion: "Extinguen o modifican derechos y obligaciones.", correcta: true, retro: "Correcto. ", imagen: ""},
		{opcion: "Extinguen, modifican y crean derechos y obligaciones.", correcta: false, retro: "Incorrecto.Recuerde que un convenio, en estricto sentido, siempre extingue o modifica.", imagen: ""},
		{opcion: "Extinguen, crean, modifican y transmiten derechos y obligaciones.", correcta: false, retro: "Incorrecto.Recuerde que un convenio, en estricto sentido, siempre extingue o modifica.", imagen: ""},
        {opcion: "Crean y extinguen derechos y obligaciones.", correcta: false, retro: "Incorrecto.Recuerde que un convenio, en estricto sentido, siempre extingue o modifica.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"Los elementos de validez del acto jurídico son:"
	, A: [
		{opcion: "Capacidad, nombre, domicilio, estado civil, patrimonio.", correcta: false, retro: "Incorrecto. Recuerde que los elementos de validez son capacidad, licitud en el objeto motivo o fin, formalidad y ausencia de vicios.", imagen: ""},
		{opcion: "Nombre, capacidad, estado civil, domicilio, nacionalidad y patrimonio.", correcta: false, retro: "Incorrecto.Recuerde que los elementos de validez son capacidad, licitud en el objeto motivo o fin, formalidad y ausencia de vicios.", imagen: ""},
		{opcion: "Capacidad, licitud en el objeto, motivo o fin, formalidad y ausencia de vicios del consentimiento.", correcta: true, retro: "Correcto.", imagen: ""},
        {opcion: "Vicios del consentimiento y licitud.", correcta: false, retro: "Incorrecto.Recuerde que los elementos de validez son capacidad, licitud en el objeto motivo o fin, formalidad y ausencia de vicios.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"Los vicios del consentimiento son:"
	, A: [
		{opcion: "Alevosía y ventaja.", correcta: false, retro: "Incorrecto. Recuerde que los vicios de la voluntad son dolo, mala fe, violencia física o moral, lesión y error.", imagen: ""},
		{opcion: "Mala fe y lesión.", correcta: false, retro: "Incorrecto.Recuerde que los vicios de la voluntad son dolo, mala fe, violencia física o moral, lesión y error.", imagen: ""},
		{opcion: "Malevolencia.", correcta: false, retro: "Incorrecto.Recuerde que los vicios de la voluntad son dolo, mala fe, violencia física o moral, lesión y error.", imagen: ""},
        {opcion: "Dolo, mala fe, violencia física o moral, lesión y error.", correcta: true, retro: "Correcto.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"Serie de requisitos que la Ley exige para llevar a cabo un acto jurídico, es un elemento de validez:"
	, A: [
		{opcion: "Trámites.", correcta: false, retro: "Incorrecto. Denominamos <em>formalidad</em> a la serie de requisitos para llevar a cabo un acto jurídico.", imagen: ""},
		{opcion: "Forma.", correcta: false, retro: "Incorrecto.Denominamos <em>formalidad</em> a la serie de requisitos para llevar a cabo un acto jurídico.", imagen: ""},
		{opcion: "Formalidad.", correcta: true, retro: "Correcto.", imagen: ""},
        {opcion: "Solemnidad.", correcta: false, retro: "Incorrecto.Denominamos <em>formalidad</em> a la serie de requisitos para llevar a cabo un acto jurídico.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"Convalidar quiere decir..."
	, A: [
		{opcion: "Ratificar.", correcta: false, retro: "Incorrecto. Recuerde, convalidar quiere decir subsanar y confirmar.", imagen: ""},
		{opcion: "Aceptar.", correcta: false, retro: "Incorrecto.Recuerde, convalidar quiere decir subsanar y confirmar.", imagen: ""},
		{opcion: "Realizar un nuevo acto jurídico.", correcta: false, retro: "Incorrecto.Recuerde, convalidar quiere decir subsanar y confirmar.", imagen: ""},
        {opcion: "Confirmar el acto y subsanar el requisito de validez del cual carecía.", correcta: true, retro: "Correcto.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"La inexistencia es..."
	, A: [
		{opcion: "Imprescriptible.", correcta: false, retro: "Incorrecto. Recuerde que la inexistencia se caracteriza porque las partes no pueden expresar que están conformes con el acto jurídico inexistente y que asumen sus consecuencias (inconvalidable), no se hace válida con el tiempo (imprescriptible), además la invoca cualquier persona perjudicada.", imagen: ""},
		{opcion: "Convalidable, imprescriptible, puede ser invocada por cualquier persona perjudicada.", correcta: false, retro: "Incorrecto.Recuerde que la inexistencia se caracteriza porque las partes no pueden expresar que están conformes con el acto jurídico inexistente y que asumen sus consecuencias (inconvalidable), no se hace válida con el tiempo (imprescriptible), además la invoca cualquier persona perjudicada.", imagen: ""},
		{opcion: "Inconvalidable, imprescriptible y puede ser invocada por cualquier persona perjudicada.", correcta: true, retro: "Correcto.", imagen: ""},
        {opcion: "Prescriptible, convalidable y la pueden invocar sólo las partes.", correcta: false, retro: "Incorrecto.Recuerde que la inexistencia se caracteriza porque las partes no pueden expresar que están conformes con el acto jurídico inexistente y que asumen sus consecuencias (inconvalidable), no se hace válida con el tiempo (imprescriptible), además la invoca cualquier persona perjudicada.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"La nulidad absoluta es..."
	, A: [
		{opcion: "Una especie de inexistencia.", correcta: false, retro: "Incorrecto. Recuerde que, de acuerdo con el CCDF, la ilicitud en el objeto, motivo o fin conlleva una nulidad absoluta", imagen: ""},
		{opcion: "La sanción que la Ley impone a los actos ejecutados en su contra y del orden público.", correcta: true, retro: "Correcto.", imagen: ""},
		{opcion: "Lo contrario a la nulidad relativa.", correcta: false, retro: "Incorrecto.Recuerde que, de acuerdo con el CCDF, la ilicitud en el objeto, motivo o fin conlleva una nulidad absoluta", imagen: ""},
        {opcion: "Una ineficacia.", correcta: false, retro: "Incorrecto.Recuerde que, de acuerdo con el CCDF, la ilicitud en el objeto, motivo o fin conlleva una nulidad absoluta", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"La nulidad relativa es..."
	, A: [
		{opcion: "Imprescriptible, inconvalidable, la invocan los perjudicados.", correcta: false, retro: "Incorrecto. Recuerde que la nulidad relativa es prescriptible, pues puede desaparecerse con el tiempo, admite convalidación, ya que las partes pueden expresar la conformidad con el acto y sus efectos, y la invocan solamente las partes involucradas.", imagen: ""},
		{opcion: "Convalidable.", correcta: false, retro: "Incorrecto.Recuerde que la nulidad relativa es prescriptible, pues puede desaparecerse con el tiempo, admite convalidación, ya que las partes pueden expresar la conformidad con el acto y sus efectos, y la invocan solamente las partes involucradas.", imagen: ""},
		{opcion: "Prescriptible, convalidable y la invocan sólo las partes.", correcta: true, retro: "Correcto.", imagen: ""},
        {opcion: "Invocada sólo por las partes.", correcta: false, retro: "Incorrecto.Recuerde que la nulidad relativa es prescriptible, pues puede desaparecerse con el tiempo, admite convalidación, ya que las partes pueden expresar la conformidad con el acto y sus efectos, y la invocan solamente las partes involucradas.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"Las modalidades del acto jurídico son:"
	, A: [
		{opcion: "Término y condición.", correcta: false, retro: "Incorrecto. Recuerde que las modalidades son los acontecimientos futuros de realización cierta (término) o incierta (condición), cuya misión es que el acto jurídico surta sus efectos, se vuelva exigible o bien se extinga. De ahí los nombres específicos de <em>término extintivo o término resolutivo y condición suspensiva o condición resolutoria.</em> Cuando se verifiquen darán lugar a la obligación, la suspenderán o extinguirán.", imagen: ""},
		{opcion: "Término extintivo y resolutorio, y condición suspensiva y resolutoria.", correcta: true, retro: "Correcto.", imagen: ""},
		{opcion: "Plazos para cumplir la obligación.", correcta: false, retro: "Incorrecto.Recuerde que las modalidades son los acontecimientos futuros de realización cierta (término) o incierta (condición), cuya misión es que el acto jurídico surta sus efectos, se vuelva exigible o bien se extinga. De ahí los nombres específicos de <em>término extintivo o término resolutivo y condición suspensiva o condición resolutoria.</em> Cuando se verifiquen darán lugar a la obligación, la suspenderán o extinguirán.", imagen: ""},
        {opcion: "Manera de hacer un acto jurídico.", correcta: false, retro: "Incorrecto.Recuerde que las modalidades son los acontecimientos futuros de realización cierta (término) o incierta (condición), cuya misión es que el acto jurídico surta sus efectos, se vuelva exigible o bien se extinga. De ahí los nombres específicos de <em>término extintivo o término resolutivo y condición suspensiva o condición resolutoria.</em> Cuando se verifiquen darán lugar a la obligación, la suspenderán o extinguirán.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"Acontecimiento futuro de realización incierta:"
	, A: [
		{opcion: "Plazo.", correcta: false, retro: "Incorrecto. Recuerde que la condición es un suceso que puede que se verifique o no.", imagen: ""},
		{opcion: "Término.", correcta: false, retro: "Incorrecto.Recuerde que la condición es un suceso que puede que se verifique o no.", imagen: ""},
		{opcion: "Hecho.", correcta: false, retro: "Incorrecto.Recuerde que la condición es un suceso que puede que se verifique o no.", imagen: ""},
        {opcion: "Condición.", correcta: true, retro: "Correcto.", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]},
    {Q:"Es un hecho jurídico del ser humano lícito:"
	, A: [
		{opcion: "Cuasidelitos.", correcta: false, retro: "Incorrecto. La gestión de negocios se lleva a cabo por las personas, pero no se ejecuta con el ánimo de producir consecuencias jurídicas, además de ser lícita. ", imagen: ""},
		{opcion: "Gestión de negocios.", correcta: true, retro: "Correcto.", imagen: ""},
		{opcion: "La sequía.", correcta: false, retro: "Incorrecto.La gestión de negocios se lleva a cabo por las personas, pero no se ejecuta con el ánimo de producir consecuencias jurídicas, además de ser lícita. ", imagen: ""},
        {opcion: "El delito.", correcta: false, retro: "Incorrecto.La gestión de negocios se lleva a cabo por las personas, pero no se ejecuta con el ánimo de producir consecuencias jurídicas, además de ser lícita. ", imagen: ""}
		]
		,F: [
			"",														//Retro bien
			""														//Retro mal
		   ]}
/*	,{Q: "Reporta que todo esto ha sido efecto de su consumo de cocaína por cinco años. No obstante refiere que, aunque sabe que el consumo de alcohol y marihuana desde hace 20 años dificultan suspender su consumo de cocaína, no está dispuesto a dejar de consumir estas dos sustancias. La persona describe que el consumo de alcohol es promovido por la misma sociedad y la marihuana es una sustancia que lo relaja y le permite confrontar todas las dificultades que ha tenido que superar en su vida. ¿Qué nivel de cambio presenta la persona?"
	, A: [
	{opcion: "Síntomas aberrantes", correcta: false, retro: "Incorrecto. Recuerde que usted debe indagar sobre los beneficios que la personas obtienen del consumo de sustancias y el rol que tienen en su vida, ya que este elemento mantiene a la conducta.", imagen: ""},
	{opcion: "Cogniciones desadaptativas", correcta: true, retro: "Correcto. Las personas que consumen sustancias suelen conferir a las drogas atributos o propiedades que no tienen.", imagen: ""},
	{opcion: "Conflictos familiares", correcta: false, retro: "Incorrecto. Recuerde que usted debe indagar sobre los beneficios que la personas obtienen del consumo de sustancias y el rol que tienen en su vida, ya que este elemento mantiene a la conducta.", imagen: ""}
	]
	,QIMG: ''		
		}
		,{Q:"La persona refiere tener una gran capacidad para planear negocios particulares con potencial de crecimiento, y asegura que debido a dicha capacidad no estaba dispuesto a contratar sus servicios a ningún empleador en ninguna institución pública ni privada. Describe que su relación con los amigos y familiares se encuentra afectada y empeora cuando comienza a describir sus habilidades empresariales, ya que se molestan con él o se burlan, pues no ha tenido éxito en implementar ninguno de estos negocios. ¿Qué nivel de cambio presenta la persona?"
		, A: [
			{opcion: "Conflictos interpersonales", correcta: true, retro: "Correcto. Aquí se abarcan los conflictos de socialización y vinculación, un área frecuentemente afectada por el consumo de sustancias.", imagen: ""},
			{opcion: "Conflictos familiares", correcta: false, retro: "Conflictos familiares", correcta: false, retro: "Incorrecto. Recuerde que las personas que consumen sustancias pueden llegar a tener dificultades para interactuar con otros, de manera que suelen aislarse de la gente.", imagen: ""},
			{opcion: "Conflictos intrapersonales", correcta: false, retro: "Incorrecto. Recuerde que las personas que consumen sustancias pueden llegar a tener dificultades para interactuar con otros, de manera que suelen aislarse de la gente.", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "Esta carencia de éxito laboral le ha generado un malestar y empeorado su deterioro físico derivado del consumo de cocaína. Reporta que ha perdido su capacidad de controlar su combinación con el uso de alcohol y marihuana. Definitivamente acepta que se encuentra en un momento muy difícil en su vida porque reflexiona y observa que no ha logrado establecer una relación exitosa con su actual pareja, ni con su hija, mucho menos con la madre de ésta. ¿Qué nivel de cambio presenta la persona?"
		, A: [
			{opcion: "Conflictos interpersonales", correcta: false, retro: "Incorrecto. Recuerde que usted debe monitorear el estado emocional de la persona. Puede hacerlo mediante preguntas tales como “¿qué siente al reflexionar y comprender la relación que existe entre su salud y el consumo o suspensión del mismo?", imagen: ""},
			{opcion: "Conflictos familiares", correcta: false, retro: "Incorrecto. Recuerde que usted debe monitorear el estado emocional de la persona. Puede hacerlo mediante preguntas tales como “¿qué siente al reflexionar y comprender la relación que existe entre su salud y el consumo o suspensión del mismo?”.", imagen: ""},
			{opcion: "Conflictos intrapersonales", correcta: true, retro: "Correcto. Aquí se abarcan los elementos emocionales de la persona, los cuales en ocasiones no comunica con las personas cercanas o significativas a su alrededor.", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "Se siente desesperado por no tener un negocio próspero y no contar con recursos económicos para apoyar la economía de su casa. Finamente, refiere que su actual pareja está muy molesta por la falta de apoyo económico, y le advirtió que si no deja de consumir drogas, tendrán que terminar su relación y él deberá abandonar su casa. ¿Qué nivel de cambio presenta la persona?"
		, A: [
			{opcion: "Conflictos interpersonales", correcta: false, retro: "Incorrecto. Recuerde que las consecuencias negativas y el grado de afectación del consumo de drogas también se ven reflejados en el nivel sistémico de la persona. ", imagen: ""},
			{opcion: "Conflictos familiares", correcta: true, retro: "Correcto. Los conflictos familiares se manifiestan como las afectaciones que tiene el consumo de drogas en los sistemas sociales del individuo; abarcan familia, pareja, etcétera.", imagen: ""},
			{opcion: "Conflictos intrapersonales", correcta: false, retro: "Incorrecto. Recuerde que las consecuencias negativas y el grado de afectación del consumo de drogas también se ven reflejados en el nivel sistémico de la persona.", imagen: ""}
			]
	,QIMG: ''		
		}*/
/*		,{Q: "¿A qué atiende la evaluación formativa?"
		, A: [
			{opcion: "A brindar información sobre el valor de un programa.", correcta: false, retro: "Es incorrecto", imagen: ""},
			{opcion: "Al desempeño para mejorar la calidad de una acción educativa.", correcta: true, retro: "Revisar los procesos, intervenciones, es con la finalidad de asegurar la calidad en la enseñanza.", imagen: ""},
			{opcion: "A los resultados obtenidos sobre los previstos.", correcta: false, retro: "Es incorrecto", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "¿En qué se enfoca la evaluación sumativa?"
		, A: [
			{opcion: "Regular los ritmos, determinar lo positivo y corregir lo negativo.", correcta: false, retro: "Es incorrecto.", imagen: ""},
			{opcion: "Conocer si se está contribuyendo a la calidad educativa a lo largo de un programa.", correcta: false, retro: "Es incorrecto.", imagen: ""},
			{opcion: "Tomar decisiones según los estándares alcanzados.", correcta: true, retro: "Como proceso aplicado al final, integrando la información de la evaluación", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "La evaluación educativa implica atender los siguientes ámbitos:"
		, A: [
			{opcion: "Aprendizaje de los alumnos, desempeño de los docentes y gestión escolar, centro educativo, etcétera.", correcta: true, retro: "La evaluación educativa implica evaluar todos los ámbitos: la administración, el centro, los programas, los resultados del alumnado, el desempeño docente.", imagen: ""},
			{opcion: "Competencias, estrategias y metodologías para el aprendizaje.", correcta: false, retro: "La evaluación educativa implica evaluar todos los ámbitos que impactan al aprendizaje y no solo el resultado que demuestren los alumnos, en términos de competencias, o los procesos para lograrlo (metodologías y estrategias)", imagen: ""},
			{opcion: "Materiales de estudio, infraestructura física y tecnológica escolar.", correcta: false, retro: "La evaluación educativa no sólo se centra en evaluar los centros educativos, sino implica a los docentes, alumnos y la gestión escolar.", imagen: ""}
			]
	,QIMG: ''		
		}*/
];

/*
// CASO EJEMPLO DEMO NO BORRAR
var reactivos = [
	{Q:"¿Esta es una prueba....?"
	, A: [
		{opcion: "Caso incorrecto", correcta: false, retro: "Incorrecto: <b>esto es una prueba</b> de formato  <span style='color:powderblue;'>html con colores</span>", imagen: ""},
		{opcion: "Caso incorrecto", correcta: false, retro: "Incorrecto: <b>esto es una prueba</b> de formato  <span style='color:powderblue;'>html con colores</span>", imagen: ""},
		{opcion: "Caso Correcto", correcta: true, retro: "Incorrecto: <b>esto es una prueba</b> de formato  <span style='color:powderblue;'>html con colores</span>", imagen: ""}
		]
	,QIMG: 'img/formula.png'
	}
		,{Q: "¿Cuál es el fin último de la evaluación?"
		, A: [
			{opcion: "Tomar decisiones", correcta: true, retro: "El fin último de la evaluación no es emitir solo un juicio, sino tomar decisiones, proceso que implica recopilar sistemáticamente la información.", imagen: ""},
			{opcion: "Emitir un juicio", correcta: false, retro: "Incorrecto", imagen: ""},
			{opcion: "Recopilar información", correcta: false, retro: "Incorrecto", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q:"La evaluación se puede realizar en diferentes momentos del proceso formativo. ¿Para qué sirve hacerlo antes de iniciar dicho proceso?"
		, A: [
			{opcion: "Extraer factores de éxito o fracaso para otras intervenciones.", correcta: false, retro: "Incorrecto", imagen: ""},
			{opcion: "Determinar la pertinencia y factibilidad potencial.", correcta: true, retro: "Para determinar el potencial del programa, factibilidad y sostenibilidad.", imagen: ""},
			{opcion: "Mejorar y ajustar la acción educativa.", correcta: false, retro: "Incorrecto", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "¿Para qué sirve evaluar en el momento de la intervención o durante el proceso formativo?"
		, A: [
			{opcion: "Extraer factores de éxito o fracaso para otras intervenciones.", correcta: false, retro: "Es incorrecto", imagen: ""},
			{opcion: "Mejorar y ajustar la acción educativa.", correcta: true, retro: "Durante la intervención se pueden realizar ajustes y correcciones necesarias.", imagen: ""},
			{opcion: "Determinar la pertinencia y factibilidad potencial.", correcta: false, retro: "Es incorrecto", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "¿Para qué sirve evaluar una vez concluida la intervención en el proceso formativo?"
		, A: [
			{opcion: "Mejorar y ajustar la acción educativa.", correcta: false, retro: "Es incorrecto.", imagen: ""},
			{opcion: "Extraer factores de éxito o fracaso para otras intervenciones.", correcta: true, retro: "Al final de un programa se pueden tomar decisiones para corregir y realizar otras intervenciones.", imagen: ""},
			{opcion: "Determinar la pertinencia y factibilidad potencial.", correcta: false, retro: "Es incorrecto.", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "¿A qué atiende la evaluación formativa?"
		, A: [
			{opcion: "A brindar información sobre el valor de un programa.", correcta: false, retro: "Es incorrecto", imagen: ""},
			{opcion: "Al desempeño para mejorar la calidad de una acción educativa.", correcta: true, retro: "Revisar los procesos, intervenciones, es con la finalidad de asegurar la calidad en la enseñanza.", imagen: ""},
			{opcion: "A los resultados obtenidos sobre los previstos.", correcta: false, retro: "Es incorrecto", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "¿En qué se enfoca la evaluación sumativa?"
		, A: [
			{opcion: "Regular los ritmos, determinar lo positivo y corregir lo negativo.", correcta: false, retro: "Es incorrecto.", imagen: ""},
			{opcion: "Conocer si se está contribuyendo a la calidad educativa a lo largo de un programa.", correcta: false, retro: "Es incorrecto.", imagen: ""},
			{opcion: "Tomar decisiones según los estándares alcanzados.", correcta: true, retro: "Como proceso aplicado al final, integrando la información de la evaluación", imagen: ""}
			]
	,QIMG: ''		
		}
		,{Q: "La evaluación educativa implica atender los siguientes ámbitos:"
		, A: [
			{opcion: "Aprendizaje de los alumnos, desempeño de los docentes y gestión escolar, centro educativo, etcétera.", correcta: true, retro: "La evaluación educativa implica evaluar todos los ámbitos: la administración, el centro, los programas, los resultados del alumnado, el desempeño docente.", imagen: ""},
			{opcion: "Competencias, estrategias y metodologías para el aprendizaje.", correcta: false, retro: "La evaluación educativa implica evaluar todos los ámbitos que impactan al aprendizaje y no solo el resultado que demuestren los alumnos, en términos de competencias, o los procesos para lograrlo (metodologías y estrategias)", imagen: ""},
			{opcion: "Materiales de estudio, infraestructura física y tecnológica escolar.", correcta: false, retro: "La evaluación educativa no sólo se centra en evaluar los centros educativos, sino implica a los docentes, alumnos y la gestión escolar.", imagen: ""}
			]
	,QIMG: ''		
		}
];

*/


