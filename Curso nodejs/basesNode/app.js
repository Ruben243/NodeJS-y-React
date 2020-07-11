//desesctruturacion para especificar el objeto que quiero usar
const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar');
const argv = require('./config/yargs').argv;
const colors = require('colors');


let comando = argv._[0];

switch (comando) {
    case 'listar':
        listarTabla(argv.base, argv.limite);
        break;
    case 'crear':
        crearArchivo(argv.base, argv.limite)
            .then(archivo =>console.log(`archivo creado ${archivo}`.green))
            .catch(err => console.log(err));
        break;

    default:
        console.log('comando no existe'.red);
        break;
}

/*valido 5 o '5'  pero no 'abec'
let base = 5;
Objeto process creado por node automaticamente*/
//para pasar un patrametro por consola en node nombreArchivo.js  --nombrePrametro=valor valido -b=valor

//let valor = argv[2];
//let base = valor.split('=')[1];
