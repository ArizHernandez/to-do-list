const inquirer = require('inquirer');
const colors = require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear Lista`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar Tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Eliminar Tarea`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir.`
            },
        ]
    }
]; 


const inquirerMenu = async () => {
    console.clear();

    console.log('=============================='.blue);
    console.log('    Seleccione una opción'.cyan);
    console.log('==============================\n'.blue);

    const {opcion} = await inquirer.prompt( menuOptions );

    return opcion;
}

const pausa = async () => {

    const cuestion = [{
        type: 'input',
        name: 'pausar',
        message: `Pulsa ${'Enter'.cyan} para continuar...`
    }];

    console.log('\n');

    const opt = await inquirer.prompt(cuestion)

    return opt;
}

const leerInput = async message => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if( value.length === 0 ){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }]

    const {desc} = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map( (tarea, index) => {

        const { id, desc } = tarea;
        
        const idx = index + 1;

        return { 
            value: (id),
            name: `${ ( idx + '.' ).green } ${ desc }`
        }
    })

    choices.unshift({
        value: '0',
        name: `${ '0.'.green } Cancelar`
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea que desea borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );

    return id;
}

const confirmar = async ( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt( question );
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map( (tarea, index) => {

        const { id, desc } = tarea;
        
        const idx = index + 1;

        return { 
            value: (id),
            name: `${ ( idx + '.' ).green } ${ desc }`,
            checked: (tarea.completado ? true : false)
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione la tarea que completo',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( preguntas );

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