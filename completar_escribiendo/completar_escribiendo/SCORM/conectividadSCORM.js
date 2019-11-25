/*** ADIB ABUD JASO ***/
/*
Nota: para encontrar la ventana de este SCORM en Moodle 2.7 en una consola se puede utilizar:
var MiSCORM = document.getElementById('scorm_object').contentWindow; //donde MiSCORM será la 'window' de este iframe
*/
//Objeto con funciones de comunicación con el API de SCORM

var conectividadSCORM = function() { //conectividadSCORM 2.0.; version del completar arrastrando (por nombrar y diferenciarla)
    var API = null;
    var numObjetivos = 0;
    function findAPI(win) {
        while ((win.API == null) && (win.parent != null) && (win.parent != win)) {//Busca en la ventana parent el objeto API
            win = win.parent;
        }
        API = win.API;
        if (API == null) {
            API = parent.API;
            if (API == null) {
               API = top.API; 
               console.log("findAPI: Parent not found");
            }
			else {
                console.log("findAPI: None not found");
            }
            console.log("findAPI: Win not found");
        }  
        console.log("findAPI: Win ok");  
    }

    function initAPI() {
        var win = window;
        findAPI(win);//Función de arriba
        if ((API == null) && (win.opener != null) && (typeof(win.opener) != "undefined")) {//if we still have not found the API, look at the opener and it's frameset
            findAPI(win.opener);
        }
        else if ((API == null) && (win.opener == null) && (typeof(win.opener) == "undefined")) { //if we still have not found the API, look at the opener and it's frameset 
            findAPI(win.top);
        }else if ((API == null)) {
            console.log("initAPI: None win and top");  //
        }
        console.log("initAPI: Objeto = " + window, API);
    }
    return {
        API: API,
        initAPI: initAPI,
        iniciarScorm: function() {
            console.log("iniciarScorm *"); 
            var inicio = null;
            inicio = API.LMSInitialize("");
            if (inicio == 'false') {
                console.log("iniciarScorm: Error al iniciar" + API.LMSGetLastError() + " = " + API.LMSGetDiagnostic()); 
                return false;
            }
			else {
                console.log("iniciarScorm: LMSInitialize " + inicio);
                console.log("iniciarScorm: Usuario " + this.getUsuario()); 
                return true; //RAAR mar 28,19: En la logica del false del iF, hay que refinar la libreria para que se vuelva la standard
            }
        },
        incompletar: function() {
            var estadoIncompleto = API.LMSSetValue("cmi.core.lesson_status", "incomplete");
            //API.LMSGetValue("cmi.core.lesson_mode");//Para obtener si está en “browse”, “normal”, “review”, RO
            console.log("incompletar: estadoIncompleto  " + estadoIncompleto);
        },
        completar: function() {
            var estadoCompleto = API.LMSSetValue("cmi.core.lesson_status", "completed");
            console.log("completar: estadoCompleto " + estadoCompleto);
        },
        /* RAAR Mar 28,19: En cmi->core se guarda esto que es la calificacion total y final. esta no la rola
            directamente en la barra.
        */
        calificar: function(aciertos, total) {
            var score = API.LMSSetValue("cmi.core.score.raw", aciertos);
            var maximo = API.LMSSetValue("cmi.core.score.max", total);
            console.log("calificar:" + aciertos + " de " + total + ". - " + score + " - " + maximo);
        },
        salvar: function() {
            var salvacion = API.LMSCommit("");
            console.log("salvar: " + salvacion);
        },
        terminar: function() {
            var terminacion = API.LMSFinish("");
            console.log("terminar: " + terminacion);
        },
        conectarYComenzar: function() {
            var mensaje = "conectarYcomenzar -sin cambios-";
            if (API == null) {
                try {
                    initAPI();
                    this.iniciarScorm();
                    mensaje = "conectó en modo: " + API.LMSGetValue("cmi.core.lesson_mode");
                }
				catch(e) {
                    mensaje = e.message;
                }
            }
			else {
                console.log("conectarYComenzar: API = ", API);
            }
            return mensaje;
        },
        /* RAAR Mar 28,19: salva la calificacion final a cmi->core, pero...
        por que no llamar directo a calificar()?, yo la descontinuaría, ensucia el proceso....
        */
        desconectarConCalificacion: function(aciertos, total) {
            this.calificar(aciertos,total);
            this.completar();
            this.salvar();
            this.terminar();
            console.log("desconectarConCalificacion:       --desconectarConCalificacion " + aciertos + "  -  " + total);
        },
        crearObjetivos: function(numero) {
            numObjetivos = numero;
            if (API.LMSGetValue("cmi.objectives._count") < "" + numero) {
                for (var i = 0; i < numero; i++) {
                    if ((API.LMSGetValue("cmi.objectives." + i + ".status") == "incomplete") ||  
                            (API.LMSGetValue("cmi.objectives." + i + ".status") == "passed") ) {
                        console.log("crearObjetivos: status [] = " + API.LMSGetValue("cmi.objectives." + i + ".status"));
                    }
					else {
                        API.LMSSetValue("cmi.objectives." + i + ".id", "objetivo_" + i);
                        API.LMSSetValue("cmi.objectives." + i + ".status", "incomplete");
                        API.LMSSetValue("cmi.objectives." + i + ".score.raw", 0);
                        API.LMSSetValue("cmi.objectives." + i + ".score.max", 0);
                        API.LMSSetValue("cmi.objectives." + i + ".score.min", 0);
                    }
                }
                //API.LMSSetValue("cmi.objectives._count", numero);
                return true;
            }
			else {
                return false;
            }
        },
        iniciarObjetivo: function(numero) {
			console.log("iniciarObjetivo: " + (numero + 1));
            if (API.LMSGetValue("cmi.objectives." + numero + ".status") == "not attempted") {
				console.log("iniciarObjetivo: cmi.objectives." + numero + ".status");
                return API.LMSSetValue("cmi.objectives." + numero + "." + status, "incomplete");
            }
			else {
                return false;
            }
        },
        /* RAAR Mar 28,19: Cuando una calificacion consta de varios objetivos se usa esta funcion
            para calificar parcialmente, esta salva en cmi->objetives y van del cero a n
            según se defina en el ejercicio, la barra de avance usa estos objetivos para formar
            el total....
        */
        calificarObjetivo: function(numero, raw, maxima, minima) {
            var resultados = [];
            resultados.push(API.LMSSetValue("cmi.objectives." + numero + ".score.raw", raw));
            resultados.push(API.LMSSetValue("cmi.objectives." + numero + ".score.max", maxima));
            resultados.push(API.LMSSetValue("cmi.objectives." + numero + ".score.min", minima));
			console.log("calificarObjetivo: Objetivo " + (numero + 1) +", con " + raw + " aciertos de " + maxima + " posibles, con mínimo aprobatorio de " + minima);
            return resultados;
        },
        finalizarObjetivo: function(numero) {
            console.log("finalizarObjetivo: cmi.objectives." + numero + ".status, " + API.LMSGetValue("cmi.objectives." + numero + ".status"));
            return API.LMSSetValue("cmi.objectives." + numero + ".status", "passed");                        
        },
        verificarEstado: function() {
            var totalObjetivos = API.LMSGetValue("cmi.objectives._count");
            console.log("verificarEstado: Actuales: " + totalObjetivos);
            //var incremento = 100/totalObjetivos;
            //var porcentaje = 0;
            var avance = 0;
            for (var i = 0; i < totalObjetivos; i++) {
                if (API.LMSGetValue("cmi.objectives." + i + ".status") == "passed") {
                    avance++;
                }//fin if //RAAR Oct 10,18: estos console.log son para leer la calificación de la base, si jala valores, se guardo ok.
                console.log('STATUS: API.LMSGetValue("cmi.objectives." + i + ".status") ' + API.LMSGetValue("cmi.objectives." + i + ".status"));
                console.log("LMSGetValue correctas-raw "+API.LMSGetValue("cmi.objectives." + i + ".score.raw"));
                console.log("LMSGetValue totalPreguntas-maxima "+API.LMSGetValue("cmi.objectives." + i + ".score.max"));                
            }//fin for
            if ((avance == totalObjetivos) && (avance > 0)) {
                API.LMSSetValue("cmi.core.lesson_status", "completed"); // coloca el status en completed
                //this.terminar(); //cierra la comunicacion del SCO -- no aplica
            }
			else {//fin if
                API.LMSSetValue("cmi.core.lesson_status", "incomplete");
            } 
            console.log("LMSGetValue cmi.core.lesson_status "+API.LMSGetValue("cmi.core.lesson_status"));            
        },
        numDefinidos: function() {
            var totalObjetivos = API.LMSGetValue("cmi.objectives._count");
            console.log("numDefinidos: Objetivos definidos: " + totalObjetivos);
            //var incremento = 100/totalObjetivos;
            //var porcentaje = 0;
            var avance = 0;
            for (var i = 0; i < totalObjetivos; i++) {
                if (API.LMSGetValue("cmi.objectives." + i + ".status") == "passed" || 
                    API.LMSGetValue("cmi.objectives." + i + ".status") == "incomplete") {
                    avance++;
                }//fin if
            }//fin for
            return avance;
        },
        obtenerDatosAvance: function() {
            var totalObjetivos = API.LMSGetValue("cmi.objectives._count");
            console.log("obtenerDatosAvance: Objetivos totales: " + totalObjetivos);
            var incremento = 100/totalObjetivos;
            var porcentaje = 0;
            var estados = [];
            for (var i = 0; i < totalObjetivos; i++) {
                estados[i] = API.LMSGetValue("cmi.objectives." + i + ".status");
                if (estados[i] == "passed") {
                    porcentaje += incremento;
                }
            }
            return {porcentaje:porcentaje, estados:estados};
        },
        getUsuario:function() {
            return API.LMSGetValue("cmi.core.student_id");
        },
        getLastError:function() {
            return API.LMSGetLastError();
        }
        /*
        // por ahora no son funcionales, al ser llamadas tendrías que considerar que hay casos que se invocarian con "parent."
        ,
        iniciaAmbienteScorm: function (ambSCORM,barraSCORM,idObjetivo){ //aunque son globales y es el standard actual, en versiones viejas no se llaman asi, por eso las declaro locales..
            console.log("iniciaAmbienteScorm() ambScorm: "+ambSCORM+" barraSCORM: "+barraSCORM+" idObjetivo: "+idObjetivo);
            if (ambSCORM) {		
                if (parent.conectividadSCORM === undefined) { //Inicio carga, no hay padre...
                    console.log("Actividad en documento, es con try");
                    try {
                        var conexion = conectividadSCORM.conectarYComenzar();
                        console.log("actividad:: -> ", conexion);
                        conectividadSCORM.iniciarObjetivo(idObjetivo);           // inicializa la actividad
                        if (barraSCORM) {conectividadSCORM.actualizarBarra()}    // actualiza la barra de avance
                        conectividadSCORM.salvar();                              // guarda el status
                        console.log("Sin error en conectividad SCORM");
                    } catch(e){
                    console.warn("Error con conectividad SCORM");
                    }
                }
                else { //si hay padre
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
                } // if (parent.conectividadSCORM Fin carga SCORM		
            } //if (ambSCORM) 
        }*/
        /*, // end iniciaAmbienteScorm
        guardaCalificacionScorm: function (ambSCORM,barraSCORM,idObjetivo){ //aunque son globales y es el standard actual, en versiones viejas no se llaman asi, por eso las declaro locales..
            if (ambSCORM) {
                if (barraSCORM){ //RAAR Mar 31,18: si la barra esta prendinda entonces la califiacion se gurda en objetives por que se va a generar una calificación compesta que se guarda en cmi.core
                    console.log("Inicia scorm objetives");
                    //califica SCORM
                    if (parent.conectividadSCORM === undefined) {
                        console.log("Actividad en documento, es con try");
                        try {
                            conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0);   // envia los datos a la base de datos			
                            conectividadSCORM.finalizarObjetivo(idObjetivo); //para ponerle passed..
                        //	conectividadSCORM.desconectarConCalificacion(buenas, total); //esta se usa en el recurso viejo, no uso esta por que hay rutinas de salvado abajo...
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
                        parent.conectividadSCORM.finalizarObjetivo(idObjetivo); //para ponerle passed..
                        //parent.conectividadSCORM.desconectarConCalificacion(buenas, total); //esta se usa en el recurso viejo, no uso esta por que hay rutinas de salvado abajo...
                        //parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	                              // finaliza la actividad en estatus passed
                        parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
                        if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
                        parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
                        parent.conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
                    }		
                    //fin califica SCORM
                    console.log("Fin scorm objetives");
                } else { //si el recurso es autocalificable
                    console.log("Inicia scorm cmi.core");
                    //califica SCORM
                    if (parent.conectividadSCORM === undefined) {
                        console.log("Actividad en documento, es con try");
                        try {
                            conectividadSCORM.calificar(correctas,totalPreguntas); //RAAR Oct 10,18: Esta y la linea anterior salvan a diferentes rutas...debe ser uno u otra..
                            conectividadSCORM.finalizarObjetivo(idObjetivo); // esto no creo que vaya
                            conectividadSCORM.salvar();                                                      // confirma que lo anteriormente realizado es válido
                            //if (barraSCORM) {conectividadSCORM.actualizarBarra()}	                         // actualiza al nuevo estatus la barra de avance
                            conectividadSCORM.verificarEstado();                                             // coloca status de la leccion en completed si cumple los requisitos}
                            conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
                        } catch(e){
                        console.warn("Error al calificar en conectividadSCORM");
                        }
                    }
                    else {
                        console.log("Actividad en frame, es con parent");
                        parent.conectividadSCORM.calificarObjetivo(idObjetivo, correctas, totalPreguntas, 0); // envia los datos a la base de datos
                        parent.conectividadSCORM.finalizarObjetivo(idObjetivo);	  // esto no creo que vaya
                        parent.conectividadSCORM.salvar();                                                    // confirma que lo anteriormente realizado es válido
                        //if (barraSCORM) {parent.conectividadSCORM.actualizarBarra()}	                      // actualiza al nuevo estatus la barra de avance
                        parent.conectividadSCORM.verificarEstado();                                           // coloca status de la leccion en completed si cumple los requisitos
                        parent.conectividadSCORM.salvar(); //RAAR Oct 10,18: MCaloch recomienda agregar
                    }		
                    //fin califica SCORM
                    console.log("Fin scorm cmi.core");
                }
            } //if (ambSCORM) 
        }*/
    }
}();








/*var conectividadSCORM = function(){
    var API = null;
    function findAPI(win){
        while ((win.API == null) && (win.parent != null) && (win.parent != win)){//Busca en la ventana parent el objeto API
            win = win.parent;
        }
        API = win.API;
    }
    function initAPI(){
        var win = window;
        findAPI(win);//Función de arriba
        if ((API == null) && (win.opener != null)){//if we still have not found the API, look at the opener and it's frameset
            findAPI(win.opener);
        }
        console.log(window, API);
    }
    return {
        API:API,
        initAPI: initAPI,
        iniciar: function() {
            var inicio = API.LMSInitialize("");
            console.log(inicio);
        },
        incompletar: function() {
            var estadoIncompleto = API.LMSSetValue("cmi.core.lesson_status", "incomplete");
            //API.LMSGetValue("cmi.core.lesson_mode");//Para obtener si está en “browse”, “normal”, “review”, RO
            console.log(estadoIncompleto);
        },
        completar: function() {
            var estadoCompleto = API.LMSSetValue("cmi.core.lesson_status", "completed");
            console.log(estadoCompleto);
        },
        calificar: function(aciertos, total){
            var score = API.LMSSetValue("cmi.core.score.raw", aciertos);
            var maximo = API.LMSSetValue("cmi.core.score.max", total);
            console.log(aciertos+" de "+total+". - "+score+" - "+maximo);
        },
        salvar: function() {
            var salvacion = API.LMSCommit("");
            console.log(salvacion);
        },
        terminar: function() {
            var terminacion = API.LMSFinish("");
            console.log(terminacion);
        },
        conectarYComenzar: function(){
            var mensaje = "conectarYcomenzar -sin cambios-";
            if(API == null){
                try{
                    this.initAPI();
                    this.iniciar();
                    mensaje = "conectó en modo: "+API.LMSGetValue("cmi.core.lesson_mode");
                } catch(e){
                    mensaje = e.message;
                }
            }
            return mensaje;
        },
        desconectarConCalificacion: function(aciertos, total){
            this.calificar(aciertos,total);
            this.completar();
            this.salvar();
            this.terminar();
        },
        crearObjetivos: function(numero){
            if(API.LMSGetValue("cmi.objectives._count") < numero){
                for(var i=0; i<numero; i++){
                    API.LMSSetValue("cmi.objectives."+i+".id", "objetivo_"+i);
                    API.LMSSetValue("cmi.objectives."+i+".status", "not attempted");
                }
                return true;
            } else {
                return false;
            }
        },
        iniciarObjetivo: function(numero){
            if(API.LMSGetValue("cmi.objectives."+numero+".status") == "not attempted"){
                return API.LMSSetValue("cmi.objectives."+numero+".status", "incomplete");
            } else {
                return false;
            }
        },
        calificarObjetivo: function(numero, raw, maxima, minima){
            var resultados = [];
            resultados.push(API.LMSSetValue("cmi.objectives."+numero+".score.raw", raw));
            resultados.push(API.LMSSetValue("cmi.objectives."+numero+".score.max", maxima));
            resultados.push(API.LMSSetValue("cmi.objectives."+numero+".score.min", minima));
            return resultados;
        },
        finalizarObjetivo: function(numero){
            return API.LMSSetValue("cmi.objectives."+numero+".status", "passed");
        },
        obtenerDatosAvance: function(){
            var totalObjetivos = API.LMSGetValue("cmi.objectives._count");
            var incremento = 100/totalObjetivos;
            var porcentaje = 0;
            var estados = [];
            console.log("conectividadSCORM --> totalObjetivos " + totalObjetivos + ", incremento " + incremento);
            console.log(estados);
            for(var i=0; i<totalObjetivos; i++){
                estados[i] = API.LMSGetValue("cmi.objectives."+i+".status");
                if(estados[i] == "passed"){
                    porcentaje += incremento;
                }
            }
            return {porcentaje:porcentaje, estados:estados};
        }
    }
}();*/