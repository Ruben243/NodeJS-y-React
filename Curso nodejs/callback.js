setTimeout(() => {
    console.log("Hola mundo");

}, 3000);


//no hace falta ponerle valor al id que se recibe
let getUsuariById = (id, callback) => {
    let usuario = {
        nombre: "Marbelys",
        id
    }
    if (id === 20) {
        callback(` EL usuario con id ${id} no existe`);
    } else {
         callback(null, usuario);
    }
   
}


//La funcion getUsuarioByIde recibe un id y un funcion que recibe el usuario
getUsuariById(20, (err, usuario) => {
    if (err) {
        return console.log(err);

    } else {
        console.log('Usuario de la base de datos', usuario);
    }


});