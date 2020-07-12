//importaciones necesarias
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/porHacer');
const colors = require('colors');

//recojemos la orden
let comando = argv._[0];

//dependiendo de la orden hacemos cosas difrentes
switch (comando) {
    case 'crear':
        console.log('crear tarea');
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);

        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (const tarea of listado) {
            console.log('======= Por hacer========'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('=========================='.green);
        }


        break;
    case 'actualizar':
        let completa = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(completa);

        break;
    case 'borrar':

        let borrar = porHacer.borrar(argv.descripcion);
        console.log(borrar);

        break;

    default:
        console.log('no reconocido');
        break;
}