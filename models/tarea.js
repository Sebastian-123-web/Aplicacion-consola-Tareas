const { v4: uuidv4 } = require('uuid');

class Tarea{
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ){
        this.id = uuidv4(); // ESTO LE ASIGNA A id UN IDENTIFICADOR UNICO
        this.desc = desc;   // LA DESCRIPCION SE INTRODUCIRA DESDE LA CONSOLA
        this.completadoEn = null;
    }
}

module.exports = Tarea;