const colors = require("colors");
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listaroArr() {

        let list = [];
        Object.keys(this._listado).forEach( key => {

            const tarea = this._listado[key];
            list = [...list, tarea]

        })

        return list;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){

        if( this._listado[id] ){

            delete this._listado[id];
        }
    }
    
    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => this._listado[tarea.id] = tarea );

    }


    crearTarea( desc = '' ){

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;

    }

    listarTareas(){        
        
        this.listaroArr.forEach( (tarea, i) => {

            const { completado, desc } = tarea;
            
            const iterador = colors.green(i + 1);
            const validarEstado = completado ? `${tarea.completado}`.green : 'Pendiente'.red;    

            console.log(`${ iterador }. ${desc} :: ${ validarEstado }`) 
        
        });
        
    }

    listarPendientesCompletadas( completadas = true ){

        let contador = 0;

        this.listaroArr.forEach( tarea => {

            const { completado, desc } = tarea;
            const valor = completado != null; // completado != null == true || false;

            const validarEstado = completado ? `${tarea.completado}`.green : 'Pendiente'.red;

            if( completadas === valor ){
                contador += 1;
                console.log(`${ (contador + '.').green } ${ desc } :: ${ validarEstado } `);
            }

        })

    }

    toogleCompletadas( ids = [] ){
       
        ids.forEach( id => {
            
            const tarea = this._listado[id];

            if( !tarea.completado ){
                tarea.completado = new Date().toISOString();
            }
        })

        this.listaroArr.forEach( tarea => {
            
            if( !ids.includes( tarea.id ) ){
                
                this._listado[tarea.id].completado = null;
                
            }
        })
    }

}

module.exports = Tareas;