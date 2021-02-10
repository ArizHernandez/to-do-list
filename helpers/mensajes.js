const { read, readlink } = require('fs');

require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
    console.log('=============================='.blue);
    console.log('    Seleccione una opción'.cyan);
    console.log('==============================\n'.blue);

    console.log(`${ '1'.green }. Crear tarea`);
    console.log(`${ '2'.green }. Listar tareas`);
    console.log(`${ '3'.green }. Listar tareas completadas`);
    console.log(`${ '4'.green }. Listar tareas pendientes`);
    console.log(`${ '5'.green }. Completar tarea(s)`);
    console.log(`${ '6'.green }. Borrar una tarea`);
    console.log(`${ '0'.green }. Salir`);

    const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readLine.question('\nSeleccione una opción: ', (option) => {

        readLine.close();
        
        resolve(option);

    })

    })

}

const pausar = () => {

    return new Promise( resolve => {
        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readLine.question(`\nPresione ${ 'ENTER'.cyan } para continuar...`, () => {

            readLine.close();

            resolve();

        })

    })

}

module.exports = {
    mostrarMenu,
    pausar
}