//importamos fileSystem
const fs = require('fs');

//creamos un arreglo vacio
let listadoPorHacer = [];

/**
 * Funcion que guarda las tareas en un JSON
 */
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No es posible escribir el archivo', err);


    });

}

/**
 * Funcion que carga los datos del archivo JSON
 */
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];

    }



}

/**
 * Funcion que recoje los datos del JSON y los retorna
 */
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

/**
 * Funcion que recibe la descripcion de la tarea la añade a un objeto, añade el obejto al array y lo retorna
 * @param {String} descripcion parametro recibido por consola
 * @see guardarDB
 * @see cargarDB
 */
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}


/**
 * Funcion que compara el string recibido con los datos del campo descripcion del JSON y cambia el estado completado del resultado coincidente
 * @param {String} descripcion parametro recibido por consola que se usara para comparar
 * @param {boolean} completado booleano por defecto a true
 */
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //compara los campos
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    //compara que exista y cambia el estado
    if (index >=0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

/**
 * Funcion que recibe un parametro,filtra todos los que sean difrentes a el y crea un nuevo array
 * @param {String} descripcion parametro recibido por consola que se usara para comparar el elemento para borrar
 */
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })
    if (listadoPorHacer.length===nuevoListado.length) {
        return false;
        
    } else {
        listadoPorHacer = nuevoListado
        guardarDB();
        return true;
    }
}

//exportamos las funciones
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}