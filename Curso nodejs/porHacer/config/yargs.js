//creacion de los comandos y sus parametros
const crear = {
    descripcion: {
        alias: '-d',
        demand: true,
        descripcion: 'Descripcion de la tarea'
    }

}
const actualizar = {
    completado: {
        default: true,
        alias: '-c'
    },
    descripcion: {
        alias: '-d',
        demand: true
    }

}
const borrar = {
    descripcion: {
        alias: '-d',
        demand: true
    }

}

const argv = require('yargs')
    .command('crear', 'crear una nueva tarea', crear)
    .command('actualizar', 'actualiza la tarea', actualizar)
    .command('borrar','Borrar una tarea',borrar)
    .help()
    .argv;


module.exports = {
    argv
}