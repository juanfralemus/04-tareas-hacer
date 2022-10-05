const { v4: uuidv4 } = require('uuid');

class Tarea {
    
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) { //con el constructor asigno valores a las propiedades de mi clase

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;

    }



}



module.exports = Tarea;