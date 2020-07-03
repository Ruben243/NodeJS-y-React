//Base de datos
let empleados = [{
    id: 1,
    nombre: 'Ruben'
}, {
    id: 2,
    nombre: 'Lorena'

}, {
    id: 3,
    nombre: 'Andres'
}];

let salarios = [{
    id: 1,
    salarios: 1000
}, {
    id: 2,
    salario: 3000
}];

//metodo que recibe un empleado y un callbakc
let getSalario = (empleado, callback) => {
    //bucar en la base de datos
    let salarioDB = salarios.find(salario => salario.id === empleado.id);
    //si no hay resultado
    if (!salarioDB) {
        callback(`No se encontro un salario con el id ${id}`);
        //si hay resultado
    } else {
        //mandamos el error como null y retornamos un objeto
        callback(null,{
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        });
    }
}

//metodo que recibe un id y un callback
let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id);
    if (!empleadoDB) {
        callback(`No exite el empleado con ${id} en la base de datos`)
    } else {
        callback(null,empleadoDB);//mandamos el empleado y el error como null
    }
}

//mandamos el id 2 y una funcion de callback con un error y el empleado
getEmpleado(2, (err, empleadoDB) => {
    if (!empleadoDB) {
        //retornamos el error
        return console.log(err);
        
    } else {
        //invocamos al metodo getSalario mandando el empleado y la funcion de callback con error y la respuesta objeto en este caso
        getSalario(empleadoDB, (err, resp) => {
            if (err) {
                //si hay error mostramos el error
                return console.log(err);
                
            } else {
                //si no hay error
                console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
                
            }
        });
    }
    
});