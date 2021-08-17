const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data ) => {  
    fs.writeFileSync(archivo, JSON.stringify(data)); //data es un arreglo y "writeFileSync" espera un string por lo que pasamos a tranformar en un string con  JSON.stringify
}

const leerDB = () => {
    if ( !fs.existsSync(archivo) ) {// el "existsSync()" busca un archivo en la ubicacion que se le a dado si es que existe
        return null; //si el archivo existe aqui termina la ejecucion de "leerDB"
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' }); // "readFileSync()" lee un archivo en una ubicacion y obtiene la informacion
    const data = JSON.parse(info); //transforma de string (info) a un objeto y lo guarda en data

    return data;

}

module.exports = {
    guardarDB,
    leerDB
}