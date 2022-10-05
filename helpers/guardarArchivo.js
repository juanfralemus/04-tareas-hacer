const fs = require('fs');
const archivo = './db/data.json'; //.json es como el .txt pero con colorsitos

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify (data) ); //"JSON.stringify" convierte un arreglo a un String

}

const leerDB = () => { //Esta función lee la "base de datos" y convierte su información a Array

    if ( !fs.existsSync( archivo ) ){
        return null;
    }

    const info = fs.readFileSync( archivo, { encoding: 'utf-8'} );
    const data = JSON.parse( info ); //"JSON.parse" convierte de String a un Array u Object
    console.log( data );

    return data;

}



module.exports = {
    guardarDB,
    leerDB
}


