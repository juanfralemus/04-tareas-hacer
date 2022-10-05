const colors = require('colors');
const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr() { //Un "get" (y un "set" también) es como si tuvieramos una propiedad en nuestra clase (como lo es aquí "_listado")

        const listado = [];
        Object.keys(this._listado).forEach( key => { //Lleno el arreglo "listado" con esta función "Object", que es de javaScript y se encarga de crear un arreglo. Esta función me permite retornar todas las llaves (el valor de cada propiedad) que tenga un objeto dentro de este arreglo. La "key" me sirve para identificar cuáles son las tareas que tengo en mi objeto. Básicamente esta función me sirve para transformar el objeto a un arreglo
            const tarea = this._listado[key]; //Aquí extraigo la tarea que ya está insertada
            listado.push( tarea ); //Añado la tarea al listado
        });

        return listado; //me regresa un Array de las tareas en memoria
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        } 

    }

    cargarTareasFromArray( tareas = [] ) { //función que carga las tareas a "_listado" desde el arreglo al que convertimos la informacion de nuestra base de datos

        //el método ForEach está vinculado a las "key", que es cada elemento dentro de un arreglo (en este caso) u objeto
        tareas.forEach( key => { //"key" es el nombre que le doy a cada llave, pero podría asignarle otro si quisiera
            this._listado[key.id] = key;
        })

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; //se guarda en memoria la tarea

    }

    listadoCompleto() {

        console.log(); //salto de línea
        this.listadoArr.forEach( (key, i) => { // "i" es un segundo argumento del método forEach, que indica la posición de la "key" en el Array ([0,1,2,etc.])

            const idx = i+1;   

            // Esta es la forma óptima de guardar información en una variable que puede tener 2 posibles valores, en vez de usar un "if"                                     
            const estado = ( key.completadoEn ) //aquí se pregunta si "key.compleadoEn" existe, en otras palabras, si su valor es diferente a null  
                ? 'Completada'.green     
                : 'Pendiente'.red;

            console.log( `${ colors.green( idx ) }${'.'.green} ${ key.desc } :: ${ estado }` );  

            //  NOTA:
            // Se pudieron haber desestructurado las
            // propiedades de cada llave (en este caso,
            // cada tarea) para usarlas luego, de la
            // siguiente manera:
            //   const { desc, completadoEn } = key

        })
    }

    listarPendientesCompletadas( completadas = true) {

        console.log();
        let i = 0;
        
        this.listadoArr.forEach( (key) => {

            const { desc, completadoEn } = key;
            const estado = ( completadoEn ) 
                ? 'Completada'.green     
                : 'Pendiente'.red;
            
            if ( completadas ) {
                if ( completadoEn ) { // se colocó llaves en este "if" porque se estaba trabajando más de una instrucción para este
                    i +=1;
                    console.log(`${ (i + ".").green } ${ desc } :: ${completadoEn.green}`);
                }
            } else {
                if ( !completadoEn ) {
                    i +=1; 
                    console.log(`${ (i + ".").green } ${ desc } :: ${ estado }`);
                    
                }
            }
              
        })
    }

    // dejar y asignar nuevo valor de completado o pendiente
    toggleCompletadas( ids = [] ) { 

        // PARTE PARA MARCAR "COMPLETADAS"
        ids.forEach( key => { // acá "key" representa un String que es el "id" de una de las tareas marcadas como completada

            const tarea = this._listado[ key ]; // "tarea" guarda la tarea de _listado que tiene el "id" (key) ingresado 
            // se puede usar const como una variable en este caso ya que javaScript pasa estos objetos por el forEach por referencia
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString() // así se coloca una fecha y hora actual

            }
        });

        // PARTE PARA MARCAR "PENDIENTES"
        this.listadoArr.forEach( tarea => { // barro cada tarea que existe (uso el arreglo "listadoArr")

            if (!ids.includes(tarea.id)){ // pregunto si el "id" de la tarea no está dentro de los id que fueron seleccionados como completados

                this._listado[tarea.id].completadoEn = null;; // la propiedad "completadaEn" de la tarea que tiene de nombre este "id" es cambiada a "null"
                
            }

        });

    }
}


module.exports =  Tareas;