const lugar = require('./lugar/lugar');
const colors = require('colors');
const clima = require('./clima/clima');
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Descripcion de la ciiudad',
        demand: true
    }
}).argv;



const getInfo = async (direccion) => {

    try {
        const coords = await lugar.getLugarLatLng(direccion);
       // console.log(coords.lat,coords.longt);
        const temp = await clima.getClima(coords.lat, coords.longt);
        return console.log(`El clima de ${coords.direccion} es de ${temp}.`.green);

    } catch (e) {
        return `No se pudo determinar el clima de ${direccion}`;

    }
}

getInfo(argv.direccion)
    .then()
    .catch(console.log);