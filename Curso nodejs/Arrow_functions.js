//arrowFunctions

let nombreFuncion = (a, b) => {
    return a + b;
}

//O tambien con una sola linea de return

let nombreFuncion2 = (a, b) => a + b;


console.log(nombreFuncion(10, 5));
console.log(nombreFuncion2(34, 5));

//el this en este caso hace referencia al objeto de fuera de la funcion este node Global,por eso se deja la funcion normal
let marbelys = {
    nombre: "Marbelys",
    apellido: "Zamora",
    profesion: "Bailarina",
    getNombre: function () {
        return `${this.nombre} ${this.apellido} profesion: ${this.profesion}`
    }
}

console.log(marbelys.getNombre());
