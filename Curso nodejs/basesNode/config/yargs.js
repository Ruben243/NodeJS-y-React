const parametros = {
           base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
}

const argv = require('yargs')
    .command('listar', 'imprime la tabla de multiplicar en consola',parametros)
    .command('crear', 'crea el archivo de texto',parametros)
    .help()
    .argv;

module.exports = {
        argv
    }