require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB(); // Ejecuto la función "leerDB" y regreso el valor a "tareasDB". "tareasDB" es mi arreglo de tareas viejo

    if ( tareasDB ) {
        //Establecer las tareas
        //TODO: cargarTareas(data)
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Imprimir el menú y obtener el valor de "opt"
        opt = await inquirerMenu();



        switch (opt) {
            case '1':
                //crear opción
                const desc = await leerInput('Descripción:');
                //console.log( desc);
                tareas.crearTarea( desc );
            break;

            case '2':

                tareas.listadoCompleto();
                //console.log( tareas.listadoArr );

            break;
            
            case '3':

            tareas.listarPendientesCompletadas();

            break;

            case '4':

                tareas.listarPendientesCompletadas(false);

            break;

            case '5': // completado | pendiente

                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );

            break;

            case '6':

                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar( '¿Está seguro?' );
                    if ( ok ) { //"ok" es boolean y existe si su valor es "Yes/True"
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }

            break;
        }

        guardarDB( tareas.listadoArr );

        if (opt!== '0') await pausa();
        
    } while( opt!== '0');

}

main();