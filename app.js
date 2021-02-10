// Importaciones 
require('colors');

const { guardarDB, cargarDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


// Limpiar la consola
console.clear();

// Main del programa
const main = async () => {

    // Variables
    let opt = '';
    const tareas = new Tareas(); //Creamos una nueva instancia a Tareas

    // Cargar los datos de nuetra base de datos
    const tareasDB = cargarDB();

    // Validar si tenemos algun dato en nuestra base
    if( tareasDB ){
        // Establecer las tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do{ 

        // Mostramos el menu al usuario y lo que seleccione se guarda en la variable opt
        opt = await inquirerMenu(); 
        
        // Validamos la opción que selecciono el usuario
        switch(opt){
            case '1': // Crear Tarea

                const desc = await leerInput('Descripción: '); //Le requerimos al usuario que ingrese la descripción a la nueva tarea
                
                tareas.crearTarea(desc); //Creamos una nueva tarea con la descripción que ingreso el usuario

            break;

            case '2': // Listar las tareas

                tareas.listarTareas();

            break;

            case '3': // Listar tareas completadas
                tareas.listarPendientesCompletadas( true );
            break;

            case '4': // Listar tareas pendientes
                tareas.listarPendientesCompletadas( false );
            break;

            case '5':
                const ids = await mostrarListadoChecklist( tareas.listaroArr );

                tareas.toogleCompletadas( ids );
            break;

            case '6': // Borrar tareas
                const id = await listadoTareasBorrar( tareas.listaroArr );

                if( id !== '0' ){

                    const borrarQ = await confirmar('¿Está seguro en borrarlo?');

                    if( borrarQ === true ){
                        tareas.borrarTarea(id);
                        console.log('¡Tarea borrada correctamente!'.green );
                    }

                }

            break;
        }

        // Guardamos todo cambio a nuestra base de datos
        guardarDB( tareas.listaroArr );

        await pausa();

    } while( opt !== '0' );


    // pausar();

}

main();