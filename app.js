require('colors');

//el {  } indica un objeto
//    const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListafoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu(); // aqui guarda el valor seleccionado en la consola

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:'); // EL PARAMETRO QUE VA EN EL INQUIRER ES EL MENSAJE QUE APARECERA EN CONSOLA
                tareas.crearTarea(desc); // CREA UNA TAREA
            break;
            case '2':
                //console.log(tareas.listadoArr); //MUESTRA LAS TAREAS
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListafoChecklist(tareas.listadoArr);
                tareas.togggleCompletadas( ids );
            break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id !== '0') {
                    const ok = await confirmar('Esta seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada!!');
                    }  
                }
            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt != '0');
}

main();