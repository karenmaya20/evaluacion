/**
 * Created by Adib Abud Jaso on 20/11/14.
 */
window.addEventListener("load", function(){
    conectividadSCORM.actualizarBarra();
});
conectividadSCORM.actualizarBarra = function(){
    var barraDeInformacion = document.getElementById("barraNavegacion");
    var conexion = conectividadSCORM.conectarYComenzar();
    console.log("barraDeInfo.js -> ", conexion);
    var datos = conectividadSCORM.obtenerDatosAvance();
    var innerBarra = "<table class='tablaInfo'>";

    var actCompletas = "", actIncompletas = "", actNoHechas = "";

    for(var i=0; i<datos.estados.length; i++){
        switch(datos.estados[i]) {
            case "passed":
                actCompletas += "<td class='celdaBarra realizada'> </td>";
                break;
            case "incomplete":
                actIncompletas += "<td class='celdaBarra incompleta'> </td>";
                break;
            case "not attempted":
                actNoHechas += "<td class='celdaBarra noIntentada'> </td>";
                break;
            default:
                console.log("estado no reconocido en creación celdas en: ", datos.estados[i]);
        }
    }
    innerBarra += "<tr class='celdasVacias'><td colspan='" + datos.estados.length + "'> </td><td rowspan='3' class='celdaBarra porcentaje'>"+Math.round(datos.porcentaje)+"%</td></tr>";
    innerBarra += "<tr class='lineaProgreso'>" + actCompletas+actIncompletas+actNoHechas + "</tr>";
    innerBarra += "<tr><td class='celdaTextoBarra' colspan='" + datos.estados.length + "'>Barra de Avance</td></tr></table>";
    barraDeInformacion.innerHTML = innerBarra;
	
    //Hacer que caigan las puntas en el orden de arriba, no en el orden numérico.
    /*
    var celdasBarra = barraDeInformacion.querySelectorAll("td");
    for(i=0; i<datos.estados.length; i++){
        var elementoFlecha = document.createElement("td");
        elementoFlecha.className = celdasBarra[i+1].className + " conFlecha";
        switch(celdasBarra[i].className) {
            case "celdaBarra realizada":
                elementoFlecha.innerHTML = "<div class='puntaRealizada'></div>";
                break;
            case "celdaBarra incompleta":
                elementoFlecha.innerHTML = "<div class='puntaIncompleta'></div>";
                break;
            case "celdaBarra noIntentada":
                elementoFlecha.innerHTML = "<div class='puntaNoIntentada'></div>";
                break;
            default:
                console.log("estado no reconocido en las flechas en la celda: ", celdasBarra[i]);
        }
        celdasBarra[i].parentElement.insertBefore(elementoFlecha, celdasBarra[i+1]);
    }
	*/
};