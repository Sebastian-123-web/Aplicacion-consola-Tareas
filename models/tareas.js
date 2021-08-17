/**
 *  _listado:
 *          { 'uuid-12345-12345-2': { id: 12, desc: 'comer', completadoEn: null } }
 * 
 */
const Tarea = require('./tarea');

class Tareas {
    _listado = {}; // es un objeto

    get listadoArr(){ //   LOS GETTER SON PARA OBTENER INFORMACION
        const listado = []; // CREO UN ARREGLO VACIO
        // Object.keys --> es para obtener las claves de un Objeto
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]; // OBTENGO LOS VALORES DE _listado[key] y los pongo en tarea
            listado.push( tarea ); // EN LISTADO PONGO LOS VALORES DE TAREA
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${ i + 1 }`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${ idx }. ${ desc } :: ${ estado }`);
        });
    }

    listarPendientesCompletadas(completadas = true){
        let idx = 1
        this.listadoArr.forEach( tarea =>{
            const { desc, completadoEn } = tarea;
            if (completadas) {
                if(completadoEn){
                    console.log(`${ (idx + '.').green } ${ desc } :: ${ completadoEn.green }`);
                    idx++;
                } 
            }else{
                if(!completadoEn){
                    console.log(`${ (idx + '.').green } ${ desc } :: ${ 'Pendiente'.red }`);
                    idx++;
                } 
            }
        });
    }

    togggleCompletadas( ids = [] ){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString(); // "Date().toISOString()" esto obtiene la fecha actual
            }
        });

        this.listadoArr.forEach(tarea =>{
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;                
            }
        });
    }
}

module.exports = Tareas;