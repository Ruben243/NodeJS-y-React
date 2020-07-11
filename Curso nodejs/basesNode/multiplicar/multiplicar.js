//tipo requireds
const fs = require('fs');//existe en node
//const express=require('express); no es nativo de node,se instala
//const miarchivo=require(../ruta_archivo); nuestros archivos
const colors = require('colors');



let listarTabla = (base, limite = 10) => {
    console.log(`========================`.green);
    console.log(`===== tabla de ${ base } ======`.green);
    console.log(`========================`.green);

    for (let i = 0; i <= limite; i++) {
        console.log(`${base} * ${i}= ${base * i}\n`);

    }

}
let crearArchivo = (base, limite) => {

    return new Promise((resolve, reject) => {
        if (!Number(base) || !Number(limite)) {
            reject(`El valor introducido ${base} o ${limite} no es un numero`);
            return;
        }
        let datos = '';
        for (let i = 1; i <= limite; i++) {
            console.log('los datos se estan guardando');
            datos += `${base}* ${i}=${base * i} \n`
        }

        //forma de escribir un archivo de texto
        //tabla-2.txt el el archvivo que se crea
        //hello Node. el contenido
        //err si surge algun error
        fs.writeFile(`tablas/tabla-${base}-al${limite}.txt`, datos, (err) => {
            if (err)
                reject(err)
            else
                resolve(`tabla-${base}-al-${limite}.txt`);
        });


    });
}
module.exports = {
    crearArchivo,
    listarTabla
}

