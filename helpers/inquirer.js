const inquirer = require('inquirer');
const { validate } = require('uuid');

//const ListPrompt = require('inquirer/lib/prompts/list');
const colors = require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opción',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('================================'.green);
    console.log('     Seleccione una opción'.white);
    console.log('================================\n'.green);

    const { opción } = await inquirer.prompt(preguntas);

    return opción;

}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'ENTER',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

// Mostramos el listado de las tareas y el usuario selecciona la que quiere borrar. Se regresa el valor del "id" de la tarea seleccionada
const listadoTareasBorrar = async( tareas = []) => { 

    // Creamos el arreglo de choices usando método map
    const choices = tareas.map( ( key, i = 0 ) => { // el método "map" es como el "forEach", solo que construimos y nos regresa un arreglo nuevo con la estructura que nosotros le pongamos

        i += 1;

        return {
            value: key.id,
            name: `${(i + '.').green} ${key.desc}`
        }
    });

    choices.unshift({ // "unshift" sirve para ingresar una llave al principio del arreglo
            value :'0',
            name: `${'0.'.green} Cancelar`
        }
    )

    // Creamos el menú del inquirer para borrar, con el arreglo de choices
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    // Imprimimos el menú del inquirer, y obtenemos y retornamos el id de la tarea seleccionada
    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}


// mostramos el listado de las tareas y el usuario selecciona las que desee. Regresa un arreglo con los "ids" de las marcadas
const mostrarListadoChecklist = async( tareas = []) => { 

    // Creamos el arreglo de choices usando método map
    const choices = tareas.map( ( key, i = 0 ) => { // el método "map" es como el "forEach", solo que construimos y nos regresa un arreglo nuevo con la estructura que nosotros le pongamos

        i += 1;

        return {
            value: key.id,
            name: `${(i + '.').green} ${key.desc}`,
            checked: ( key.completadoEn ) //inquirer me retorna las que están en "true"
                    ? true
                    : false
        }
    });

    // Creamos el menú del inquirer para hacer check, con el arreglo de choices
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    // Imprimimos el menú del inquirer, y obtenemos y retornamos el arreglo de "ids" de la tareas seleccionadas
    const { ids } = await inquirer.prompt(pregunta); // "ids" es un arreglo
    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}