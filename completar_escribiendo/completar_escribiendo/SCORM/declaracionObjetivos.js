/**
 * Created by adib on 13/11/14.
 */
window.addEventListener("load", function(){
    var conexion = conectividadSCORM.conectarYComenzar();
    console.log("declaracionObjetivos.js -> ", conexion);
    if(conectividadSCORM.crearObjetivos(3)){//Aquí va el número de actividades
        conectividadSCORM.salvar();
        console.log("objetivos creados");
    }
});