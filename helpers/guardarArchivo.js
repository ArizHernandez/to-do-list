const fs = require('fs')

const route = './db/data.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( route, JSON.stringify(data) );

}

const cargarDB = () => {

    if( !fs.existsSync(route) ){
        return null;
    }

    const info = fs.readFileSync( route, { encoding: 'utf-8' } );
    const data = JSON.parse( info ); 
    
    return data;
}

module.exports = {
    guardarDB,
    cargarDB
}